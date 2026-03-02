const modules = import.meta.glob<{ default: string }>(
  "./assets/gallery/**/*.*",
  {
    eager: true,
  },
);
export default Object.keys(modules).map((key) => modules[key].default);
