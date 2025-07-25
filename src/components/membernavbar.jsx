import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';

const MemberNavBar = () => {
    const [isHidden, setSidebar] = useState(true);
    const router = useRouter();

    const ShowSidebar = () => {
        setSidebar(false);
    };

    const HideSidebar = () => {
        setSidebar(true);
    };

    // Helper function to determine if the link is active
    const isActive = (path) => {
        return router.pathname === path ? styles['active-link'] : '';
    };

    return (
        <nav>
            <ul>

                <li className={styles['hide-on-mobile']}>
                    <Link href='/member_dashboard' className={`${styles['nav-link']} ${isActive('/member_dashboard')}`}>Home</Link>
                </li>

                <li className={styles['hide-on-mobile']}>
                    <Link href='/member-about' className={`${styles['nav-link']} ${isActive('/member-about')}`}>About Us</Link>
                </li>

                <li className={styles['hide-on-mobile']}>
                    <Link href='/member-destinations' className={`${styles['nav-link']} ${isActive('/member-destinations')}`}>Destinations</Link>
                </li>

                <li className={styles['hide-on-mobile']}>
                    <Link href='/member-tours' className={`${styles['nav-link']} ${isActive('/member-tours')}`}>Trips</Link>
                </li>

                <li className={styles['hide-on-mobile']}>
                    <Link href='/member-products' className={`${styles['nav-link']} ${isActive('/member-products')}`}>Shop</Link>
                </li>

                <li className={styles['hide-on-mobile']}>
                    <Link href='/member-contact' className={`${styles['nav-link']} ${isActive('/member-contact')}`}>Contact</Link>
                </li>

                <li className={`${styles['hide-on-mobile']} ${styles['push-right']}`}>
                    <Link href='/member-bookings' className={`${styles['nav-link']} ${isActive('/member-bookings')}`}>Bookings</Link>
                </li>

                <li className={styles['hide-on-mobile']}>
                    <Link href='/member-profile' className={`${styles['nav-link']} ${isActive('/member-profile')}`}>Profile</Link>
                </li>

                <li className={styles["menu-button"]}>
                    <Link href='#' className={styles['nav-link']} onClick={ShowSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                        </svg>
                    </Link>
                </li>
            </ul>

            <ul className={isHidden ? styles['hide-sidebar'] : styles.sidebar}>
                <li>
                        <Link href="#" className={styles['nav-link']} onClick={HideSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                        </svg>
                        </Link>
                </li>

                <li>
                        <Link href="/member_dashboard" className={`${styles['nav-link']} ${isActive('/member_dashboard')}`}>
                        Home
                        </Link>
                </li>

                <li>
                        <Link href="/member-about" className={`${styles['nav-link']} ${isActive('/member-about')}`}>
                        About
                        </Link>
                </li>

                <li>
                        <Link href="/member-destinations" className={`${styles['nav-link']} ${isActive('/memberdestinations')}`}>
                        Destinations
                        </Link>
                </li>

                <li>
                        <Link href="/member-tours" className={`${styles['nav-link']} ${isActive('/member-tours')}`}>
                        Trips
                        </Link>
                </li>

                <li>
                        <Link href="/member-products" className={`${styles['nav-link']} ${isActive('/member-products')}`}>
                        Shop
                        </Link>
                </li>
            
                <li>
                        <Link href="/member-contact" className={`${styles['nav-link']} ${isActive('/member-contact')}`}>
                        Contact
                        </Link>
                </li>

                <li>
                        <Link href="/member-bookings" className={`${styles['nav-link']} ${isActive('/member-bookings')}`}>
                        Bookings
                        </Link>
                </li>

                <li>
                        <Link href="/member-profile" className={`${styles['nav-link']} ${isActive('/member-profile')}`}>
                        Profile
                        </Link>
                </li>
            </ul>
        </nav>
    );
};

export default MemberNavBar;
