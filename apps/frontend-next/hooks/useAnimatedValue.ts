import { useMotionValue, animate } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AnimationOptions {
  type?: 'spring' | 'tween';
  delay?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  noRound?: boolean;
}

const useAnimatedValue = (targetValue: number, options: AnimationOptions = {}): number => {
  const motionValue = useMotionValue(0);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const animation = animate(motionValue, targetValue, {
      type: options.type || 'spring',
      delay: options.delay || 0,
      stiffness: options.stiffness || 200,
      damping: options.damping || 120,
      mass: options.mass || 2.5,
      onUpdate: (latest) => {
        if (options.noRound) {
          setCurrentValue(latest);
        }
        setCurrentValue(Math.floor(latest));
      },
    });

    return () => animation.stop();
  }, [targetValue, motionValue, options]);

  return currentValue;
};

export default useAnimatedValue;
