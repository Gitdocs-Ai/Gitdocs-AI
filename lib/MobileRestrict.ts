// MobileRestrict.ts - Strict mobile-only detection

/**
 * A robust utility to strictly detect mobile phones only (not tablets or laptops)
 * with proper error handling and high accuracy.
 */

/**
 * Interface for device detection results
 */
interface DeviceInfo {
  isMobile: boolean;
  details: {
    deviceType: "mobile" | "tablet" | "desktop" | "unknown";
    userAgent: string;
    screenWidth: number;
    screenHeight: number;
  };
}

/**
 * Check if the current device is strictly a mobile phone
 * @returns Object containing detection result and detailed information
 */
export function checkMobile(): boolean {
  try {
    // Handle server-side rendering
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return false;
    }

    // Check for overrides first (allow users to bypass detection if needed)
    if (
      typeof localStorage !== "undefined" &&
      localStorage.getItem("forceDesktopView") === "true"
    ) {
      return false;
    }

    const userAgent = (navigator.userAgent || "").toLowerCase();

    // Definitive markers of laptops/desktops - if any of these are present, it's NOT a mobile
    const desktopIndicators = [
      "windows nt",
      "macintosh",
      "linux x86_64",
      "win64",
      "x11",
    ];

    if (desktopIndicators.some((indicator) => userAgent.includes(indicator))) {
      // This is very likely a desktop/laptop
      return false;
    }

    // Strong mobile phone indicators
    const mobilePhoneIndicators = [
      "iphone",
      "android(?! tablet)", // Android without tablet
      "windows phone",
      "blackberry",
      "nokia",
      "mobile safari",
      "(?<!tablet) safari.*mobile", // Mobile Safari without tablet
      "opera mini",
      "opera mobi",
      "samsung.*mobile",
      "mobile.*firefox",
    ];

    const mobilePhoneRegex = new RegExp(mobilePhoneIndicators.join("|"), "i");

    // If any strong mobile indicator matches, it's a mobile phone
    if (mobilePhoneRegex.test(userAgent)) {
      return true;
    }

    // Screen size checks - very small screens are likely mobile phones
    // Get the actual screen size (not the browser window)
    const screenWidth = window.screen.width || 0;
    const screenHeight = window.screen.height || 0;
    const smallestDimension = Math.min(screenWidth, screenHeight);

    // Typical phone dimensions
    if (smallestDimension > 0 && smallestDimension <= 500) {
      // Very small screens are almost certainly phones
      return true;
    }

    // Device-specific checks for mobile
    const isMobileByDeviceType =
      /Mobi/i.test(userAgent) && !/tablet|ipad|playbook|silk/i.test(userAgent);

    if (isMobileByDeviceType) {
      return true;
    }

    // Check for portrait orientation AND small width as a final check for phones
    // but only if orientation exists and other signals are present
    const isSmallPortraitDevice =
      smallestDimension <= 480 &&
      window.innerHeight > window.innerWidth &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (isSmallPortraitDevice) {
      return true;
    }

    // If we get here, it's not clearly identifiable as a mobile phone
    return false;
  } catch (error) {
    console.error("Mobile detection error:", error);
    // Fail safe to desktop mode
    return false;
  }
}

/**
 * Add a user-controlled override to force desktop or mobile view
 * @param mode The view mode to force ('desktop' or 'mobile')
 */
export function setViewMode(mode: "desktop" | "mobile" | "auto"): void {
  try {
    if (typeof localStorage === "undefined") return;

    if (mode === "desktop") {
      localStorage.setItem("forceDesktopView", "true");
    } else if (mode === "mobile") {
      localStorage.setItem("forceDesktopView", "false");
    } else {
      // Auto mode - remove override
      localStorage.removeItem("forceDesktopView");
    }
  } catch (error) {
    console.warn("Error setting view mode:", error);
  }
}

/**
 * Get detailed information about the device
 * This is useful for debugging detection issues
 */
export function getDeviceInfo(): DeviceInfo {
  try {
    // Handle server-side rendering
    if (typeof window === "undefined" || typeof navigator === "undefined") {
      return {
        isMobile: false,
        details: {
          deviceType: "unknown",
          userAgent: "",
          screenWidth: 0,
          screenHeight: 0,
        },
      };
    }

    const userAgent = (navigator.userAgent || "").toLowerCase();
    const screenWidth = window.screen.width || 0;
    const screenHeight = window.screen.height || 0;

    // Determine device type
    let deviceType: "mobile" | "tablet" | "desktop" | "unknown" = "unknown";

    // Check for desktop indicators
    if (/windows nt|macintosh|linux x86_64|win64|x11/i.test(userAgent)) {
      deviceType = "desktop";
    }
    // Check for tablet indicators
    else if (
      /ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(userAgent)
    ) {
      deviceType = "tablet";
    }
    // Check for mobile indicators
    else if (
      /iphone|ipod|android|blackberry|opera mini|opera mobi|windows phone|mobile/i.test(
        userAgent,
      )
    ) {
      deviceType = "mobile";
    }

    const isMobile = checkMobile();

    return {
      isMobile,
      details: {
        deviceType,
        userAgent,
        screenWidth,
        screenHeight,
      },
    };
  } catch (error) {
    console.error("Device info detection error:", error);
    return {
      isMobile: false,
      details: {
        deviceType: "unknown",
        userAgent:
          typeof navigator !== "undefined" ? navigator.userAgent || "" : "",
        screenWidth: 0,
        screenHeight: 0,
      },
    };
  }
}
