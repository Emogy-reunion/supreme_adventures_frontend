'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import styles from './Localpackagesswiper.module.css';

const packages = [
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

const LocalPackagesSwiper = () = {
	return (
    			<section style={{ padding: '2rem' }}>
      				<h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Local Packages</h2>
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
        				}}>
        					{packages.map((pkg, index) => (
							<SwiperSlide key={index}>
            							<div className={styles.card}>
              								<Image
                								src={pkg.image}
                								alt={pkg.title}
                								width={400}
                								height={250}
                								className={styles.image}
              								/>
              								<div className={styles.content}>
              									<h3>{pkg.title}</h3>
            	    								<p>{pkg.description}</p>
              								</div>
            							</div>
          						</SwiperSlide>
						))}
      				</Swiper>
    			</section>
	);
}


export default function LocalPackagesSwiper;
