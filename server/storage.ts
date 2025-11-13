import { randomUUID } from "crypto";
import type { Certificate, ContactFormInput, AdmissionInquiryInput } from "@shared/schema";

export interface IStorage {
  // Certificate methods
  getCertificate(certificateNumber: string, studentName: string, courseType: "ADCA" | "DCA"): Promise<Certificate | undefined>;
  
  // Contact form
  saveContactForm(data: ContactFormInput): Promise<void>;
  
  // Admission inquiry
  saveAdmissionInquiry(data: AdmissionInquiryInput): Promise<void>;
}

export class MemStorage implements IStorage {
  private certificates: Map<string, Certificate>;
  private contactForms: ContactFormInput[];
  private admissionInquiries: AdmissionInquiryInput[];

  constructor() {
    this.certificates = new Map();
    this.contactForms = [];
    this.admissionInquiries = [];
    
    // Seed with sample certificates for testing
    this.seedCertificates();
  }

  private seedCertificates() {
    const sampleCertificates: Certificate[] = [
      {
        id: randomUUID(),
        certificateNumber: "ADCA/2024/001",
        studentName: "Rahul Kumar",
        courseName: "ADCA",
        issueDate: "2024-06-15",
        grade: "A+",
      },
      {
        id: randomUUID(),
        certificateNumber: "ADCA/2024/002",
        studentName: "Priya Sharma",
        courseName: "ADCA",
        issueDate: "2024-06-15",
        grade: "A",
      },
      {
        id: randomUUID(),
        certificateNumber: "DCA/2024/001",
        studentName: "Amit Singh",
        courseName: "DCA",
        issueDate: "2024-07-20",
        grade: "A+",
      },
      {
        id: randomUUID(),
        certificateNumber: "DCA/2024/002",
        studentName: "Anjali Verma",
        courseName: "DCA",
        issueDate: "2024-07-20",
        grade: "B+",
      },
    ];

    sampleCertificates.forEach(cert => {
      this.certificates.set(
        `${cert.certificateNumber}-${cert.studentName.toLowerCase()}`,
        cert
      );
    });
  }

  async getCertificate(
    certificateNumber: string,
    studentName: string,
    courseType: "ADCA" | "DCA"
  ): Promise<Certificate | undefined> {
    const key = `${certificateNumber}-${studentName.toLowerCase()}`;
    const certificate = this.certificates.get(key);
    
    if (certificate && certificate.courseName === courseType) {
      return certificate;
    }
    
    return undefined;
  }

  async saveContactForm(data: ContactFormInput): Promise<void> {
    this.contactForms.push(data);
    console.log("Contact form saved:", data);
  }

  async saveAdmissionInquiry(data: AdmissionInquiryInput): Promise<void> {
    this.admissionInquiries.push(data);
    console.log("Admission inquiry saved:", data);
  }
}

export const storage = new MemStorage();
