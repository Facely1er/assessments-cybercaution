import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, FileText } from 'lucide-react';
import AnimatedSection from '../../utils/AnimatedSection';

const Privacy = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection type="fadeIn">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-2 text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: April 1, 2025</p>
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.1}>
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <h2>Introduction</h2>
                <p>
                  ERMITS LLC ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our CyberCaution™ platform and related services (collectively, the "Service").
                </p>
                <p>
                  Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
                </p>

                <h2>Information We Collect</h2>
                <h3>Personal Information</h3>
                <p>
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul>
                  <li>Register for an account</li>
                  <li>Sign up for our newsletter</li>
                  <li>Request customer support</li>
                  <li>Participate in surveys or promotions</li>
                </ul>
                <p>
                  This information may include:
                </p>
                <ul>
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Job title and company</li>
                  <li>Billing information</li>
                </ul>

                <h3>Usage Information</h3>
                <p>
                  We automatically collect certain information about your device and how you interact with our Service, including:
                </p>
                <ul>
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device type</li>
                  <li>Operating system</li>
                  <li>Pages visited and features used</li>
                  <li>Time and date of your visit</li>
                  <li>Referring website</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>
                  We may use the information we collect for various purposes, including to:
                </p>
                <ul>
                  <li>Provide, maintain, and improve our Service</li>
                  <li>Process transactions and send related information</li>
                  <li>Send administrative information, such as updates, security alerts, and support messages</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Personalize your experience and deliver content relevant to your interests</li>
                  <li>Monitor and analyze trends, usage, and activities in connection with our Service</li>
                  <li>Detect, prevent, and address technical issues, fraud, and security incidents</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2>Disclosure of Your Information</h2>
                <p>
                  We may share your information in the following situations:
                </p>
                <ul>
                  <li><strong>With Service Providers:</strong> We may share your information with third-party vendors, service providers, and contractors who perform services for us.</li>
                  <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
                  <li><strong>With Your Consent:</strong> We may share your information with your consent or at your direction.</li>
                </ul>

                <h2>Data Security</h2>
                <p>
                  We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                </p>

                <h2>Your Data Protection Rights</h2>
                <p>
                  Depending on your location, you may have certain rights regarding your personal information, such as:
                </p>
                <ul>
                  <li>The right to access, update, or delete your information</li>
                  <li>The right to rectification (to correct inaccurate information)</li>
                  <li>The right to object to our processing of your information</li>
                  <li>The right to restriction of processing</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                </p>

                <h2>Children's Privacy</h2>
                <p>
                  Our Service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
                </p>

                <h2>Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <ul>
                  <li>Email: privacy@ermits.com</li>
                  <li>Phone: +1 (888) 618-6160</li>
                  <li>
                    Address: 8300 McCullough Lane, Suite 203, Gaithersburg, MD 20877
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.2}>
          <div className="flex justify-center">
            <div className="flex space-x-4">
              <Link to="/company/terms">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Terms of Service
                </Button>
              </Link>
              <Link to="/contact">
                <Button>
                  <Shield className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Privacy;