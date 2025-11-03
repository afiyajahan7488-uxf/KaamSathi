import React from 'react';

const CategoryCards = ({ setSelectedCategory }) => {
  const categories = [
    { name: 'Plumber', icon: '🔧' },
    { name: 'Carpenter', icon: '🔨' },
    { name: 'Electrician', icon: '⚡' },
    { name: 'Painter', icon: '🎨' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-white text-center gradient-text">Choose a Service Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`glass p-6 rounded-xl cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
              index === 0 ? 'animate-stagger-1' :
              index === 1 ? 'animate-stagger-2' :
              index === 2 ? 'animate-stagger-3' :
              'animate-stagger-4'
            }`}
          >
            <div className="text-5xl mb-3 text-center text-dark-peach">{category.icon}</div>
            <h3 className="font-bold text-center text-white text-lg">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
