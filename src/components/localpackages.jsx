'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import styles from '../styles/Localpackagesswiper.module.css';

const localPackages = [

	{
		title: 'Nairobi National Park',
		image: '/nairobi-national-park.jpg',
		description: 'Enjoy wildlife just minutes from the city.',
	},
	{
		title: 'Maasai Mara',
    		image: '/maasai-mara.jpg',
    		description: 'Witness the Great Migration and stunning savannahs.',
  	},
  	{
    		title: 'Diani Beach',
    		image: '/diani.jpg',
    		description: 'Relax on pristine white sands by the Indian Ocean.',
  	},
  	{
    		title: 'Tsavo National Park',
    		image: '/tsavo.jpg',
    		description: 'Explore the vast red-earth wilderness of Tsavo.',
  	},
  	{
    		title: 'Amboseli National Park',
    		image: '/amboseli.jpg',
    		description: 'See elephants roam with Mount Kilimanjaro in the background.',
  	},
];

const internationalPackages = [
  	{
		title: 'Dubai',
    		image: '/dubai.jpg',
    		description: 'Experience luxury, skyscrapers, and desert adventures.',
  	},
  	{
    		title: 'Zanzibar',
    		image: '/zanzibar.jpg',
    		description: 'Discover turquoise waters, spice farms, and vibrant culture.',
  	},
  	{
    		title: 'Singapore',
    		image: '/singapore.jpg',
    		description: 'Explore a modern city with lush gardens and great cuisine.',
  	},
  	{
    		title: 'Bali',
    		image: '/bali.jpeg',
    		description: 'Relax in tropical paradise with beaches and rice terraces.',
  	},
  	{
    		title: 'Rwanda',
    		image: '/rwanda.jpg',
    		description: 'Go gorilla trekking and explore lush green hills.',
  	},
  	{
    		title: 'Uganda',
    		image: '/uganda.jpg',
    		description: 'Discover the source of the Nile and abundant wildlife.',
  	},
  	{
    		title: 'Tanzania',
    		image: '/tanzania.jpg',
    		description: 'Climb Kilimanjaro and visit the Serengeti plains.',
  	},
];

const specialPackages = [
  	{
    		title: 'Honeymoon Getaways',
    		image: '/honeymoon.jpg',
    		description: 'Romantic escapes to start your forever in unforgettable locations.',
  	},
  	{
    		title: 'Corporate Team Building',
    		image: '/team-building.jpg',
    		description: 'Boost team morale with fun and engaging group experiences.',
  	},
  	{
    		title: 'Adventure Retreats',
    		image: '/adventure-retreat.jpg',
    		description: 'Perfect for thrill seekers — hiking, zip-lining, rafting and more.',
  	},
  	{
    		title: 'Wellness Retreats',
    		image: '/wellness.jpeg',
    		description: 'Relax, recharge, and find balance with yoga and spa experiences.',
  	},
  	{
    		title: 'Cultural Tours',
    		image: '/cultural-tour.jpg',
    		description: 'Immerse yourself in rich traditions, history, and local experiences.',
  	},
];



const PackagesSwiper = () => {
	return (
		<section className={styles['destinations-section']}>

    			<section className ={styles['tour-package']}>
      				<h2 className={styles.heading}>Local Packages</h2>
				<p className={styles.packageDescription}>
      					Discover breathtaking destinations right here in Kenya — from iconic wildlife parks to tranquil beach escapes. These packages are tailored for unforgettable local adventures.
    				</p>
      				<Swiper
					modules={[Navigation, Pagination]}
        				spaceBetween={20}
        				slidesPerView={1}
        				navigation
        				pagination={{ clickable: true }}
        				breakpoints={{
          				640: { slidesPerView: 1 },
          				768: { slidesPerView: 2 },
          				1024: { slidesPerView: 3 },
        				}}
					className={styles.swiperContainer}
				>
        					{localPackages.map((pkg, index) => (
							<SwiperSlide key={index}>
								<div className={styles.cardWrapper}>
            								<div className={styles.card}>
              									<Image
                									src={pkg.image}
                									alt={pkg.title}
                									width={400}
                									height={200}
                									className={styles.image}
              									/>
              									<div className={styles.content}>
              										<h3 className={styles.title}>{pkg.title}</h3>
            	    									<p>{pkg.description}</p>
											<a
  												href={`https://wa.me/254759080100?text=${encodeURIComponent(
    													`Hello, I'm interested in the "${pkg.title}" package. Could you share more details about it?`
  												)}`}
  												target="_blank"
 	 											rel="noopener noreferrer"
  												className={styles.inquireButton}
											>
  												Inquire for Details
											</a>
										</div>
              								</div>
            							</div>
          						</SwiperSlide>
						))}
      				</Swiper>
    			</section>

			<section className ={styles['tour-package']}>
                                <h2 className={styles.heading}>International Packages</h2>
				<p className={styles.packageDescription}>
  				Explore the world with our curated international travel experiences — from exotic beaches to vibrant cityscapes. Perfect for those seeking adventure beyond borders.
				</p>

                                <Swiper
                                        modules={[Navigation, Pagination]}
                                        spaceBetween={20}
                                        slidesPerView={1}
                                        navigation
                                        pagination={{ clickable: true }}
                                        breakpoints={{
                                        640: { slidesPerView: 1 },
                                        768: { slidesPerView: 2 },
                                        1024: { slidesPerView: 3 },
                                        }}
                                        className={styles.swiperContainer}
                                >
                                                {internationalPackages.map((pkg, index) => (
                                                        <SwiperSlide key={index}>
                                                                <div className={styles.cardWrapper}>
                                                                        <div className={styles.card}>
                                                                                <Image
                                                                                        src={pkg.image}
                                                                                        alt={pkg.title}
                                                                                        width={400}
                                                                                        height={200}
                                                                                        className={styles.image}
                                                                                />
                                                                                <div className={styles.content}>
                                                                                        <h3 className={styles.title}>{pkg.title}</h3>
                                                                                        <p>{pkg.description}</p>
                                                                                        <a
                                                                                                href={`https://wa.me/254759080100?text=${encodeURIComponent(
                                                                                                        `Hello, I'm interested in the "${pkg.title}" package. Could you share more details about it?`
                                                                                                )}`}
                                                                                                target="_blank"
                                                                                                rel="noopener noreferrer"
                                                                                                className={styles.inquireButton}
                                                                                        >
                                                                                                Inquire for Details 
                                                                                        </a>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </SwiperSlide>
                                                ))}
                                </Swiper>
                        </section>

			<section className ={styles['tour-package']}>
                                <h2 className={styles.heading}>Special Packages</h2>
				<p className={styles.packageDescription}>
  				Whether you are planning a romantic honeymoon, an exciting team-building retreat, or a unique celebration, our special packages are designed to make every moment memorable.
				</p>

                                <Swiper
                                        modules={[Navigation, Pagination]}
                                        spaceBetween={20}
                                        slidesPerView={1}
                                        navigation
                                        pagination={{ clickable: true }}
                                        breakpoints={{
                                        640: { slidesPerView: 1 },
                                        768: { slidesPerView: 2 },
                                        1024: { slidesPerView: 3 },
                                        }}
                                        className={styles.swiperContainer}
                                >
                                                {specialPackages.map((pkg, index) => (
                                                        <SwiperSlide key={index}>
                                                                <div className={styles.cardWrapper}>
                                                                        <div className={styles.card}>
                                                                                <Image
                                                                                        src={pkg.image}
                                                                                        alt={pkg.title}
                                                                                        width={400}
                                                                                        height={200}
                                                                                        className={styles.image}
                                                                                />
                                                                                <div className={styles.content}>
                                                                                        <h3 className={styles.title}>{pkg.title}</h3>
                                                                                        <p>{pkg.description}</p>
                                                                                        <a
                                                                                                href={`https://wa.me/254759080100?text=${encodeURIComponent(
                                                                                                        `Hello, I'm interested in the "${pkg.title}" package. Could you share more details about it?`
                                                                                                )}`}
                                                                                                target="_blank"
                                                                                                rel="noopener noreferrer"
                                                                                                className={styles.inquireButton}
                                                                                        >
                                                                                                Inquire for Details 
                                                                                        </a>
                                                                                </div>
                                                                        </div>
                                                                </div>
                                                        </SwiperSlide>
                                                ))}
                                </Swiper>
                        </section>
		</section>
	);
};


export default PackagesSwiper;
