// components/HeroHome.styles.ts

export const heroHomeStyles = {
  container: {
    height: '45%',
  },
  logoContainer: {
    display: 'flex',
    position: 'relative',
    left: '0',
    marginBottom: '5%',
    marginInline: '2px',
  },
  textContainer: {
    marginBottom: '32%',
    position: 'relative',
    left: 'clamp(.5rem,4.26%,1%)',
  },
  headingText: {
    fontSize: '2rem',
    fontWeight: '500',
  },
  gradientText: {
    backgroundImage: 'linear-gradient(147.7deg, #6942E2 19.37%, #28E7C5 77.65%)',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextStrokeWidth: 'thin',
  },
};
