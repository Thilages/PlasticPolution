import React from 'react';

const Fish = ({ top, left, size }) => {
  return (
    <img
      style={{
        position: 'absolute',
        top: top,
        left: left,
        width: size, // Set size using the width prop
        animation: 'swim 2s ease-in-out infinite', // Add the swimming animation
      }}
      src="https://static.tildacdn.com/tild6235-3033-4464-b333-643239373237/Frame_90.png"
      alt="fish"
    />
  );
};

export default Fish;
