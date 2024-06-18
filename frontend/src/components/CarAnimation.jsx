// src/components/CarAnimation.jsx

import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/animations/car.json'; // Ensure the path is correct

const CarAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={defaultOptions} height={150} width={350} />;
};

export default CarAnimation;