'use client';

import React, { useEffect, useState } from 'react';

const LottiePlayer = ({
  animationData,
  loop = true,
  autoplay = true,
  speed = 1,
  style = {},
  className = '',
  onComplete = null,
  onLoopComplete = null,
}) => {
  const [Lottie, setLottie] = useState(null);

  useEffect(() => {
    let mounted = true;
    import('lottie-react')
      .then((mod) => {
        if (mounted) setLottie(() => mod.default || mod);
      })
      .catch((err) => {
        console.error('Failed to load lottie-react:', err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (!Lottie) return null;

  return (
    <div className={`lottie-container ${className}`} style={style}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        speed={speed}
        onComplete={onComplete}
        onLoopComplete={onLoopComplete}
      />
    </div>
  );
};

export default LottiePlayer;
