import React from "react";
import Image from "next/image";
import * as styles from "../styles/ServiceCard.module.css";
import Link from "next/link";

const ServiceCard = ({ service }) => {
	return (

		<div className={styles.cardContainer}>
			<Link href={`${service?.url}`}>
				<div className={`${styles.imageContainer}`}>
					<div>
						<Image src={service.picture} alt="Health is Wealth" />
					</div>
				</div>
				<h2 className={`${styles.cardHeading}`}>{service.title}</h2>
				<p className={`${styles.cardDes} text-gray`}>
					{service.description}
				</p>
			</Link>
		</div>
	);
};

export default ServiceCard;
