export const SITE_CONFIG = {
  agentName: "Cole Swearingen",
  agentInitials: "CS",
  agentEmail: "cole.swearingen@compass.com",
  agentLicense: "CA DRE# 02052462",
  agentPhone: "(972) 971-9586",
  officePhone: "(214) 814-8100",
  agentAddress: "5960 Berkshire Ln Ste 700,\nDallas TX 75225",
  agency: "Compass Real Estate",
  // Your specific R2 Placeholder URL
  mediaBaseUrl: "https://pub-0a14d2bf83cc482ab589da588a45c6b0.r2.dev",
  // Hero video from R2 (Desktop)
  heroVideo: "main-page/dallas-house.mp4",
  // Hero Image (Mobile Replacement) - upload to R2
  heroMobileImage: "5609Ursula/5609Ursula-1.webp", // Updated from 3808-Potomac-Hero.webp
  // Headshot from R2
  headshot: "cole-swearingen-headshot.webp",
  // Contact section background
  contactHeroBg: "contact-bg.png",
  // Modal background (Unsplash or R2)
  modalBg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
  testimonialsBg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
  serviceImages: {
    homeSearch: "5609Ursula/5609Ursula-5.webp",
    homeValuation: "5609Ursula/5609Ursula-7.webp",
    connect: "4508-Belfort/4508Belfort-27.webp"
  },

  // Awards Images (upload to R2)
  awards: [
    "https://pub-0a14d2bf83cc482ab589da588a45c6b0.r2.dev/Awards/D-best-2026.webp",
    "https://pub-0a14d2bf83cc482ab589da588a45c6b0.r2.dev/Awards/real-producer-2026.webp"
  ],
  // Footer Logos
  fairHousingLogo: "main-page/realtor-eho-logo.webp", // In src/assets
  brokerLogo: "main-page/compass-logo.webp", // Set to a filename in src/assets/ or a URL
  // Social Media Links (update with real URLs or set to null to hide)
  socialMedia: {
    facebook: "https://www.facebook.com/cole.swearingen.35/",
    instagram: "https://www.instagram.com/coleswear/?hl=en",
    linkedin: null,
    zillow: null
  },
  // About Cole Configuration
  aboutCole: {
    heroImage: {
      r2Path: "3808Potomac/3808Potomac-24.webp",
      fallback: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"
    },
    headshot: {
      r2Path: "cole-swearingen-headshot.webp",
      fallback: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80"
    },
    showcaseImages: [
      {
        r2Path: "5609Ursula/5609Ursula-5.webp",
        fallback: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80",
        title: "Reliable. Honest. Proven.",
        description: "People trust Cole as a steady hand, especially when the market feels unpredictable. Whether interest rates are shifting or the economy is changing, he uses real data and honest, friendly communication to keep your home and your future safe. He is known for staying calm under pressure and being easy to work with, which makes a big difference when the process gets emotional. By staying closely connected to Dallas' top agents, Cole makes sure his clients always have the best information and a clear advantage in our city's fast-moving market."
      },
      {
        r2Path: "3808Potomac/3808Potomac-16.webp",
        fallback: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1000&q=80",
        title: "Strategic Builder & Developer Partnerships",
        description: "Cole acts as a technical partner in the new construction and luxury renovation space across the Dallas Metroplex. With extensive experience in ground-up development, he collaborates with builders on floor plan optimization to ensure every square foot aligns with current market demands. From interior design and landscaping to complex renovations, Cole provides the on-the-ground insight needed to curate a product that sells. For developers, he is a strategic asset who understands how to bridge the gap between architectural vision and a successful, high-yield closing."
      },
      {
        r2Path: "5609Ursula/5609Ursula-2.webp",
        fallback: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
        title: "Exclusive Access & Insider Intelligence",
        description: "Cole's deep-rooted connections with Dallas' most prominent figures and top-tier agents put him at the center of the local real estate conversation. By staying active in these elite circles, he understands the private trends of the market and the people driving them. Whether it's a new development in Frisco or a shift in the Park Cities, Cole provides his clients with insider knowledge that is clear and helpful. This connected approach gives his clients a real advantage by helping them understand where the luxury market is headed before everyone else."
      }
    ]
  },
  // Google Maps Configuration
  googleMaps: {
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    defaultCenter: { lat: 32.7767, lng: -96.7970 }, // Dallas, TX
    defaultZoom: 11
  }
};
