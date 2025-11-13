import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Shield, Download, CheckCircle, XCircle, Loader2 } from "lucide-react";
import type { Certificate } from "@shared/schema";

export default function VerifyCertificate() {
  const [activeTab, setActiveTab] = useState<"ADCA" | "DCA">("ADCA");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [verifiedCertificate, setVerifiedCertificate] = useState<Certificate | null>(null);
  const { toast } = useToast();

  const verifyMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/verify-certificate", {
        certificateNumber,
        studentName,
        courseType: activeTab,
      });
      return response as Certificate;
    },
    onSuccess: (certificate) => {
      setVerifiedCertificate(certificate);
      toast({
        title: "Certificate Verified!",
        description: "Certificate is valid and authentic.",
      });
    },
    onError: () => {
      setVerifiedCertificate(null);
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "Certificate not found. Please check your details.",
      });
    },
  });

  const handleVerify = () => {
    if (!certificateNumber.trim() || !studentName.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter both certificate number and student name.",
      });
      return;
    }
    verifyMutation.mutate();
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your certificate is being downloaded.",
    });
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
            <Shield className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4" data-testid="heading-verify-certificate">
              Verify Your Certificate
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Enter your certificate details to verify authenticity and download your certificate
            </p>
          </motion.div>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-xl">
              <CardHeader className="bg-muted">
                <CardTitle className="text-2xl text-center text-primary" data-testid="heading-verification-form">
                  Certificate Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "ADCA" | "DCA")}>
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="ADCA" data-testid="tab-adca">ADCA</TabsTrigger>
                    <TabsTrigger value="DCA" data-testid="tab-dca">DCA</TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="certificate-number">Certificate Number</Label>
                      <Input
                        id="certificate-number"
                        placeholder="e.g., ADCA/2024/001"
                        value={certificateNumber}
                        onChange={(e) => setCertificateNumber(e.target.value)}
                        data-testid="input-certificate-number"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="student-name">Student Name</Label>
                      <Input
                        id="student-name"
                        placeholder="Enter full name as per certificate"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        data-testid="input-student-name"
                      />
                    </div>

                    <Button
                      onClick={handleVerify}
                      disabled={verifyMutation.isPending}
                      className="w-full bg-success hover:bg-success/90"
                      size="lg"
                      data-testid="button-verify"
                    >
                      {verifyMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Verify Certificate
                        </>
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Verification Result */}
          {verifiedCertificate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <Card className="border-success shadow-xl" data-testid="card-verified-certificate">
                <CardHeader className="bg-success/10">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-success" />
                    <div>
                      <CardTitle className="text-2xl text-success">
                        Certificate Verified Successfully!
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        This certificate is valid and issued by Shri Shyam Infotech
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Certificate Number</p>
                      <p className="font-semibold text-primary" data-testid="text-cert-number">
                        {verifiedCertificate.certificateNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Student Name</p>
                      <p className="font-semibold text-primary" data-testid="text-cert-student">
                        {verifiedCertificate.studentName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Course</p>
                      <Badge className="mt-1" data-testid="badge-cert-course">{verifiedCertificate.courseName}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Grade</p>
                      <Badge variant="secondary" className="mt-1" data-testid="badge-cert-grade">
                        {verifiedCertificate.grade}
                      </Badge>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Issue Date</p>
                      <p className="font-semibold text-primary" data-testid="text-cert-date">
                        {new Date(verifiedCertificate.issueDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleDownload}
                    className="w-full bg-success hover:bg-success/90 mt-4"
                    size="lg"
                    data-testid="button-download-certificate"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Certificate PDF
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Need Help with Verification?
            </h2>
            <p className="text-muted-foreground mb-8">
              If you're having trouble verifying your certificate or need assistance,
              please contact our support team
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" data-testid="button-contact-support">
                Contact Support
              </Button>
              <Button variant="ghost" data-testid="button-faq">
                View FAQ
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
