/// <reference types="vite/client" />

declare module "*.JPG" {
    const value: string;
    export default value;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}

interface Window {
    kakao: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      maps: any;
    };
    Kakao: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Share: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      init: any;
    };
}
