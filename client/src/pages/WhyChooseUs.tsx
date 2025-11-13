import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Laptop, TrendingUp, Clock, Users, BookOpen, CheckCircle, Star } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Experienced Faculty",
    description: "Learn from industry experts with 10+ years of teaching experience and real-world project expertise",
    stats: "15+ Expert Instructors",
    color: "text-accent",
  },
  {
    icon: Laptop,
    title: "Practical Learning",
    description: "Hands-on training with latest technology, modern computer labs, and real-world project assignments",
    stats: "100+ Practice Projects",
    color: "text-primary",
  },
  {
    icon: TrendingUp,
    title: "Placement Assistance",
    description: "Dedicated placement cell, interview preparation, resume building, and job referrals to top companies",
    stats: "85% Placement Rate",
    color: "text-success",
  },
  {
    icon: Clock,
    title: "Flexible Batches",
    description: "Morning, evening, and weekend batches to accommodate working professionals and students",
    stats: "6 Batch Timings",
    color: "text-accent",
  },
];

const achievements = [
  { icon: Users, value: "5000+", label: "Happy Students" },
  { icon: BookOpen, value: "50+", label: "Courses Completed" },
  { icon: Award, value: "17+", label: "Years Experience" },
  { icon: Star, value: "4.8/5", label: "Student Rating" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    course: "ADCA Graduate",
    image: "PS",
    rating: 5,
    text: "The ADCA course at Shri Shyam Infotech transformed my career. The faculty is excellent and the practical training really helped me land a great job.",
  },
  {
    name: "Rahul Kumar",
    course: "Tally Prime Student",
    image: "RK",
    rating: 5,
    text: "Best institute for Tally training in Patna. The instructors are very knowledgeable and patient. I'm now confidently handling GST and accounts.",
  },
  {
    name: "Anjali Singh",
    course: "DCA Student",
    image: "AS",
    rating: 5,
    text: "Great learning environment with modern facilities. The course content is updated and relevant to current industry needs. Highly recommended!",
  },
];

export default function WhyChooseUs() {
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
            <h1 className="text-5xl font-bold mb-4" data-testid="heading-why-choose">
              Why Choose Shri Shyam Infotech?
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              17+ years of excellence in computer education with a commitment to quality and student success
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid={`card-feature-${index}`}>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-muted ${feature.color}`}>
                        <feature.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-primary mb-2" data-testid={`heading-feature-${index}`}>
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground mb-3">{feature.description}</p>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-success" />
                          <span className="font-semibold text-primary">{feature.stats}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4" data-testid="heading-achievements">
              Our Achievements
            </h2>
            <p className="text-muted-foreground text-lg">
              Numbers that speak for our excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <Card className="p-6 hover:shadow-lg transition-shadow" data-testid={`card-achievement-${index}`}>
                  <achievement.icon className="w-12 h-12 text-accent mx-auto mb-4" data-testid={`icon-achievement-${index}`} />
                  <div className="text-4xl font-bold text-primary mb-2" data-testid={`text-achievement-value-${index}`}>
                    {achievement.value}
                  </div>
                  <div className="text-muted-foreground" data-testid={`text-achievement-label-${index}`}>{achievement.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4" data-testid="heading-testimonials">
              Student Success Stories
            </h2>
            <p className="text-muted-foreground text-lg">
              Hear from our successful students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow" data-testid={`card-testimonial-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
                        {testimonial.image}
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary" data-testid={`text-testimonial-name-${index}`}>{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground" data-testid={`text-testimonial-course-${index}`}>{testimonial.course}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-foreground italic" data-testid={`text-testimonial-quote-${index}`}>"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of successful students and transform your career today
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/admission">
              <Button size="lg" className="bg-accent hover:bg-accent/90 shadow-glow-lg" data-testid="button-join-now">
                Join Now
              </Button>
            </Link>
            <Link href="/courses">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary"
                data-testid="button-view-courses"
              >
                View Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
