import { forwardRef, PropsWithChildren, HTMLAttributes } from 'react';
import AnimateHeightBase from 'react-animate-height';

// 👇 Приведение типа для JSX-совместимости
const AnimateHeight = AnimateHeightBase as unknown as React.FC<{
  children: React.ReactNode;
  height: number | string;
  duration?: number;
  easing?: string;
  animateOpacity?: boolean;
  applyInlineTransitions?: boolean;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
  style?: React.CSSProperties;
}>;

export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
  animateOpacity?: boolean;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
  duration?: number;
  easing?: string;
  startingHeight?: number | string;
  endingHeight?: number | string;
}

const Collapse = forwardRef<HTMLDivElement, PropsWithChildren<CollapseProps>>(
  (
    {
      isOpen,
      animateOpacity = true,
      onAnimationStart,
      onAnimationEnd,
      duration,
      easing = 'ease',
      startingHeight = 0,
      endingHeight = 'auto',
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <AnimateHeight
        duration={duration}
        easing={easing}
        animateOpacity={animateOpacity}
        height={isOpen ? endingHeight : startingHeight}
        applyInlineTransitions={false}
        onAnimationStart={onAnimationStart}
        onAnimationEnd={onAnimationEnd}
        style={{
          transition: 'height .3s ease,opacity .3s ease-in-out,transform .3s ease-in-out',
          backfaceVisibility: 'hidden',
        }}
      >
        <div ref={ref} {...rest}>
          {children}
        </div>
      </AnimateHeight>
    );
  },
);

export default Collapse;
