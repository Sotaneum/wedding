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
  filteredImages: string[];
}

function Gallery({ images, filteredImages }: GalleryProps) {
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
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;

    // Left Swipe
    if (distance > minSwipeDistance) {
      nextImage();
    }
    // Right Swipe
    else if (distance < -minSwipeDistance) {
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
    [images, selectedIndex],
  );

  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex === null) return;
      setSelectedIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : images.length - 1,
      );
    },
    [images, selectedIndex],
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

  return (
    <div>
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
        {filteredImages.length > 0 &&
          filteredImages
            .slice(0, images.length % 2)
            .map((src, index) => (
              <img
                key={src}
                className="gallery-image gallery-filler even"
                src={src}
                alt={`Filtered image ${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            ))}
        {filteredImages.length > 0 &&
          filteredImages
            .slice(0, 3 - (images.length % 3))
            .map((src, index) => (
              <img
                key={src}
                className="gallery-image gallery-filler odd"
                src={src}
                alt={`Filtered image ${index + 1}`}
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
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image
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
