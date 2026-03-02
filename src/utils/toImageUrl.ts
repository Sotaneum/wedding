const toImageUrl = (images: string[], filename: string) => {
  if (!filename) return "";
  const lastDotIndex = filename.lastIndexOf(".");
  const name =
    lastDotIndex !== -1 ? filename.substring(0, lastDotIndex) : filename;
  const ext = lastDotIndex !== -1 ? filename.substring(lastDotIndex + 1) : "";

  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^${escapedName}(-[a-zA-Z0-9_-]+)?\\.${ext}$`, "i");

  return (
    images.find((image) => {
      const segments = image.split("/");
      const lastSegment = segments[segments.length - 1];
      return regex.test(lastSegment);
    }) ?? ""
  );
};

export default toImageUrl;
