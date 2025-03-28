import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import { AppProvider } from "@/contexts/AppContext";
import { FileTreeProvider } from "@/contexts/FileTreeContext";
import SessionWrapper from "@/lib/SessionWrapper";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Toaster } from "@/components/ui/sonner";
import { ScrollPositionProvider } from "@/contexts/ScrollContextProvider";
import GoogleTagManager from "@/components/GoogleTagManager";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionWrapper>
            <ClerkProvider dynamic afterSignOutUrl="/logout">
                <html lang="en" dir="ltr">
                    <head>
                        {/* Google Tag Manager */}
                        <GoogleTagManager />
                        <meta charSet="utf-8" />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1.0"
                        />
                        <meta
                            name="description"
                            content="Improve your GitHub repositories with AI-driven insights and code quality analysis."
                        />
                        <meta
                            name="keywords"
                            content="GitHub, code analysis, AI, repository analysis, code quality, code review, readme generator, AI tools for developers, Git automation, readme, code documentation, code improvement, code documentation generator, README.md"
                        />
                        <meta name="rating" content="General" />
                        <meta name="revisit-after" content="7 days" />
                        <meta name="distribution" content="Global" />
                        <meta name="coverage" content="Worldwide" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="author" content="Abhas Kumar Sinha" />
                        <meta name="robots" content="index, follow" />
                        <link rel="canonical" href="https://gitdocs.space" />
                        <link
                            rel="shortcut icon"
                            href="/favicon.ico"
                            type="image/x-icon"
                        />
                        <meta
                            name="google-site-verification"
                            content="jE8xZwoJxnDc2ICzxeLXfUNjB1xxBdMBxkwOVsxsnEY"
                        />

                        <link
                            rel="icon"
                            type="image/png"
                            sizes="192x192"
                            href="/android-chrome-192x192.png"
                        />
                        <link
                            rel="icon"
                            type="image/png"
                            sizes="512x512"
                            href="/android-chrome-512x512.png"
                        />
                        <link
                            rel="icon"
                            type="image/png"
                            sizes="16x16"
                            href="/favicon-16x16.png"
                        />
                        <link
                            rel="icon"
                            type="image/png"
                            sizes="32x32"
                            href="/favicon-32x32.png"
                        />
                        <link
                            rel="apple-touch-icon"
                            sizes="180x180"
                            href="/apple-touch-icon.png"
                        />
                        <link rel="manifest" href="/site.webmanifest" />
                        <meta name="theme-color" content="#ffffff" />

                        {/* Open Graph Meta Tags */}
                        <meta property="og:site_name" content="Gitdocs AI" />
                        <meta property="og:locale" content="en_US" />
                        <meta property="og:image:width" content="1200" />
                        <meta property="og:image:height" content="630" />
                        <meta
                            property="og:title"
                            content="Gitdocs AI - AI-powered Code Analysis"
                        />
                        <meta
                            property="og:description"
                            content="Improve your GitHub repositories with AI-driven insights and code quality analysis."
                        />
                        <meta
                            property="og:image"
                            content="https://gitdocs.space/logo.png"
                        />
                        <meta
                            property="og:url"
                            content="https://gitdocs.space"
                        />
                        <meta property="og:type" content="website" />

                        {/* Twitter Card Meta Tags */}
                        <meta
                            name="twitter:card"
                            content="summary_large_image"
                        />
                        <meta
                            name="twitter:title"
                            content="Gitdocs AI - AI-powered Code Analysis"
                        />
                        <meta
                            name="twitter:description"
                            content="Improve your GitHub repositories with AI-driven insights and code quality analysis."
                        />
                        <meta name="twitter:image" content="/logo.png" />

                        {/* Structured Data */}
                        <script type="application/ld+json">
                            {JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "SoftwareApplication",
                                name: "Gitdocs AI",
                                url: "https://gitdocs.space",
                                logo: "https://gitdocs.space/logo.png",
                                author: {
                                    "@type": "Person",
                                    name: "Abhas Kumar Sinha",
                                },
                                applicationCategory: "Developer Tools",
                                operatingSystem: "Web-based",
                                offers: {
                                    "@type": "Offer",
                                    price: "0",
                                    priceCurrency: "USD",
                                },
                                aggregateRating: {
                                    "@type": "AggregateRating",
                                    ratingValue: "4.8",
                                    reviewCount: "123",
                                },
                            })}
                        </script>

                        {/* Sitemap */}
                        <link
                            rel="sitemap"
                            type="application/xml"
                            title="Sitemap"
                            href="https://gitdocs.space/sitemap.xml"
                        />

                        {/* Preconnect for faster asset loading */}
                        <link
                            rel="preconnect"
                            href="https://fonts.googleapis.com"
                        />
                        <link
                            rel="preconnect"
                            href="https://fonts.gstatic.com"
                            crossOrigin="anonymous"
                        />
                        <link
                            rel="stylesheet"
                            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
                        />

                        {/* Google Analytics */}
                        <Script
                            async
                            src="https://www.googletagmanager.com/gtag/js?id=G-E0TKY71491"
                        ></Script>
                        <Script id="google-analytics">
                            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-E0TKY71491');
              `}
                        </Script>
                        <Script
                            src="https://checkout.razorpay.com/v1/checkout.js"
                            strategy="lazyOnload"
                        />
                    </head>
                    <body>
                        {/* Google Tag Manager (noscript) */}
                        <noscript>
                            <iframe
                                src="https://www.googletagmanager.com/ns.html?id=GTM-57TLBBSQ"
                                height="0"
                                width="0"
                                style={{
                                    display: "none",
                                    visibility: "hidden",
                                }}
                            ></iframe>
                        </noscript>
                        {/* End Google Tag Manager (noscript) */}
                        <GoogleAnalytics />
                        <Theme>
                            <AppProvider>
                                <FileTreeProvider>
                                    <ScrollPositionProvider>
                                        {children}
                                    </ScrollPositionProvider>
                                    <Analytics />
                                    <SpeedInsights />
                                    <Toaster />
                                </FileTreeProvider>
                            </AppProvider>
                        </Theme>
                    </body>
                </html>
            </ClerkProvider>
        </SessionWrapper>
    );
}
