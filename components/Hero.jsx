import React from "react";
import Image from "next/image";
import * as styles from "../styles/Hero.module.css";
import images from "../constants/images";
import Button from "./Button";
import Link from "next/link";
const Hero = () => {
	return (
		<section className={`${styles.heroContainer} row margin-on-side`}>
			{/* dot dot pattern */}
			{/* left section */}
			<div className={`${styles.heroInfo}`}>
				{/* heading */}
				<div className="flex flex-col h-full mt-4">
					<h1 className="text-4xl font-bold text-gray-700">
						Health is Wealth
					</h1>
					{/* details */}
					<p className={`${styles.heroDes} text-light-gray`}>
						Connect with Trusted Medical Experts, Access Personalized
						Consultations, and Manage Your Wellness Effortlessly
					</p>

					{/* Button - custom button */}

					<Link href='/consultant'> 
						<Button fill='fill' text={"Consult Now"} />
					</Link>
				</div>
			</div>

			{/* right section */}
			<div className={`${styles.heroImageContainer}`}>
				<Image src={images.heroImage} alt='Health is Wealth' />
			</div>
		</section>
	);
};

export default Hero;
