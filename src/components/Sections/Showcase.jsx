import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { portfolioApi } from '@/api/portfolioApi';
import content from '@/data/content.json';

const fallback = content.showcase;

const fallbackImages = [
  "https://media.portfolioApi.com/images/public/6a457feccbd881f14d372c60/253f85944_generated_8e96df03.png",
  "https://media.portfolioApi.com/images/public/6a457feccbd881f14d372c60/b9f8a7fdd_generated_c8070f99.png",
  "https://media.portfolioApi.com/images/public/6a457feccbd881f14d372c60/7ac6ff41b_generated_49893c54.png",
  "https://media.portfolioApi.com/images/public/6a457feccbd881f14d372c60/6df0bb128_generated_c9f57ba9.png",
  "https://media.portfolioApi.com/images/public/6a457feccbd881f14d372c60/b838cb117_generated_7e69a8cd.png",
  "https://media.portfolioApi.com/images/public/6a457feccbd881f14d372c60/f2c547999_generated_41447b1a.png",
];

// Categories that belong to the software/dev page
const SOFTWARE_CATEGORIES = ['UI/UX', 'Web App', 'Mobile App', 'Dashboard', 'Development', 'Software'];

function getItemRoute(item) {
  const cat = (item.category || '').toLowerCase();
  const isSoftware = SOFTWARE_CATEGORIES.some(s => cat.includes(s.toLowerCase()));
  return isSoftware ? '/software' : '/designs';
}

export default function Showcase() {
  const targetRef = useRef(null);
  const navigate = useNavigate();
  const [items, setItems] = useState(
    fallback.map((item, i) => ({ ...item, _image: fallbackImages[i] || fallbackImages[0] }))
  );

  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  useEffect(() => {
    portfolioApi.entities.ShowcaseItem.list('order', 100)
      .then(data => {
        if (data.length > 0) {
          setItems(data.map((item, i) => ({
            id: item.id,
            title: item.title,
            category: item.category,
            _image: item.image_url || fallbackImages[i % fallbackImages.length],
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="showcase" ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-obsidian">
        <div className="px-6 pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-ivory/40 font-medium mb-4">Portfolio</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-ivory mb-8">
            Selected<br />
            <span className="italic text-ivory/50">works.</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-6 px-6 pb-8">
          {items.map((item, i) => (
            <motion.div
              key={item.id || i}
              className="relative flex-shrink-0 w-[350px] sm:w-[450px] aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              onClick={() => navigate(getItemRoute(item))}
            >
              <img
                src={item._image}
                alt={item.title}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Always-visible subtle label at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-lime font-medium">{item.category}</p>
                  <div className="flex items-center justify-between mt-1">
                    <h3 className="text-xl font-heading font-semibold text-ivory">{item.title}</h3>
                    <span className="text-xs text-ivory/60 font-medium border border-ivory/20 rounded-full px-3 py-1">
                      View →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}