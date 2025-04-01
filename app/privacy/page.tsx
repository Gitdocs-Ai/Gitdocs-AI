import React from "react";
import Link from "next/link";
import PageHeader from "@/components/LandingPage/PageHeader";
import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";

const Privacy = () => {
  return (
    <>
      <Navbar />
      <PageHeader
        title="Privacy Policy"
        subtitle="Last updated: February 28, 2025"
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <h2>1. Introduction</h2>
            <p>
              At GitDocs AI, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our website, products, and services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We collect information in several ways:</p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Name, email address,
                billing information, and other details you provide when creating
                an account or subscribing to our service.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our
                service, including features accessed, time spent, and actions
                taken.
              </li>
              <li>
                <strong>Content:</strong> Documentation, code, and other
                materials you upload or generate through our service.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type,
                device information, cookies, and similar tracking technologies.
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li>To provide and maintain our Service</li>
              <li>To process transactions and manage your account</li>
              <li>To improve and personalize your experience</li>
              <li>
                To communicate with you about updates, support, and promotional
                offers
              </li>
              <li>To monitor usage patterns and analyze trends</li>
              <li>To ensure security and prevent fraud</li>
            </ul>

            <h2>4. Data Storage and Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety
              of your personal information. Your personal information is
              contained behind secured networks and is only accessible by a
              limited number of persons who have special access rights and are
              required to keep the information confidential.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We will retain your personal information only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use your information to the extent necessary to comply
              with our legal obligations, resolve disputes, and enforce our
              policies.
            </p>

            <h2>6. Disclosure of Data</h2>
            <p>We may disclose your information in the following situations:</p>
            <ul>
              <li>
                <strong>Service Providers:</strong> We may share your
                information with third-party vendors who provide services on our
                behalf.
              </li>
              <li>
                <strong>Business Transfers:</strong> If we are involved in a
                merger, acquisition, or sale of assets, your information may be
                transferred as part of that transaction.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your
                information if required to do so by law or in response to valid
                requests by public authorities.
              </li>
            </ul>

            <h2>7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding
              your personal information, including:
            </p>
            <ul>
              <li>
                The right to access the personal information we have about you
              </li>
              <li>The right to rectify inaccurate information</li>
              <li>The right to erase your personal information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
            </ul>

            <h2>8. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity
              on our Service and hold certain information. You can instruct your
              browser to refuse all cookies or to indicate when a cookie is
              being sent.
            </p>

            <h2>9. Children's Privacy</h2>
            <p>
              Our Service is not intended for use by children under the age of
              13. We do not knowingly collect personal information from children
              under 13. If we become aware that we have collected personal
              information from a child under 13, we will take steps to delete
              that information.
            </p>

            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the "Last updated" date.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
              <br />
              <a
                href="mailto:privacy@gitdocs.space"
                className="text-gitdocs-blue hover:underline"
              >
                privacy@gitdocs.space
              </a>
            </p>
          </div>

          <div className="mt-12 border-t pt-8">
            <p className="text-gray-600 text-center">
              Have questions about your privacy?{" "}
              <Link
                href="/contact"
                className="text-gitdocs-blue hover:underline"
              >
                Contact our privacy team
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
