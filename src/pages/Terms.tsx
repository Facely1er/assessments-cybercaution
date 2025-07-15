import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileText } from 'lucide-react';
import AnimatedSection from '../utils/AnimatedSection';

const Terms = () => {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection type="fadeIn">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold mb-2 text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: April 1, 2025</p>
          </div>
        </AnimatedSection>

        <AnimatedSection type="fadeIn" delay={0.1}>
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="prose max-w-none">
                <h2>Introduction</h2>
                <p>
                  These Terms of Service ("Terms") govern your access to and use of the CyberCaution™ platform and related services (collectively, the "Service") provided by ERMITS LLC ("we", "our", or "us"). Please read these Terms carefully before using our Service.
                </p>
                <p>
                  By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
                </p>

                <h2>Subscription and Accounts</h2>
                <h3>Account Registration</h3>
                <p>
                  When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                </p>

                <h3>Account Responsibility</h3>
                <p>
                  You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account.
                </p>

                <h3>Subscription Terms</h3>
                <p>
                  Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis, depending on the type of subscription plan you select. At the end of each period, your subscription will automatically renew under the same conditions unless you cancel it or we cancel it.
                </p>

                <h3>Fee Changes</h3>
                <p>
                  We may, at our sole discretion and at any time, modify the subscription fees. Any subscription fee change will become effective at the end of the then-current billing cycle. We will provide you with reasonable prior notice of any change in subscription fees to give you an opportunity to terminate your subscription before such change becomes effective.
                </p>

                <h2>Intellectual Property</h2>
                <h3>Service Content</h3>
                <p>
                  Our Service and its original content, features, and functionality are and will remain the exclusive property of ERMITS LLC and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ERMITS LLC.
                </p>

                <h3>User Content</h3>
                <p>
                  You retain any and all of your rights to any content you submit, post, or display on or through the Service ("User Content"). By submitting, posting, or displaying User Content on or through the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, modify, and display the User Content in connection with the operation of the Service.
                </p>

                <h2>Acceptable Use</h2>
                <p>
                  You agree not to use the Service:
                </p>
                <ul>
                  <li>In any way that violates any applicable national, federal, state, local, or international law or regulation</li>
                  <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation</li>
                  <li>To impersonate or attempt to impersonate ERMITS LLC, an ERMITS LLC employee, another user, or any other person or entity</li>
                  <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm ERMITS LLC or users of the Service or expose them to liability</li>
                </ul>

                <h2>Termination</h2>
                <p>
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                  In no event shall ERMITS LLC, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul>
                  <li>Your access to or use of or inability to access or use the Service</li>
                  <li>Any conduct or content of any third party on the Service</li>
                  <li>Any content obtained from the Service</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                </ul>

                <h2>Disclaimer</h2>
                <p>
                  Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
                </p>

                <h2>Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of the State of Maryland, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>

                <h2>Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <ul>
                  <li>Email: legal@ermits.com</li>
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
              <Link to="/company/privacy">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Privacy Policy
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

export default Terms;