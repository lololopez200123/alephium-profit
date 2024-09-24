'use client';

import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import NotFoundIllustration from '@/components/misc/NotFoundIllustration';

const NotFoundPage = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <NotFoundIllustration />

      <Typography variant="h4" component="h1" gutterBottom>
        ¡UPS! Page in the found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, color: 'white' }}>
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Link href="/" passHref style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" size="large">
          Back to Home
        </Button>
      </Link>
    </Container>
  );
};

export default NotFoundPage;
