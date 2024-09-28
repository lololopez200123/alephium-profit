'use client';
import Image from 'next/image';
import styles from './Loading.module.css';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { loadingScreenAtom } from '@/store/loadingScreenAtom';
import { Box } from '@mui/material';

const Loading = () => {
  const [show, setShow] = useAtom(loadingScreenAtom);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 7000);

    return () => {
      clearTimeout(timer);
    };
  }, [setShow]);

  if (!show) {
    return null;
  }

  return (
    <Box className={styles.loadingContainer}>
      <Box className={styles.innerLoadingContainer}>
        <Image unoptimized src="/init-loading.gif" width={720} height={720} alt="Cargando..." className={styles.loadingImage} />
      </Box>
    </Box>
  );
};

export default Loading;
