export const SITE_CONFIG = {
  agentName: "Cole Swearingen",
  agentInitials: "CS",
  agentEmail: "cole.swearingen@compass.com",
  agentLicense: "CA DRE# 02052462",
  agentPhone: "(214) 555-0100", // Update with real phone number
  agentAddress: "Compass, 5950 Berkshire Ln #700, Dallas, TX 75225",
  agency: "Compass Real Estate",
  // Your specific R2 Placeholder URL
  mediaBaseUrl: "https://pub-0a14d2bf83cc482ab589da588a45c6b0.r2.dev",
  // Hero video from R2
  heroVideo: "dallas-house.mp4",
  // Headshot from R2
  headshot: "cole-swearingen-headshot.webp",
  // Social Media Links (update with real URLs or set to null to hide)
  socialMedia: {
    facebook: null,
    instagram: null,
    linkedin: null,
    zillow: null
  },
  // Mapbox Configuration
  mapbox: {
    accessToken: 'pk.eyJ1IjoibWVldHBhaXJ3ZWxsIiwiYSI6ImNta2VkamIxdjA2MXUzbG9nMHZhMnBhdmQifQ.LoWOwOUDP11K7-RW8xV1Lw',
    defaultCenter: [-96.7970, 32.7767], // Dallas, TX
    defaultZoom: 11
  },
  // Google Maps Configuration
  googleMaps: {
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    defaultCenter: { lat: 32.7767, lng: -96.7970 }, // Dallas, TX
    defaultZoom: 11
  }
};
