// Facebook Pixel utility functions

// Toggle this flag to disable Facebook Pixel during testing.
const IS_TEST_MODE = true;
declare global {
  interface Window {
    fbq: (
      action: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track a Facebook Pixel event
 * @param eventName - The name of the event to track (e.g., 'Lead', 'Contact', 'CompleteRegistration')
 * @param params - Optional parameters to send with the event
 */
export const trackFacebookPixel = (
  eventName: string,
  params?: Record<string, unknown>
): void => {
  if (IS_TEST_MODE) {
    return;
  }

  if (typeof window !== "undefined" && window.fbq) {
    if (params) {
      window.fbq("track", eventName, params);
    } else {
      window.fbq("track", eventName);
    }
  }
};
