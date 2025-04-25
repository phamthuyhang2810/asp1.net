import React from 'react';
import '../css/Banner.css'; // Import CSS file for styling

const Banner = () => {
  const images = [
    'https://tse2.mm.bing.net/th?id=OIP.Gs0gkty33J9YB7dPPeLLPQHaDF&pid=Api&P=0&h=180',
    'https://tse3.mm.bing.net/th?id=OIP.mET-VFjkk5uJbCYbiIRCHgHaD4&pid=Api&P=0&h=180',
    'https://tse4.mm.bing.net/th?id=OIP.ADX234jBmZeAGKj7Vp5kggHaCU&pid=Api&P=0&h=180',
  ];

  return (
    <div className="banner-container">
      <div className="banner-carousel">
        {images.map((image, index) => (
          <div key={index} className="banner-slide">
            <img src={image} alt={`Banner ${index + 1}`} className="banner-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;