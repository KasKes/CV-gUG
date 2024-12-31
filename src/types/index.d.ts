export type TagType = {
  name: string;
  slug: string;
}

export type CategoryType = {
  name: string;
  slug: string;
}

export type PricingType = {
  title: string;
  date: string;
  bg_image: string;
  description: string;
  meta_title: string;
  image: string;
  pricingTable: {
    title: string;
    icon: string;
    value: number;
    unit: string;
    link: string;
    features: string[];
  }[];
};

export interface OurExpertiseType {
  enable: boolean;
  subtitle: string;
  title: string;
  content: string;
  funfacts: {
    icon: string;
    title: string;
    count: number;
  }[];
  progressbar: {
    title: string;
    progress: string;
  }[];
}

export interface CallToActionType {
  enable: boolean;
  bg_image: string;
  title: string;
  button: {
    enable: boolean;
    label: string;
    link: string;
  };
}

export interface MissionVisionType {
  enable: boolean;
  subtitle: string;
  title: string;
  content: string;
  image: string;
  accordion: [
    {
      title: string;
      description: string;
    },
  ];
}

export interface TestimonialType {
  enable: boolean;
  title: string;
  subtitle: string;
  image: string;
  list: [
    {
      name: string;
      content: string;
      designation: string;
    },
  ];
}
