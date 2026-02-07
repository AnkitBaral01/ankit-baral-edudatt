"use client"

import React from 'react';

const Button = ({
  label,
  onClick,
  disabled = false,
  bgColor = 'bg-yellow',
  textColor = 'text-white',
  disabledBgColor = 'bg-gray-300',
  disabledTextColor = 'text-gray-500',
  className = '',
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 
        rounded-lg 
        font-semibold 
        transition-all 
        duration-200 
        ease-in-out 
        transform 
        hover:scale-[1.02]
        active:scale-[0.98]
        ${disabled ? 
          `${disabledBgColor} ${disabledTextColor} cursor-not-allowed` : 
          `${bgColor} ${textColor} hover:${bgColor}/90`}
        ${className}
      `}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;