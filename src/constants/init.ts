const x = 1;
const t = (v: number) => x * v;

export const backgroundTransition = { duration: t(0.2) };
export const backgroundVariants = {
  inactive: {
    background: 'hsl(var(--background))',
    borderColor: 'hsl(var(--border))',
    color: 'hsl(var(--foreground))',
  },
  active: {
    background: 'hsl(var(--background))',
    borderColor: 'hsl(var(--primary))',
    color: 'hsl(var(--primary))',
  },
  complete: {
    background: 'hsl(var(--primary))',
    borderColor: 'hsl(var(--primary))',
  },
};

export const rippleTransition = {
  duration: t(0.6),
  delay: t(0.2),
  type: 'tween',
  ease: 'circOut',
};

export const rippleVariants = {
  inactive: {
    background: 'hsl(var(--primary))',
  },
  active: {
    background: 'hsl(var(--primary))',
    scale: 1,
    transition: {
      duration: t(0.3),
      type: 'tween',
      ease: 'circOut',
    },
  },
  complete: {
    background: 'hsl(var(--primary))',
    scale: 1.25,
  },
};

export const checkIconTransition = {
  ease: 'easeOut',
  type: 'tween',
  delay: t(0.2),
  duration: t(0.3),
};
export const checkIconVariants = {
  complete: {
    pathLength: [0, 1],
  },
};
