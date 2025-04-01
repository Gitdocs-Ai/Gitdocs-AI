import React from "react";
import Link from "next/link";
import { Package, Truck, MapPin, Timer } from "lucide-react";
import PageHeader from "@/components/LandingPage/PageHeader";
import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";

const ShippingDelivery = () => {
  return (
    <>
      <Navbar />
      <PageHeader
        title="Shipping & Delivery"
        subtitle="Information about our digital delivery process"
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Package className="h-8 w-8 text-gitdocs-blue mr-3" />
                <h2 className="text-2xl font-bold mt-0">
                  Digital Product Delivery
                </h2>
              </div>
              <p>
                As GitDocs AI is a software-as-a-service (SaaS) platform, we
                provide immediate access to our services upon successful
                subscription or purchase. There are no physical products to
                ship.
              </p>

              <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 my-8">
                <h3 className="text-lg font-medium text-gitdocs-blue">
                  Immediate Access
                </h3>
                <p className="mt-2">
                  After completing your purchase or subscription, you will
                  receive:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li>An email confirmation with your account details</li>
                  <li>Immediate access to your GitDocs AI dashboard</li>
                  <li>
                    Access to all features included in your subscription plan
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Timer className="h-8 w-8 text-gitdocs-purple mr-3" />
                <h2 className="text-2xl font-bold mt-0">
                  Service Activation Timeline
                </h2>
              </div>

              <div className="relative border-l-2 border-gitdocs-blue pl-8 py-4 ml-4 space-y-10">
                <div className="relative">
                  <div className="absolute -left-10 top-0 bg-gitdocs-blue text-white rounded-full w-7 h-7 flex items-center justify-center">
                    1
                  </div>
                  <h3 className="text-xl font-medium">Purchase Confirmation</h3>
                  <p className="text-gray-600">
                    Immediately after completing your purchase, you'll receive a
                    purchase confirmation email with your receipt.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-10 top-0 bg-gitdocs-purple text-white rounded-full w-7 h-7 flex items-center justify-center">
                    2
                  </div>
                  <h3 className="text-xl font-medium">Account Activation</h3>
                  <p className="text-gray-600">
                    For new users, we'll create your account within minutes.
                    Existing users will have new features or subscription
                    changes applied immediately.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-10 top-0 bg-gitdocs-orange text-white rounded-full w-7 h-7 flex items-center justify-center">
                    3
                  </div>
                  <h3 className="text-xl font-medium">Service Access</h3>
                  <p className="text-gray-600">
                    Access your GitDocs AI dashboard to start using all
                    available features based on your subscription plan.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <MapPin className="h-8 w-8 text-gitdocs-orange mr-3" />
                <h2 className="text-2xl font-bold mt-0">Global Availability</h2>
              </div>
              <p>
                GitDocs AI is available worldwide, with some exceptions due to
                regulatory requirements. Our service is cloud-based and
                accessible from anywhere with an internet connection.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <h3 className="font-bold text-lg mb-3">
                    Service Availability
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      24/7 access to your account and dashboard
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Cloud-based solution with 99.9% uptime
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Access from any device with internet
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <h3 className="font-bold text-lg mb-3">
                    Service Limitations
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">!</span>
                      Scheduled maintenance periods
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">!</span>
                      Regional restrictions in certain countries
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">!</span>
                      Feature availability based on subscription plan
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-gitdocs-blue mr-3" />
                <h2 className="text-2xl font-bold mt-0">
                  Enterprise Deployment
                </h2>
              </div>
              <p>
                For enterprise customers requiring custom deployment options, we
                offer specialized delivery methods including:
              </p>
              <ul>
                <li>Private cloud deployment</li>
                <li>On-premises installation options</li>
                <li>Custom integration with your existing systems</li>
                <li>Dedicated implementation team for enterprise rollouts</li>
              </ul>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-6">
                <p className="text-sm text-gray-600">
                  Enterprise deployments follow a custom timeline based on your
                  organization's specific requirements. Contact our sales team
                  for more information about enterprise delivery options.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <p>
                If you have any questions about our digital delivery process or
                need assistance with accessing your purchased services, please
                contact us:
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
                <li>Support Hours: Monday to Friday, 9:00 AM to 5:00 PM EST</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 border-t pt-8">
            <p className="text-gray-600 text-center">
              Need help with your GitDocs AI subscription?{" "}
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

export default ShippingDelivery;
