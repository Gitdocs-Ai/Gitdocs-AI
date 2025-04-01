import React from "react";
import Link from "next/link";
import PageHeader from "@/components/LandingPage/PageHeader";
import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";

const Terms = () => {
  return (
    <>
      <Navbar />
      <PageHeader
        title="Terms of Service"
        subtitle="Last updated: February 28, 2025"
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <h2>1. Introduction</h2>
            <p>
              Welcome to GitDocs AI. These Terms of Service govern your use of
              our website, products, and services. By accessing or using GitDocs
              AI, you agree to be bound by these Terms.
            </p>

            <h2>2. Definitions</h2>
            <p>
              <strong>"Service"</strong> refers to the GitDocs AI application,
              website, and related services.
              <br />
              <strong>"User"</strong> refers to individuals who access or use
              our Service.
              <br />
              <strong>"Content"</strong> refers to documentation, code, or other
              material generated or processed through our Service.
            </p>

            <h2>3. Use of Service</h2>
            <p>
              GitDocs AI provides AI-powered documentation services. You agree
              to use our Service only for lawful purposes and in accordance with
              these Terms.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your
              account information and for all activities that occur under your
              account.
            </p>

            <h2>4. Subscription and Payment</h2>
            <p>
              Some aspects of our Service require payment of fees. You agree to
              pay all fees associated with your subscription plan. We may change
              our fees at any time, with notice provided through our website or
              via email.
            </p>

            <h2>5. Content Ownership</h2>
            <p>
              You retain all rights to your Content. By uploading Content to our
              Service, you grant us a license to host, modify, and display that
              Content solely for the purpose of providing our Service to you.
            </p>

            <h2>6. Acceptable Use Policy</h2>
            <p>
              You agree not to misuse our Service or assist anyone else in doing
              so. Misuse includes:
            </p>
            <ul>
              <li>Violating any laws or regulations</li>
              <li>Infringing on the intellectual property rights of others</li>
              <li>Attempting to breach or circumvent security measures</li>
              <li>Interfering with the normal operation of our Service</li>
              <li>Distributing malware or engaging in fraudulent activity</li>
            </ul>

            <h2>7. Termination</h2>
            <p>
              We may suspend or terminate your access to our Service at our
              discretion, without notice, for conduct that we believe violates
              these Terms or is harmful to other users, us, or third parties, or
              for any other reason.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, GitDocs AI shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits or revenues, whether
              incurred directly or indirectly.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. If we make changes, we will
              provide notice through our website or via email. Your continued
              use of our Service after such notice constitutes your acceptance
              of the new Terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of the United States,
              without regard to its conflict of law provisions.
            </p>

            <h2>11. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              <a
                href="mailto:legal@gitdocs.space"
                className="text-gitdocs-blue hover:underline"
              >
                legal@gitdocs.space
              </a>
            </p>
          </div>

          <div className="mt-12 border-t pt-8">
            <p className="text-gray-600 text-center">
              Have questions about our Terms?{" "}
              <Link
                href="/contact"
                className="text-gitdocs-blue hover:underline"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Terms;
