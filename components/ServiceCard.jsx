import React from "react";
import Image from "next/image";
import * as styles from "../styles/ServiceCard.module.css";
const ServiceCard = ({ service }) => {
	return (
		<div className={styles.cardContainer}>
			<div className={`${styles.imageContainer}`}>
				<div>
					<Image src={service.picture} alt="Health is Wealth" />
				</div>
			</div>
			<h2 className={`${styles.cardHeading}`}>{service.title}</h2>
			<p className={`${styles.cardDes} text-gray`}>
				{service.description}
			</p>
		</div>
	);
};

export default ServiceCard;
