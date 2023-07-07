import Link from 'next/link';
import styles from './styles/MainLogo.module.css';

const MainLogo = ({ link }: { link: string }) => {
  return (
    <Link href={link}>
      <img src="/images/fanplus_logo_hor.png" alt="Fanplus 로고" className={styles.img}></img>
    </Link>
  );
};

export default MainLogo;
