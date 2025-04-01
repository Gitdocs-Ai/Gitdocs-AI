import React from "react";
import Link from "next/link";
import { Package, Receipt, Undo, Wallet } from "lucide-react";
import PageHeader from "@/components/LandingPage/PageHeader";
import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";

const CancellationRefund = () => {
  return (
    <>
      <Navbar />
      <PageHeader
        title="Cancellation & Refund Policy"
        subtitle="Last updated: June 1, 2023"
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Receipt className="h-8 w-8 text-gitdocs-blue mr-3" />
                <h2 className="text-2xl font-bold mt-0">Cancellation Policy</h2>
              </div>
              <p>
                GitDocs AI provides subscription-based services to our
                customers. You may cancel your subscription at any time through
                your account settings or by contacting our customer support
                team.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 my-6">
                <h3 className="text-lg font-medium text-gitdocs-blue">
                  Subscription Cancellation
                </h3>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>
                    Monthly subscriptions: Cancellation will take effect at the
                    end of the current billing cycle.
                  </li>
                  <li>
                    Annual subscriptions: Cancellation will take effect at the
                    end of the current annual period.
                  </li>
                  <li>
                    You will retain access to the service until the end of your
                    paid period.
                  </li>
                </ul>
              </div>
              <p>
                If you cancel your subscription before the end of your current
                paid-up period, we will not refund the subscription fees already
                paid for the current period.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Wallet className="h-8 w-8 text-gitdocs-purple mr-3" />
                <h2 className="text-2xl font-bold mt-0">Refund Policy</h2>
              </div>
              <p>
                Our refund policy aims to provide a fair and transparent
                approach to refund requests while ensuring our business
                sustainability.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md">
                  <h3 className="font-bold text-lg mb-3">
                    Eligible for Refund
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Technical issues preventing service use
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Incorrect charges or billing errors
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Service unavailability exceeding 24 hours
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      First-time subscribers within 14 days
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md">
                  <h3 className="font-bold text-lg mb-3">
                    Not Eligible for Refund
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✕</span>
                      Subscription cancellations after 14 days
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✕</span>
                      Service dissatisfaction without technical issues
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✕</span>
                      Change of mind after feature usage
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✕</span>
                      Violations of our Terms of Service
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-semibold">Refund Process</h3>
              <p>
                To request a refund, please contact our customer support team at{" "}
                <a
                  href="mailto:support@gitdocs.space"
                  className="text-gitdocs-blue hover:underline"
                >
                  support@gitdocs.space
                </a>{" "}
                with your account information and reason for the refund request.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-6">
                <div className="flex items-center mb-2">
                  <Undo className="h-5 w-5 text-gitdocs-orange mr-2" />
                  <h4 className="text-md font-medium">Refund Timeline</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Refunds are typically processed within 5-7 business days. The
                  time required for the refund to appear in your account depends
                  on your payment method and financial institution.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <p>
                If you have any questions about our Cancellation and Refund
                Policy, please contact us:
              </p>
              <ul>
                <li>
                  Email:{" "}
                  <a
                    href="mailto:support@gitdocs.space"
                    className="text-gitdocs-blue hover:underline"
                  >
                    support@gitdocs.space
                  </a>
                </li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Hours: Monday to Friday, 9:00 AM to 5:00 PM EST</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 border-t pt-8">
            <p className="text-gray-600 text-center">
              Have questions about our policies?{" "}
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

export default CancellationRefund;
