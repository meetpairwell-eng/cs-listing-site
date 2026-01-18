export const SITE_CONFIG = {
  agentName: "Cole Swearingen",
  agentInitials: "CS",
  agentEmail: "cole.swearingen@compass.com",
  agentLicense: "CA DRE# 02052462",
  agentPhone: "(214) 927-1313",
  officePhone: "(214) 814-8100",
  agentAddress: "5960 Berkshire Ln Ste 700, Dallas TX 75225",
  agency: "Compass Real Estate",
  // Your specific R2 Placeholder URL
  mediaBaseUrl: "https://pub-0a14d2bf83cc482ab589da588a45c6b0.r2.dev",
  // Hero video from R2
  heroVideo: "dallas-house.mp4",
  // Headshot from R2
  headshot: "cole-swearingen-headshot.webp",
  // Contact section background
  contactHeroBg: "contact-bg.png",
  // Modal background (Unsplash or R2)
  modalBg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
  testimonialsBg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
  // Footer Logos
  fairHousingLogo: "main-page/realtor-eho-logo.webp", // In src/assets
  brokerLogo: "main-page/compass-logo.webp", // Set to a filename in src/assets/ or a URL
  // Social Media Links (update with real URLs or set to null to hide)
  socialMedia: {
    facebook: null,
    instagram: null,
    linkedin: null,
    zillow: null
  },
  // Google Maps Configuration
  googleMaps: {
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    defaultCenter: { lat: 32.7767, lng: -96.7970 }, // Dallas, TX
    defaultZoom: 11
  }
};
