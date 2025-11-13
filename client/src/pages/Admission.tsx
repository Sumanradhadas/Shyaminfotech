import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { FileText, CheckCircle, CreditCard, GraduationCap, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { admissionInquirySchema, type AdmissionInquiryInput } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const enrollmentSteps = [
  {
    icon: FileText,
    title: "Choose Your Course",
    description: "Select from our range of professional courses that match your career goals",
  },
  {
    icon: CheckCircle,
    title: "Fill Application Form",
    description: "Complete the admission form with your details and course preference",
  },
  {
    icon: CreditCard,
    title: "Pay Fees",
    description: "Secure payment options available - online and offline",
  },
  {
    icon: GraduationCap,
    title: "Start Learning",
    description: "Join your batch and begin your journey to success",
  },
];

const courses = [
  { name: "ADCA - Advanced Diploma in Computer Applications", fees: "₹25,000" },
  { name: "DCA - Diploma in Computer Applications", fees: "₹15,000" },
  { name: "Tally Prime with GST", fees: "₹12,000" },
  { name: "Kushal Yuva Program (KYP)", fees: "Free (Govt. Sponsored)" },
  { name: "DEEP MKCL Certification", fees: "₹8,000 - ₹15,000" },
];

export default function Admission() {
  const [inquiryType, setInquiryType] = useState<"Admission" | "Demo">("Admission");
  const { toast } = useToast();

  const form = useForm<AdmissionInquiryInput>({
    resolver: zodResolver(admissionInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      courseInterested: "",
      preferredBatch: "Morning",
      inquiryType: "Admission",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: AdmissionInquiryInput) => {
      return await apiRequest("POST", "/api/admission-inquiry", data);
    },
    onSuccess: () => {
      toast({
        title: inquiryType === "Admission" ? "Application Submitted!" : "Demo Booked!",
        description:
          inquiryType === "Admission"
            ? "Our team will contact you within 24 hours to complete the admission process."
            : "Your free demo class has been scheduled. We'll contact you shortly with details.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
      });
    },
  });

  const onSubmit = (data: AdmissionInquiryInput) => {
    submitMutation.mutate({ ...data, inquiryType });
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
            <h1 className="text-5xl font-bold mb-4" data-testid="heading-admission">
              Admission & Fees
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Start your learning journey with easy admission process and flexible payment options
            </p>
          </motion.div>
        </div>
      </section>

      {/* Enrollment Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4" data-testid="heading-enrollment">
              Simple Enrollment Process
            </h2>
            <p className="text-muted-foreground text-lg">
              Get started in just 4 easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {enrollmentSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card className="text-center h-full hover:shadow-xl transition-shadow" data-testid={`card-step-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-accent" />
                    </div>
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </CardContent>
                </Card>
                {index < enrollmentSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent/30 -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-20 bg-muted">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4" data-testid="heading-fee-structure">
              Course Fees
            </h2>
            <p className="text-muted-foreground text-lg">
              Affordable fees with flexible payment options
            </p>
          </div>

          <Card className="shadow-xl">
            <CardHeader className="bg-primary text-white">
              <CardTitle className="text-2xl text-center">Fee Structure 2024-25</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-6 hover-elevate"
                    data-testid={`row-fee-${index}`}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">{course.name}</h3>
                    </div>
                    <Badge className="text-lg px-4 py-1">{course.fees}</Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>* Fees include course materials and certification</p>
            <p>* Installment options available for select courses</p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-primary mb-4" data-testid="heading-application">
              Apply Now / Book Free Demo
            </h2>
            <p className="text-muted-foreground">
              Fill out the form below and our team will get in touch with you
            </p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              {/* Toggle Buttons */}
              <div className="flex gap-4 mb-6">
                <Button
                  type="button"
                  variant={inquiryType === "Admission" ? "default" : "outline"}
                  onClick={() => {
                    setInquiryType("Admission");
                    form.setValue("inquiryType", "Admission");
                  }}
                  className="flex-1"
                  data-testid="button-apply-admission"
                >
                  Apply for Admission
                </Button>
                <Button
                  type="button"
                  variant={inquiryType === "Demo" ? "default" : "outline"}
                  onClick={() => {
                    setInquiryType("Demo");
                    form.setValue("inquiryType", "Demo");
                  }}
                  className="flex-1"
                  data-testid="button-book-demo"
                >
                  Book Free Demo
                </Button>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} data-testid="input-name" />
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
                          <Input type="email" placeholder="your.email@example.com" {...field} data-testid="input-email" />
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
                          <Input placeholder="10-digit mobile number" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="courseInterested"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Interested *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-course">
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ADCA" data-testid="select-option-adca">ADCA - Advanced Diploma</SelectItem>
                            <SelectItem value="DCA" data-testid="select-option-dca">DCA - Diploma</SelectItem>
                            <SelectItem value="Tally" data-testid="select-option-tally">Tally Prime with GST</SelectItem>
                            <SelectItem value="Kushal Yuva" data-testid="select-option-kushal">Kushal Yuva Program</SelectItem>
                            <SelectItem value="DEEP MKCL" data-testid="select-option-deep">DEEP MKCL</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredBatch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Batch Timing *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-batch">
                              <SelectValue placeholder="Select batch timing" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Morning" data-testid="select-batch-morning">Morning (8 AM - 11 AM)</SelectItem>
                            <SelectItem value="Afternoon" data-testid="select-batch-afternoon">Afternoon (12 PM - 3 PM)</SelectItem>
                            <SelectItem value="Evening" data-testid="select-batch-evening">Evening (4 PM - 7 PM)</SelectItem>
                            <SelectItem value="Weekend" data-testid="select-batch-weekend">Weekend (Saturday & Sunday)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="w-full shadow-glow hover:shadow-glow-lg"
                    size="lg"
                    data-testid="button-submit-inquiry"
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : inquiryType === "Admission" ? (
                      "Submit Application"
                    ) : (
                      "Book Free Demo"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
