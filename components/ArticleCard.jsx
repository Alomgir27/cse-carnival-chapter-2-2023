import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as styles from "../styles/ArticleCard.module.css";
const ArticleCard = ({ data }) => {
	const [show, setShow] = useState(false);

	return (
		<div className={styles.cardContainer}>
			{/* Image */}
			{/* <div className={styles.imageContainer}>
				<Image src={data.picture} alt="Health is Wealth" />
			</div> */}
			{/* Info */}
			<div className={`${styles.infoContainer}`}>
				<h3 className={`${styles.articleHeading}`}>{data.title}</h3>
				<p className={`${styles.articleText} text-gray`}>
					{data.description ? data.description : show ? data.content : data.content.slice(0, 100) + "..."}
				</p>
				<button
					className={`${styles.readMoreButton} text-red-500`}
					onClick={() => setShow((current) => !current)}
				>
					{show ? "Read Less" : "Read More"}
				</button>


			</div>
		</div>
	);
};

export default ArticleCard;
