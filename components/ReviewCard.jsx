import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as styles from "../styles/ArticleCard.module.css";

const ReviewCard = ({ data }) => {
  return (
    <div>
      <div
        className='w-full p-2 rounded-lg my-2'
        style={{ backgroundColor: " rgba(255, 255, 255,0.8)" }}
      >
        <h3 className='font-bold text-l'>{data.name}</h3>
        <span className='mr-5 text-sm'>Rating : {data.rating}</span>
        <span className='text-sm'>{data.createdAt}</span>

        <p className='text-sm'>{data.review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
