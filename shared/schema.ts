import { z } from "zod";

// Certificate schema
export const certificateSchema = z.object({
  id: z.string(),
  certificateNumber: z.string(),
  studentName: z.string(),
  courseName: z.enum(["ADCA", "DCA"]),
  issueDate: z.string(),
  grade: z.string(),
});

export const verifyCertificateSchema = z.object({
  certificateNumber: z.string().min(1, "Certificate number is required"),
  studentName: z.string().min(1, "Student name is required"),
  courseType: z.enum(["ADCA", "DCA"]),
});

export type Certificate = z.infer<typeof certificateSchema>;
export type VerifyCertificateInput = z.infer<typeof verifyCertificateSchema>;

// Course schema
export const courseSchema = z.object({
  id: z.string(),
  name: z.string(),
  duration: z.string(),
  description: z.string(),
  syllabus: z.array(z.string()),
  highlights: z.array(z.string()),
  fees: z.string(),
  image: z.string(),
});

export type Course = z.infer<typeof courseSchema>;

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  courseInterest: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// Chat message schema
export const chatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["user", "assistant"]),
  content: z.string(),
  timestamp: z.number(),
});

export const sendChatMessageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  conversationHistory: z.array(chatMessageSchema).optional(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type SendChatMessageInput = z.infer<typeof sendChatMessageSchema>;

// Admission inquiry schema
export const admissionInquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number required"),
  courseInterested: z.string().min(1, "Please select a course"),
  preferredBatch: z.enum(["Morning", "Afternoon", "Evening", "Weekend"]),
  inquiryType: z.enum(["Admission", "Demo"]),
});

export type AdmissionInquiryInput = z.infer<typeof admissionInquirySchema>;
