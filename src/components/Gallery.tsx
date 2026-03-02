import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type TouchEvent,
} from "react";
import "./Gallery.css";
import LeftArrow from "./svg/LeftArrow";
import RightArrow from "./svg/RightArrow";

interface GalleryProps {
  images: string[];
  fillerImages: string[];
}

function Gallery({ images, fillerImages }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > minSwipeDistance) {
      nextImage();
    } else if (distance < -minSwipeDistance) {
      prevImage();
    }
  };

  const nextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex === null) return;
      setSelectedIndex((prev) =>
        prev !== null && prev < images.length - 1 ? prev + 1 : 0,
      );
    },
    [images.length, selectedIndex],
  );

  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex === null) return;
      setSelectedIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : images.length - 1,
      );
    },
    [images.length, selectedIndex],
  );

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, nextImage, prevImage, closeLightbox]);

  const mobileFillerCount = images.length % 2 === 1 ? 1 : 0;
  const desktopRemainder = images.length % 3;
  const desktopFillerCount = desktopRemainder === 0 ? 0 : 3 - desktopRemainder;
  const mobileFillerImages = fillerImages.slice(0, mobileFillerCount);
  const desktopFillerImages = fillerImages.slice(0, desktopFillerCount);

  return (
    <div className="gallery-section">
      <h1>갤러리</h1>
      <div className="gallery-container">
        {images.map((src, index) => (
          <img
            key={src}
            className="gallery-image"
            src={src}
            alt={`Gallery image ${index + 1}`}
            loading="lazy"
            decoding="async"
            onClick={() => setSelectedIndex(index)}
          />
        ))}
        {mobileFillerImages.length > 0 &&
          mobileFillerImages
            .map((src, index) => (
              <img
                key={`${src}-even-${index}`}
                className="gallery-image gallery-filler even"
                src={src}
                alt={`Gallery filler image ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
        {desktopFillerImages.length > 0 &&
          desktopFillerImages
            .map((src, index) => (
              <img
                key={`${src}-odd-${index}`}
                className="gallery-image gallery-filler odd"
                src={src}
                alt={`Gallery filler image ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="lightbox-overlay"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
            <LeftArrow />
          </button>
          <img
            src={images[selectedIndex]}
            alt={`Gallery image ${selectedIndex + 1}`}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lightbox-nav lightbox-next" onClick={nextImage}>
            <RightArrow />
          </button>
        </div>
      )}
    </div>
  );
}

export default Gallery;
