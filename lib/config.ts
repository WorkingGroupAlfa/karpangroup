export const siteConfig = {
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Karpan Climate Service',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/421000000000',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@karpanclimate.sk',
  city: process.env.NEXT_PUBLIC_COMPANY_CITY || 'Bratislava',
  country: process.env.NEXT_PUBLIC_COMPANY_COUNTRY || 'Slovakia',
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'Replace with registered address',
  postalCode: process.env.NEXT_PUBLIC_COMPANY_POSTAL_CODE || '00000',
  ico: process.env.NEXT_PUBLIC_COMPANY_ICO || '',
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'sk',
  bookingReceiverEmail: process.env.BOOKING_RECEIVER_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@karpanclimate.sk',
  contactSubject: process.env.NEXT_PUBLIC_CONTACT_MESSAGE_SUBJECT || 'Service request from website'
};
