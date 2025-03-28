import Script from "next/script";

const GoogleAnalytics = () => (
    <>
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-E0TKY71491"
            strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-E0TKY71491');
      `}
        </Script>
    </>
);

export default GoogleAnalytics;
