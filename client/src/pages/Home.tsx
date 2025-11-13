import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Award, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@assets/generated_images/Computer_classroom_hero_image_6b47cd9d.png";
import adcaImage from "@assets/generated_images/ADCA_course_illustration_adfbf597.png";
import dcaImage from "@assets/generated_images/DCA_course_illustration_8ed93297.png";
import tallyImage from "@assets/generated_images/Tally_Prime_GST_course_06c7f2d5.png";

const stats = [
  { icon: Users, label: "Students Trained", value: 5000, suffix: "+" },
  { icon: BookOpen, label: "Courses Offered", value: 5, suffix: "" },
  { icon: Award, label: "Years of Experience", value: 17, suffix: "+" },
  { icon: TrendingUp, label: "Placement Rate", value: 85, suffix: "%" },
];

const featuredCourses = [
  {
    id: "adca",
    name: "ADCA",
    fullName: "Advanced Diploma in Computer Applications",
    duration: "12 Months",
    description: "Comprehensive program covering programming, database management, and web development",
    image: adcaImage,
  },
  {
    id: "dca",
    name: "DCA",
    fullName: "Diploma in Computer Applications",
    duration: "6 Months",
    description: "Essential computer skills including MS Office, internet, and basic programming",
    image: dcaImage,
  },
  {
    id: "tally",
    name: "Tally Prime with GST",
    fullName: "Tally Prime with GST",
    duration: "3 Months",
    description: "Master accounting software with complete GST compliance and billing",
    image: tallyImage,
  },
];

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasStarted]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("stats-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <span data-testid={`counter-${end}`}>
      {count}
      {suffix}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Computer Training Classroom"
            className="w-full h-full object-cover"
            data-testid="img-hero-background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/75" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 text-base px-4 py-1" data-testid="badge-experience">
              17+ Years of Excellence in Patna
            </Badge>
            <h1
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
              data-testid="heading-hero"
            >
              Empowering Careers Through
              <br />
              Technology Education
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" data-testid="text-hero-subheading">
              Join thousands of successful students who have transformed their careers with
              professional computer training
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/courses">
                <Button
                  size="lg"
                  className="shadow-glow-lg hover:shadow-glow transition-shadow text-lg px-8"
                  data-testid="button-explore-courses"
                >
                  Explore Courses
                </Button>
              </Link>
              <Link href="/admission">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary text-lg px-8"
                  data-testid="button-enroll-now"
                >
                  Enroll Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
                data-testid={`stat-container-${index}`}
              >
                <stat.icon className="w-10 h-10 text-accent mx-auto mb-3" data-testid={`stat-icon-${index}`} />
                <div className="text-4xl font-bold text-white mb-2" data-testid={`stat-value-${index}`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/80 text-sm" data-testid={`stat-label-${index}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4" data-testid="heading-featured-courses">
              Featured Courses
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our industry-recognized courses designed to boost your career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1" data-testid={`card-course-${course.id}`}>
                  <CardHeader className="p-0">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <CardTitle className="text-2xl text-primary" data-testid={`text-course-name-${course.id}`}>
                        {course.name}
                      </CardTitle>
                      <Badge variant="secondary" className="flex items-center gap-1" data-testid={`badge-course-duration-${course.id}`}>
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2" data-testid={`text-course-fullname-${course.id}`}>{course.fullName}</p>
                    <p className="text-foreground" data-testid={`text-course-description-${course.id}`}>{course.description}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link href="/courses">
                      <Button className="w-full shadow-glow hover:shadow-glow-lg transition-shadow" data-testid={`button-learn-more-${course.id}`}>
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Preview */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4" data-testid="heading-why-choose">
              Why Choose Shri Shyam Infotech?
            </h2>
            <p className="text-muted-foreground text-lg">
              Experience the difference of quality education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Expert Faculty", desc: "Learn from industry professionals" },
              { icon: CheckCircle, title: "Practical Training", desc: "Hands-on learning experience" },
              { icon: TrendingUp, title: "Placement Support", desc: "Career guidance and assistance" },
              { icon: Clock, title: "Flexible Batches", desc: "Morning, evening, and weekend" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-6 h-full hover:shadow-lg transition-shadow" data-testid={`card-why-preview-${index}`}>
                  <item.icon className="w-12 h-12 text-accent mx-auto mb-4" data-testid={`icon-why-${index}`} />
                  <h3 className="text-xl font-semibold text-primary mb-2" data-testid={`heading-why-title-${index}`}>{item.title}</h3>
                  <p className="text-muted-foreground" data-testid={`text-why-desc-${index}`}>{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/why-choose-us">
              <Button variant="outline" size="lg" data-testid="button-learn-more-why">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
