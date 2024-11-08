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
      src="https://static.tildacdn.com/tild3339-3738-4631-a532-326363333733/Frame_86.png"
      alt="fish"
    />
  );
};

export default Fish;
