export const VALID_EVENT_NAMES = [
  'navigation_click',
  'cta_click',
  'content_open',
  'contact_email_click',
  'contact_phone_click',
  'contact_form_success',
] as const;

export type AnalyticsEventName = (typeof VALID_EVENT_NAMES)[number];
export type AnalyticsEvents = {
  navigation_click: { target_id: string; location: 'header' | 'menu' | 'footer' };
  cta_click: { cta_id: string; location: 'hero' | 'content' | 'footer' };
  content_open: { content_type: 'page' | 'post'; content_id: string };
  contact_email_click: { location: 'header' | 'contact' | 'footer' };
  contact_phone_click: { location: 'header' | 'contact' | 'footer' };
  contact_form_success: { form_id: string };
};
