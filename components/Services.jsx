import React from "react";
import SectionHeading from "./SectionHeading";
import * as styles from "../styles/Services.module.css";
import ServiceCard from "./ServiceCard";
import images from "../constants/images";
import Button from "./Button";
const Services = ({ services }) => {
	return (
		<section className={styles.container}>
			<div className="margin-on-side">
				{/* Section Heading */}
				<SectionHeading className="text-3xl" headingTitle="Our Services" />
				{/* Section Description */}
				<p className={`${styles.servicesDes} text-gray`}>
					Find and connect with top doctors, schedule consultations, and 
					access emergency care when you need it most. Store and manage 
					your medical history, inquire about syndromes, and even hire a personal 
					consultant for personalized health guidance. Your health, simplified.
				</p>
				{/* Section List - we will map through array and render a card for each item */}
				<div className={`row ${styles.serviceList}`}>
					{services.map((item) => {
						return <ServiceCard service={item} key={item.id} />;
					})}
				</div>
				{/* <div className="row center">
					<Button text="Learn More" />
				</div> */}
			</div>
		</section>
	);
};

export default Services;
