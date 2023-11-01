import React from "react";
import Image from "next/image";
import * as styles from "../styles/ServiceCard.module.css";
import Link from "next/link";
const ItemCard = ({ service, active }) => {
  return (
    <li
      className={`flex items-center space-x-2 border-red-600 pb-2 ${
        active ? "border-b-2" : ""
      }`}
    >
      <a href={service?.url}>
        <Image src={service.picture} alt='Item 1' className='w-8 h-8' />{" "}
      </a>
      {/* <Link href="/page1">{service.title}</Link> */}
    </li>
  );
};

export default ItemCard;
