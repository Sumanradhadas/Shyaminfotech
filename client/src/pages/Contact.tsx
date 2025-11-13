import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageCircle, Loader2 } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormInput } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      "Shri Shyam Infotech",
      "Near Gandhi Maidan, Fraser Road",
      "Patna, Bihar - 800001",
    ],
    color: "text-accent",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 9876543210", "+91 9876543211"],
    link: "tel:+919876543210",
    color: "text-primary",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@shrishyaminfotech.com", "admission@shrishyaminfotech.com"],
    link: "mailto:info@shrishyaminfotech.com",
    color: "text-accent",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: [
      "Monday - Saturday: 8:00 AM - 8:00 PM",
      "Sunday: 10:00 AM - 2:00 PM",
    ],
    color: "text-success",
  },
];

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      courseInterest: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormInput) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed to Send",
        description: "Something went wrong. Please try again or call us directly.",
      });
    },
  });

  const onSubmit = (data: ContactFormInput) => {
    submitMutation.mutate(data);
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919876543210?text=Hi, I'm interested in your courses", "_blank");
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <MessageCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4" data-testid="heading-contact">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Have questions? We're here to help. Reach out to us through any of these channels
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow" data-testid={`card-contact-${index}`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4 ${info.color}`}>
                      <info.icon className="w-7 h-7" data-testid={`icon-contact-${index}`} />
                    </div>
                    <h3 className="font-semibold text-lg text-primary mb-3" data-testid={`heading-contact-title-${index}`}>{info.title}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {info.details.map((detail, idx) => (
                        <p key={idx} data-testid={`text-contact-detail-${index}-${idx}`}>{detail}</p>
                      ))}
                    </div>
                    {info.link && (
                      <a
                        href={info.link}
                        className="text-accent hover:underline text-sm mt-2 inline-block"
                        data-testid={`link-contact-action-${index}`}
                      >
                        Click to {info.title.includes("Call") ? "call" : "email"}
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-primary mb-6" data-testid="heading-contact-form">
                    Send Us a Message
                  </h2>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} data-testid="input-contact-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} data-testid="input-contact-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="10-digit mobile number" {...field} data-testid="input-contact-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="courseInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Interest (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., ADCA, DCA, Tally" {...field} data-testid="input-contact-course" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your inquiry..."
                                rows={5}
                                {...field}
                                data-testid="textarea-contact-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={submitMutation.isPending}
                        className="w-full shadow-glow hover:shadow-glow-lg"
                        size="lg"
                        data-testid="button-send-message"
                      >
                        {submitMutation.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map and WhatsApp */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* WhatsApp Card */}
              <Card className="bg-success text-white shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <SiWhatsapp className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-3">Chat on WhatsApp</h3>
                  <p className="mb-6 text-white/90">
                    Get instant replies to your queries. Our team is available on WhatsApp.
                  </p>
                  <Button
                    onClick={handleWhatsApp}
                    className="bg-white text-success hover:bg-white/90"
                    size="lg"
                    data-testid="button-whatsapp-contact"
                  >
                    <SiWhatsapp className="w-5 h-5 mr-2" />
                    Start WhatsApp Chat
                  </Button>
                </CardContent>
              </Card>

              {/* Google Maps */}
              <Card className="overflow-hidden shadow-xl">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold text-primary p-6 pb-4">
                    Find Us on Map
                  </h3>
                  <div className="aspect-video relative" data-testid="container-map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.2573477074194!2d85.13159631501436!3d25.611188983741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58dce6732867%3A0x4059f39a1ac82f06!2sGandhi%20Maidan%2C%20Patna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="rounded-b-xl"
                      title="Shri Shyam Infotech Location"
                      data-testid="iframe-google-map"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Visit Our Campus
          </h2>
          <p className="text-muted-foreground mb-8">
            Experience our state-of-the-art computer labs and meet our expert faculty.
            Walk-ins are always welcome!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" data-testid="button-get-directions">
              <MapPin className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
            <Button variant="outline" size="lg" data-testid="button-schedule-visit">
              Schedule a Visit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
