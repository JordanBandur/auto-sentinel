import React from 'react';
import Lottie from 'react-lottie';
import animationData from './car-animation.json'; // Adjust the path if needed

const CarAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="car-animation">
      <Lottie options={defaultOptions} height={180} width={400} />
    </div>
  );
};

export default CarAnimation;