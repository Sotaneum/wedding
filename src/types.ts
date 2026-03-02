export interface Setting {
  site: {
    url: string;
    title: string;
    name: string;
    description: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
  };
  banner: {
    images: string[];
  };
  hero: {
    targetName: string;
    names?: string[];
    relation: string;
  }[];
  wedding: {
    date: string;
    day: string;
    time: string;
    location: string;
    address: string;
    address2: string;
  };
  map?: {
    kakao_map_key: string;
    center: {
      lat: number;
      lng: number;
    };
    marker: {
      lat: number;
      lng: number;
    };
    title: string;
    websiteUrl: string;
    weddingLogo: string;
    locationSketch: string;
  };
  title?: {
    info: string;
    showParent: boolean;
  };
  effects?: {
    sakura?: boolean;
  };
  countdown?: boolean;
  story?: {
    title: string;
    description: string[];
    card: string;
  };
  calendar?:
    | boolean
    | {
        weekDays?: string[];
        holidays?: number[];
      };
  contact?: {
    title: string;
    contact: { name: string; phone: string; role: string }[];
  }[];
  gallery?: {
    fillerImages?: string[];
  };
  notice?: {
    title: string;
    message: string[];
  }[];
  bus_notice?: {
    title: string;
    steps: {
      label: string;
      time: string;
      note?: string;
      desc: string;
    }[];
    qr?: {
      description: string[];
      link: string;
      img: string;
      imgAlt: string;
    };
  }[];
  congratulations?: {
    title: string;
    accounts: {
      name: string;
      bank: string;
      account: string;
      description?: string;
      role: string;
    }[];
  }[];
  share?: {
    kakaotalk: {
      template_id: number;
      key: string;
    };
  };
}
