import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';

const NavBar = () => {
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
    
    const handleSelect = (e) => {
	    const value = e.target.value;
	    if (value) router.push(value);
    };

    return (
        <nav>
            <ul>
                <li className={styles['hide-on-mobile']}>
                    <Link href='/' className={`${styles['nav-link']} ${isActive('/')}`}>Home</Link>
                </li>

                <li className={styles['hide-on-mobile']}>
                    <Link href='/about' className={`${styles['nav-link']} ${isActive('/about')}`}>About Us</Link>
                </li>

	    	<li className={styles['hide-on-mobile']}>
	    		<div className={styles['travel-dropdown']}>
            			<span className={styles['travel-link']}>Travel</span>
            			<ul className={styles['dropdown-menu']}>
              				<li><Link href="/destinations" className={styles['travel-link']}>Destinations</Link></li>
              				<li><Link href="/guest-tours" className={styles['travel-link']}>Trips</Link></li>
            			</ul>
          		</div>
       		</li>

	    	<li className={styles['hide-on-mobile']}>
                    <Link href='/guest-products' className={`${styles['nav-link']} ${isActive('/guest-products')}`}>Shop</Link>
                </li>

		<li className={styles['hide-on-mobile']}>
                    <Link href='/contact' className={`${styles['nav-link']} ${isActive('/contact')}`}>Contact</Link>
                </li>

	    	<li className={`${styles['hide-on-mobile']} ${styles['push-right']}`}>
                    <Link href='/login' className={`${styles['nav-link']} ${isActive('/login')}`}>Sign in</Link>
                </li>

                <li className={styles['hide-on-mobile']}>
                    <Link href='/register' className={`${styles['nav-link']} ${isActive('/register')}`}>Sign up</Link>
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
        		<Link href="/" className={`${styles['nav-link']} ${isActive('/')}`}>
          		Home
        		</Link>
      		</li>

      		<li>
        		<Link href="/about" className={`${styles['nav-link']} ${isActive('/about')}`}>
          		About Us
        		</Link>
      		</li>

      		<li>
        		<Link href="/destinations" className={`${styles['nav-link']} ${isActive('/destinations')}`}>
          		Destinations
        		</Link>
      		</li>

      		<li>
        		<Link href="/guest-tours" className={`${styles['nav-link']} ${isActive('/guest-tours')}`}>
          		Trips
        		</Link>
      		</li>

      		<li>
        		<Link href="/guest-products" className={`${styles['nav-link']} ${isActive('/guest-products')}`}>
          		Shop
        		</Link>
      		</li>
	    	
		<li>
                        <Link href="/login" className={`${styles['nav-link']} ${isActive('/login')}`}>
                        Sign in
                        </Link>
                </li>

	    	<li>
                        <Link href="/register" className={`${styles['nav-link']} ${isActive('/register')}`}>
                        Sign up
                        </Link>
                </li>

		<li>
			<Link href="/contact" className={`${styles['nav-link']} ${isActive('/contact')}`}>
                        Contact
                        </Link>
                </li>
    	    </ul>
        </nav>
    );
};

export default NavBar;
