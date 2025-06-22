"use client";

import { FC } from 'react';
import styles from './Header.module.css';
import HeaderSearchBox from './HeaderSearchBox';

interface HeaderProps {
  className?: string;
}

const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.navButtons}>
        <button className={styles.navButton}>Uygulamalar</button>
        <button className={styles.navButton}>Oyunlar</button>
      </div>
      <div className={styles.logo}>APK Realm</div>
      <HeaderSearchBox />
    </header>
  );
};

export default Header;