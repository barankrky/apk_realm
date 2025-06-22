"use client";

import { FC } from 'react';
import { BiSearch } from 'react-icons/bi';
import styles from './HeaderSearchBox.module.css';

interface SearchBoxProps {
  placeholder?: string;
}

const HeaderSearchBox: FC<SearchBoxProps> = ({ placeholder = "Uygulama veya oyun ara..." }) => {
  return (
    <div className={styles.searchContainer}>
      <BiSearch className={styles.searchIcon} />
      <input
        className={styles.searchInput}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
};

export default HeaderSearchBox;
