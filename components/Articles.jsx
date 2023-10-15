import React from "react";
import * as styles from "../styles/Article.module.css";
import ArticleCard from "./ArticleCard";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
const Articles = ({ articles, blogs }) => {
	return (
		<section className={"margin-on-side"}>
			<SectionHeading headingTitle={"Check out our latest Health Blogs and Tips"} />
			<div className={`row aside`} style={{ marginTop: "3rem" }}>
				{articles.map((item) => {
					return <ArticleCard key={item.id} data={item} />;
				})}
				{blogs.map((item) => {
					return <ArticleCard key={item._id} data={item} />;

				})}
			</div>
			<div className="row center">
				<Button text={"View All"} />
			</div>
		</section>
	);
};

export default Articles;
