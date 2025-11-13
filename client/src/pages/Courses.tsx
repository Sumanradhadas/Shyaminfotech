import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, CheckCircle, BookOpen } from "lucide-react";
import adcaImage from "@assets/generated_images/ADCA_course_illustration_adfbf597.png";
import dcaImage from "@assets/generated_images/DCA_course_illustration_8ed93297.png";
import tallyImage from "@assets/generated_images/Tally_Prime_GST_course_06c7f2d5.png";
import kushalImage from "@assets/generated_images/Kushal_Yuva_Program_image_2c6c2f6f.png";
import deepImage from "@assets/generated_images/DEEP_MKCL_course_image_7656fc6c.png";

const courses = [
  {
    id: "adca",
    name: "ADCA - Advanced Diploma in Computer Applications",
    duration: "12 Months",
    fees: "₹25,000",
    image: adcaImage,
    description: "Comprehensive program for advanced computer skills and software development",
    highlights: [
      "Programming in C, C++, and Java",
      "Database Management with SQL",
      "Web Development (HTML, CSS, JavaScript)",
      "Advanced MS Office Suite",
      "Computer Hardware & Networking",
      "Project Development",
    ],
    syllabus: [
      "Fundamentals of Computer",
      "Operating Systems (Windows & Linux)",
      "Programming Languages (C, C++, Java)",
      "Database Management Systems",
      "Web Technologies",
      "Software Engineering",
      "Computer Networks",
      "Final Project",
    ],
  },
  {
    id: "dca",
    name: "DCA - Diploma in Computer Applications",
    duration: "6 Months",
    fees: "₹15,000",
    image: dcaImage,
    description: "Essential computer skills for office work and daily computing needs",
    highlights: [
      "MS Office (Word, Excel, PowerPoint)",
      "Internet & Email Management",
      "Typing Skills Development",
      "Basic Programming Concepts",
      "Computer Fundamentals",
      "Digital Literacy",
    ],
    syllabus: [
      "Computer Fundamentals & Windows",
      "MS Word - Document Processing",
      "MS Excel - Spreadsheets & Data Analysis",
      "MS PowerPoint - Presentations",
      "Internet & Email",
      "Typing & Speed Building",
      "Introduction to Programming",
      "Practical Assignments",
    ],
  },
  {
    id: "tally",
    name: "Tally Prime with GST",
    duration: "3 Months",
    fees: "₹12,000",
    image: tallyImage,
    description: "Master accounting software with complete GST compliance",
    highlights: [
      "Tally Prime Complete Features",
      "GST Filing & Compliance",
      "Inventory Management",
      "Payroll Management",
      "Banking & Reconciliation",
      "Financial Reports Generation",
    ],
    syllabus: [
      "Introduction to Tally Prime",
      "Company Creation & Configuration",
      "Accounting Vouchers & Entries",
      "GST Configuration & Returns",
      "Inventory Management",
      "Banking & Payment Gateway",
      "Payroll & Attendance",
      "Financial Statements & Reports",
    ],
  },
  {
    id: "kushal-yuva",
    name: "Kushal Yuva Program (KYP)",
    duration: "6 Months",
    fees: "Government Sponsored",
    image: kushalImage,
    description: "Government of Bihar skill development initiative for youth empowerment",
    highlights: [
      "Government Certified Program",
      "Free Training for Eligible Candidates",
      "IT Skills Development",
      "Communication Skills",
      "Personality Development",
      "Placement Assistance",
    ],
    syllabus: [
      "Basic Computer Skills",
      "Office Automation Tools",
      "Internet & Digital Services",
      "Communication Skills",
      "English Speaking",
      "Soft Skills & Personality Development",
      "Industry Readiness Training",
      "Certification Exam",
    ],
  },
  {
    id: "deep-mkcl",
    name: "DEEP MKCL Certification",
    duration: "Varies by Level",
    fees: "₹8,000 - ₹15,000",
    image: deepImage,
    description: "Maharashtra Knowledge Corporation Limited approved digital literacy program",
    highlights: [
      "Nationally Recognized Certificate",
      "Multiple Skill Levels",
      "E-Learning Platform Access",
      "Online Exam System",
      "Government Approved Curriculum",
      "Career Enhancement",
    ],
    syllabus: [
      "Digital Literacy Fundamentals",
      "Office Productivity Tools",
      "Internet & Online Services",
      "Cyber Safety & Security",
      "E-Commerce & Digital Payments",
      "Social Media & Communication",
      "Cloud Computing Basics",
      "Online Examination",
    ],
  },
];

export default function Courses() {
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
            <h1 className="text-5xl font-bold mb-4" data-testid="heading-courses">
              Our Courses
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Choose from our comprehensive range of professional computer training courses
              designed to meet industry standards
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                  index % 2 === 0 ? "" : ""
                }`}
                data-testid={`card-course-${course.id}`}
              >
                <div className={`grid md:grid-cols-2 gap-0`}>
                  {/* Image */}
                  <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover min-h-[300px]"
                      data-testid={`img-course-${course.id}`}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h2
                        className="text-3xl font-bold text-primary"
                        data-testid={`heading-course-${course.id}`}
                      >
                        {course.name}
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <Badge className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {course.fees}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-6">{course.description}</p>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-lg mb-3 text-primary">
                        Course Highlights
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {course.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Syllabus Accordion */}
                    <Accordion type="single" collapsible className="mb-6">
                      <AccordionItem value="syllabus">
                        <AccordionTrigger className="text-primary font-semibold">
                          View Complete Syllabus
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {course.syllabus.map((topic, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-accent font-medium">{idx + 1}.</span>
                                <span className="text-sm">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* CTA Button */}
                    <Link href="/admission">
                      <Button
                        className="w-full shadow-glow hover:shadow-glow-lg transition-shadow"
                        size="lg"
                        data-testid={`button-enroll-${course.id}`}
                      >
                        Enroll Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Still Not Sure Which Course to Choose?
          </h2>
          <p className="text-muted-foreground mb-8">
            Chat with our AI assistant or contact us for personalized course recommendations
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" data-testid="button-contact-us">Contact Us</Button>
            </Link>
            <Link href="/admission">
              <Button variant="outline" size="lg" data-testid="button-book-demo">
                Book Free Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
