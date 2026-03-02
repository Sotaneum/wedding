const modules = import.meta.glob<{ default: string }>("./assets/**/*.*", {
  eager: true,
});
export default Object.keys(modules).map((key) => modules[key].default);
