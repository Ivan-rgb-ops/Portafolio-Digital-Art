import React, { useState, useMemo } from 'react';
import { STORE_ITEMS } from '../constants';
import { ShoppingBag } from 'lucide-react';
import { getImageUrl } from '../utils/media';

const Store = () => {
  const [activeCategory, setActiveCategory] = useState('todo');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'todo') return STORE_ITEMS;
    return STORE_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const categories = [
    { id: 'todo', label: 'Todo' },
    { id: 'original', label: 'Art Original' },
    { id: 'print', label: 'Art Prints' },
  ];

  return (
    <div className="px-6 py-20 max-w-7xl mx-auto">
      <header className="mb-16 text-center">
        <h1 className="motion-reveal text-5xl md:text-6xl font-editorial mb-12 text-gray-900 leading-none">The Shop</h1>

        <div className="motion-reveal motion-delay-1 flex flex-wrap justify-center gap-4 md:gap-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-[10px] uppercase tracking-[0.4em] font-bold pb-2 border-b-2 transition-all duration-300 ${activeCategory === cat.id ? 'text-gray-900 border-gray-900' : 'text-gray-400 border-transparent hover:text-gray-600'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
        {filteredItems.map((item, index) => (
          <div key={item.id} className="motion-reveal group cursor-pointer" style={{ animationDelay: `${120 + index * 100}ms` }}>
            <div className="hover-card aspect-[4/5] bg-gray-50 overflow-hidden mb-6 relative rounded-[24px] border border-gray-100 shadow-sm transition-all duration-500">
              <img src={getImageUrl(item.imageUrl, { width: 1200, fit: 'limit' })} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md px-3 py-1 text-[8px] uppercase tracking-widest font-bold text-gray-900 rounded-full border border-gray-100 shadow-sm">
                  {item.category === 'original' ? 'Original' : 'Print'}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center px-1">
              <div className="flex-1 mr-4">
                <h3 className="text-[11px] font-medium mb-1 text-gray-800 group-hover:text-black transition-colors tracking-[0.15em] uppercase truncate">{item.name}</h3>
                <p className="text-gray-900 font-serif italic text-lg tracking-tight">${item.price.toFixed(2)} USD</p>
              </div>
              <button className="hover-lift flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-900 text-white rounded-full transition-all duration-300 hover:bg-blue-600 shadow-lg shadow-gray-200">
                <ShoppingBag size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-32 text-center text-gray-400 font-light italic">
          No hay artículos disponibles en esta categoría actualmente.
        </div>
      )}
    </div>
  );
};

export default Store;
