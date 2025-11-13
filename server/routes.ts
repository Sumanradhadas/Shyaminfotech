import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getCourseRecommendation } from "./gemini";
import {
  verifyCertificateSchema,
  contactFormSchema,
  admissionInquirySchema,
  sendChatMessageSchema,
  type ChatMessage,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat with AI Assistant
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationHistory } = sendChatMessageSchema.parse(req.body);
      
      const aiResponse = await getCourseRecommendation(message, conversationHistory || []);
      
      const responseMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: aiResponse,
        timestamp: Date.now(),
      };
      
      res.json(responseMessage);
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(400).json({ 
        error: error.message || "Failed to process chat message" 
      });
    }
  });

  // Verify Certificate
  app.post("/api/verify-certificate", async (req, res) => {
    try {
      const { certificateNumber, studentName, courseType } = verifyCertificateSchema.parse(req.body);
      
      const certificate = await storage.getCertificate(
        certificateNumber,
        studentName,
        courseType
      );
      
      if (!certificate) {
        return res.status(404).json({ 
          error: "Certificate not found. Please check your details." 
        });
      }
      
      res.json(certificate);
    } catch (error: any) {
      console.error("Certificate verification error:", error);
      res.status(400).json({ 
        error: error.message || "Invalid request" 
      });
    }
  });

  // Contact Form Submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = contactFormSchema.parse(req.body);
      
      await storage.saveContactForm(contactData);
      
      res.json({ 
        success: true, 
        message: "Thank you for contacting us. We'll get back to you within 24 hours." 
      });
    } catch (error: any) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        error: error.message || "Failed to submit contact form" 
      });
    }
  });

  // Admission Inquiry / Demo Booking
  app.post("/api/admission-inquiry", async (req, res) => {
    try {
      const inquiryData = admissionInquirySchema.parse(req.body);
      
      await storage.saveAdmissionInquiry(inquiryData);
      
      const message = inquiryData.inquiryType === "Admission"
        ? "Application submitted successfully! Our team will contact you within 24 hours."
        : "Demo class booked successfully! We'll contact you shortly with the schedule.";
      
      res.json({ success: true, message });
    } catch (error: any) {
      console.error("Admission inquiry error:", error);
      res.status(400).json({ 
        error: error.message || "Failed to submit inquiry" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
