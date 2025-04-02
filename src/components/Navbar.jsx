// components/Navbar.js
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link className={styles.navLink} href="/">
                        Home
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link className={styles.navLink} href="/about">
                        About
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link className={styles.navLink} href="/contact">
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
