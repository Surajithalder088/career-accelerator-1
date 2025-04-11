import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  src: string;
  description?: string;
  isVideo?: boolean;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  // Pause video when slide is no longer current
  useEffect(() => {
    if (slide.isVideo && videoRef.current) {
      if (current !== index) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [current, index, slide.isVideo]);

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, title, description, isVideo } = slide;

  return (
    <div className="">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[50vmin] lg:w-[20vmin] xl:w-[35vmin] h-[100vmin] mx-[4vmin] z-10"
        onClick={() => handleSlideClick(index)}
        style={{
          transform:
            current !== index
              ? "scale(0.90)"
              : "scale(1)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <div
          className="absolute top-0 left-0 w-90 h-140 bg-[#1D1F2F] rounded-2xl overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          {isVideo ? (
            <>
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-600 ease-in-out"
                style={{
                  opacity: current === index ? 1 : 0.5,
                }}
                src={src}
                playsInline
                loop
                muted
              />
              {current === index && (
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-t from-black/70 to-transparent z-20">
                  <div className="text-left">
                    <h3 className="font-bold text-white text-lg truncate">{title}</h3>
                    {description && (
                      <p className="text-white/80 text-sm truncate">{description}</p>
                    )}
                  </div>
                  <button
                    onClick={togglePlayPause}
                    className="!bg-white/20 hover:!bg-white/30 rounded-full p-3 backdrop-blur-sm transition-all duration-300 ml-2 flex-shrink-0"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <img
                className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
                style={{
                  opacity: current === index ? 1 : 0.5,
                }}
                alt={title}
                src={src}
                onLoad={imageLoaded}
                loading="eager"
                decoding="sync"
              />
              {current === index && (
                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-start items-center bg-gradient-to-t from-black/70 to-transparent z-20">
                  <div className="text-left">
                    <h3 className="font-bold text-white text-lg truncate">{title}</h3>
                    {description && (
                      <p className="text-white/80 text-sm truncate">{description}</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>
      </li>
    </div>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(1);

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const id = useId();

  return (
    <div
      className="relative w-[57vmin] xl:w-[35vmin] lg:w-[23vmin] h-[110vmin] mt-20 sm:mt-5 lg:h-[48vmin] xl:h-[70vmin] mx-auto"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>
    </div>
  );
}