export const mobileNavbarContainerVariants = {
  close: {
    width: '5rem',
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: '16rem',
    transition: {
      type: 'spring',
      damping: 15,
      duration: 0.5,
    },
  },
};

export const mobileNavbarSvgVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
};
