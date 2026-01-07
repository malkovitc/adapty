export interface Testimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
    companyLogo?: string;
  };
}

export const testimonials: Testimonial[] = [
  {
    id: 'cem-ortabas',
    quote: "Migrating off RevenueCat was not an easy decision for us. We've chosen Adapty because we believe they are a better partner as we grow. Looking back it was the right call. Despite some hiccups, the Adapty team was always there to help us during the migration and afterward, and their support is top-notch. I recommend Adapty as a reliable partner.",
    author: {
      name: 'Cem Ortabas',
      role: 'Co-founder and CEO',
      company: 'HubX',
      avatar: '/images/testimonials/cem-ortabas.webp',
      companyLogo: '/images/testimonials/logo-hubx.svg',
    },
  },
  {
    id: 'chris-bick',
    quote: "We've been working with Adapty since 2021 and I couldn't be happier about it. We've tried other subscription management platforms in the past so I can compare. Adapty introduced numerous features over the years and constantly helped us grow. They have the best analytics on the market and all the integrations you can think of. If you looking to boost the revenue of your app, I definitely recommend Adapty.",
    author: {
      name: 'Chris Bick',
      role: 'Founder and CEO',
      company: 'Bickster',
      avatar: '/images/testimonials/chris-bick.webp',
      companyLogo: '/images/testimonials/logo-bickster.png',
    },
  },
  {
    id: 'yalcin-ozdemir',
    quote: "We chose Adapty for its powerful paywall A/B testing capabilities, which helped us optimize our monetization strategy effectively. The user-friendly platform, flexible pricing, and exceptional customer support make Adapty a superior choice over competitors.",
    author: {
      name: 'Yalcin Ozdemir',
      role: 'Founder & CEO',
      company: 'AppNation',
      avatar: '/images/testimonials/yalcin-ozdemir.webp',
      companyLogo: '/images/testimonials/logo-appnation.png',
    },
  },
  {
    id: 'kyle-smith',
    quote: "Adapty's platform makes it easy for non-developers to create and manage A/B tests, paywalls, product mix and pricing structure. They have a great external API that makes it easy to pass related events to other analytics tools like Amplitude and Mixpanel.",
    author: {
      name: 'Kyle Smith',
      role: 'Head of Data',
      company: 'Smitten Dating',
      avatar: '/images/testimonials/kyle-smith.webp',
      companyLogo: '/images/testimonials/logo-smitten.webp',
    },
  },
  {
    id: 'roi-mulia',
    quote: "We've tested more than three hundred paywalls in the space of four months. Adapty allows testing basically any element of the paywall, and we took advantage of that. We've tested them all: products, title text, CTA buttons, images, videos etc. With Adapty's A/B testing, we managed to double our monthly revenue. I wasn't sure if one instrument could make such an impact, but I witnessed it myself.",
    author: {
      name: 'Roi Mulia',
      role: 'Founder & CEO',
      company: 'SocialKit',
      avatar: '/images/testimonials/roi-mulia.webp',
      companyLogo: '/images/testimonials/logo-socialkit.svg',
    },
  },
];
