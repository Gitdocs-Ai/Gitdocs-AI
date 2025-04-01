import { buttonVariants } from "@/components/ui/button-variants";
import { SignUpButton } from "@clerk/nextjs";
const CTA = () => {
  return (
    <section id="pricing" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gitdocs-blue/5 via-gitdocs-purple/5 to-gitdocs-orange/5" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl">
          <div className="relative bg-hero-gradient p-8 md:p-12 text-white">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 mb-4 border border-white/30 rounded-full bg-white/10 text-white text-xs font-medium">
                Limited Time Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Documentation?
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl">
                Join thousands of developers who are saving time and improving
                their documentation with GitDocs AI.
              </p>
            </div>
          </div>
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="border border-gray-200 rounded-xl p-6 bg-gray-50/50">
                <div className="text-gitdocs-blue font-bold text-lg mb-2">
                  Free
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  $0
                  <span className="text-lg text-muted-foreground font-normal">
                    /month
                  </span>
                </h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gitdocs-blue mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Up to 3 repositories</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gitdocs-blue mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Basic AI documentation</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gitdocs-blue mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Community support</span>
                  </li>
                </ul>
                <SignUpButton>
                  <p
                    className={`cursor-pointer mt-9 ${buttonVariants({ variant: "outline-gradient", size: "lg", className: "w-full" })}`}
                  >
                    Get Started
                  </p>
                </SignUpButton>
              </div>

              <div className="border border-gitdocs-blue/30 rounded-xl p-6 bg-gitdocs-blue/5 relative">
                <div className="absolute top-0 right-0 mt-6 mr-6">
                  <div className="bg-gitdocs-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                    Popular
                  </div>
                </div>
                <div className="text-gitdocs-blue font-bold text-lg mb-2">
                  Pro
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  $9
                  <span className="text-lg text-muted-foreground font-normal">
                    /month
                  </span>
                </h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gitdocs-blue mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Unlimited repositories</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gitdocs-blue mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Advanced AI documentation</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gitdocs-blue mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Customizable templates</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-gitdocs-blue mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Priority support</span>
                  </li>
                </ul>
                <SignUpButton>
                  <p
                    className={`cursor-pointer ${buttonVariants({ variant: "gradient", size: "lg", className: "w-full" })}`}
                  >
                    Start Pro Trial
                  </p>
                </SignUpButton>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
