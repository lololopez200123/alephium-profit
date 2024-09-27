'use client';
import Image from 'next/image';
import styles from './Loading.module.css';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { loadingScreenAtom } from '@/store/loadingScreenAtom';

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
    <div className={styles.loadingContainer}>
      <Image src="/init-loading.gif" width={720} height={720} alt="Cargando..." className={styles.loadingImage} />
    </div>
  );
};

export default Loading;
