/** Local image assets — bundled in /public/images for reliable loading */
const local = (path: string) => `/images/${path}`;

export const images = {
  logo: "/brand/app-logo.png",

  cafes: {
    "cafe-1": local("cafes/cafe-1.jpg"),
    "cafe-2": local("cafes/cafe-2.jpg"),
    "cafe-3": local("cafes/cafe-3.jpg"),
    "cafe-4": local("cafes/cafe-4.jpg"),
    "cafe-5": local("cafes/cafe-5.jpg"),
  },

  menu: {
    "m-1": local("menu/m-1.jpg"),
    "m-2": local("menu/m-2.jpg"),
    "m-3": local("menu/m-3.jpg"),
    "m-4": local("menu/m-4.jpg"),
    "m-5": local("menu/m-5.jpg"),
    "m-6": local("menu/m-6.jpg"),
    "m-7": local("menu/m-7.jpg"),
    "m-8": local("menu/m-8.jpg"),
    "m-9": local("menu/m-9.jpg"),
    "m-10": local("menu/m-10.jpg"),
    "m-11": local("menu/m-11.jpg"),
    "m-12": local("menu/m-12.jpg"),
    "m-13": local("menu/m-13.jpg"),
    "m-14": local("menu/m-14.jpg"),
    "m-15": local("menu/m-15.jpg"),
    "m-16": local("menu/m-16.jpg"),
    "m-17": local("menu/m-17.jpg"),
    "m-18": local("menu/m-18.jpg"),
  },

  rewards: {
    "r-1": local("rewards/r-1.jpg"),
    "r-2": local("rewards/r-2.jpg"),
    "r-3": local("rewards/r-3.jpg"),
    "r-4": local("rewards/r-4.jpg"),
    "r-5": local("rewards/r-5.jpg"),
    "r-6": local("rewards/r-6.jpg"),
  },

  promos: {
    "p-1": local("promos/p-1.jpg"),
    "p-2": local("promos/p-2.jpg"),
  },

  merchants: {
    "m-1": local("cafes/cafe-4.jpg"),
    "m-2": local("cafes/cafe-1.jpg"),
    "m-3": local("cafes/cafe-3.jpg"),
  },
} as const;
