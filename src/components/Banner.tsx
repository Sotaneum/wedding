import { useState, useEffect, memo, type ReactNode } from "react";

import "./Banner.css";

interface BannerProps {
  images: string[];
  rows?: number;
  cols?: number;
  transitionDuration?: number;
  intervalTime?: number;
  children?: ReactNode;
  onLoaded?: () => void;
}

const Banner = memo(function Banner({
  images,
  rows = 6,
  cols = 6,
  transitionDuration = 1500,
  intervalTime = 4000,
  children,
  onLoaded,
}: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setNextIndex((prev) => (prev + 1) % images.length);
        setIsAnimating(false);
      }, transitionDuration);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [images.length, transitionDuration, intervalTime]);

  return (
    <div className="banner-container">
      <img
        src={images[0]}
        alt="spacer"
        className="banner-spacer"
        loading="eager"
        fetchPriority="high"
        onLoad={onLoaded}
      />
      <div
        className="banner-bg-next"
        style={{
          backgroundImage: `url(${images[nextIndex]})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "0 0",
        }}
      />
      <div
        className="banner-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const dist = row + (cols - 1 - col);
          const maxDist = rows - 1 + (cols - 1);
          const delay =
            maxDist > 0 ? (dist / maxDist) * (transitionDuration * 0.6) : 0;
          const x = cols > 1 ? (col / (cols - 1)) * 100 : 0;
          const y = rows > 1 ? (row / (rows - 1)) * 100 : 0;

          return (
            <div
              key={`${currentIndex}-${i}`}
              className="banner-grid-item"
              style={{
                backgroundImage: `url(${images[currentIndex]})`,
                backgroundSize: `${cols * 100}% ${rows * 100}%`,
                backgroundPosition: `${x}% ${y}%`,
                opacity: isAnimating ? 0 : 1,
                transition: `opacity 0.4s ease-in-out ${delay}ms`,
              }}
            />
          );
        })}
      </div>
      {children}
    </div>
  );
});

export default Banner;
