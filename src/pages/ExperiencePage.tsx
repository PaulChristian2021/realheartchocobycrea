import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

type Slide = {
  id: number;
  title: string;
  caption: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Introduction",
    caption:
      "So you decided to give her the RealHeartChoco experience.\nHere’s how it unfolds.",
  },
  {
    id: 2,
    title: "The Arrival",
    caption:
      "It arrives carefully packed — layered protection, insulated wrapping, and an elegant outer box.\nBecause moments like this deserve care, even before they’re opened.",
  },
  {
    id: 3,
    title: "Inside the Box",
    caption:
      "Inside:\nthe chocolate, thoughtful envelopes, elegant fillers,\nand small details meant to be discovered — not rushed.",
  },
  {
    id: 4,
    title: "The Brown Envelope",
    caption:
      "You notice a brown envelope set aside for you.\nKeep it.\n\nIt explains why this gift exists — and why this moment matters.\nA quiet reminder, before anything else begins.",
  },
  {
    id: 5,
    title: "The First Black Envelope (Top)",
    caption:
      "The first black envelope carries a card with your name and the Valentine year.\nShe’ll find a QR code that leads to a romantic quote — changing daily.\n\nA small way to make this feel ongoing, not one-time.",
  },
  {
    id: 6,
    title: "The Second Black Envelope (Middle)",
    caption:
      "The next card reflects the moment itself.\n\n“Someone’s thinking of me.”\n\nOn the back:\n“I’m thinking of someone.”\n\nYou can capture these symbols.\nMaybe it stays private.\nMaybe it becomes something you share.",
  },
  {
    id: 7,
    title: "The Third Black Envelope (Bottom)",
    caption:
      "The last envelope is the most personal.\nTwo blank cards — waiting for your words.\n\nBecause some things should only come from you.",
  },
  {
    id: 8,
    title: "The Chocolate",
    caption:
      "Beneath it all is the heart-shaped chocolate —\ncrafted to be enjoyed easily,\nbut remembered longer than it lasts.",
  },
  {
    id: 9,
    title: "The Hidden Message",
    caption:
      "Once the chocolate is gone, there’s one final detail.\nA hidden message at the bottom of the box:\n\n“Don’t forget to drink water.”\n\nSmall. Thoughtful. Unexpected.",
  },
  {
    id: 10,
    title: "Closing",
    caption:
      "More than a gift.\nMore than chocolate.\n\nA shared experience —\nfor her, for you, for the heart.",
  },
];

export default function ExperiencePage() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  // Preload all images on mount
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = `/${slide.id}.jpg`;
    });
  }, []);

  // Preload next & previous image on change
  useEffect(() => {
    const nextIndex = (index + 1) % slides.length;
    const prevIndex = (index - 1 + slides.length) % slides.length;

    [nextIndex, prevIndex].forEach((i) => {
      const img = new Image();
      img.src = `/${slides[i].id}.jpg`;
    });
  }, [index]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const handlePointerDown = (x: number) => {
    startX.current = x;
    setPaused(true);
  };

  const handlePointerUp = (x: number) => {
    if (startX.current === null) return;
    const diff = x - startX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? prev() : next();
    }
    startX.current = null;
    setPaused(false);
  };

  return (
    <div
      className="experience-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onMouseDown={(e) => handlePointerDown(e.clientX)}
      onMouseUp={(e) => handlePointerUp(e.clientX)}
      onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
      onTouchEnd={(e) => handlePointerUp(e.changedTouches[0].clientX)}
      onClick={(e) => {
        const bounds = (
          e.currentTarget as HTMLDivElement
        ).getBoundingClientRect();
        const x = e.clientX - bounds.left;
        if (x > bounds.width * 0.3 && x < bounds.width * 0.7) {
          next();
        }
      }}
    >
      <div className="slide">
        <img
          src={`/${slides[index].id}.jpg`}
          alt={slides[index].title}
          className="slide-image"
          draggable={false}
          loading="eager"
          decoding="async"
        />

        <div className="caption">
          <h3>{slides[index].title}</h3>
          <p>{slides[index].caption}</p>
        </div>
      </div>

      <button
        className="arrow left"
        onClick={() => {
          setPaused(true);
          prev();
        }}
      >
        ‹
      </button>
      <button
        className="arrow right"
        onClick={() => {
          setPaused(true);
          next();
        }}
      >
        ›
      </button>

      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => {
              setPaused(true);
              setIndex(i);
            }}
          />
        ))}
      </div>

      <div className="cta">
        <Link to="/tiers">Choose a Gift Tier</Link>
      </div>

      <style>{`
        .experience-root {
          position: relative;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          user-select: none;
        }

        .slide {
          overflow: hidden;
          border-radius: 16px;
          background: #0f0f0f;
          color: #fff;
        }

        .slide-image {
          width: 100%;
          height: 360px;
          object-fit: cover;
          display: block;
        }

        .caption {
          padding: 24px;
          text-align: center;
        }

        .caption h3 {
          margin-bottom: 12px;
          font-weight: 500;
          letter-spacing: 0.4px;
        }

        .caption p {
          white-space: pre-line;
          opacity: 0.85;
          line-height: 1.6;
        }

        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.6);
          font-size: 48px;
          cursor: pointer;
          padding: 12px;
        }

        .arrow:hover {
          color: #fff;
        }

        .left { left: 8px; }
        .right { right: 8px; }

        .dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          cursor: pointer;
        }

        .dot.active {
          background: #fff;
        }

        .cta {
          margin: 28px 0 12px;
          text-align: center;
        }

        .cta a {
          display: inline-block;
          padding: 14px 28px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.4);
          color: #fff;
          text-decoration: none;
          letter-spacing: 0.6px;
          transition: all 0.25s ease;
        }

        .cta a:hover {
          background: #fff;
          color: #0f0f0f;
        }

        @media (max-width: 640px) {
          .slide-image { height: 260px; }
          .arrow { font-size: 36px; }
        }
      `}</style>
    </div>
  );
}
