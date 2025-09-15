import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  "/img/banner-1.jpeg",
  "/img/banner-2.jpeg",
  "/img/banner-3.jpeg",
  "/img/banner-4.jpeg",
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const total = banners.length;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // ⬇️ Tambahkan efek otomatis
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // ganti 4000 ms = 4 detik sesuai keinginan

    return () => clearInterval(interval); // bersihkan saat unmount
  }, []);

  return (
    <section className="relative w-[80rem] h-[25rem] mx-auto overflow-hidden rounded-2xl">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {banners.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`banner ${i + 1}`}
            className="w-[80rem] h-[25rem] object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Panah manual */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot indikator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white" : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
