import React from "react";
import Image from "next/image";
import Link from "next/link";
import images from "../constants/images";
import * as styles from "../styles/Navbar.module.css";
import { HamburgerButton } from "react-hamburger-button";
import ItemCard from "./ItemCard";

const Sidebar = ({ services, selected = -1 }) => {
  return (
    <div className='h-screen fixed left-0 top-0 p-4 pl-0 flex flex-col justify-center '>
      <nav>
        {/* <h1 className="text-3xl font-bold text-[#FF4A4A] pr-4">Health</h1>
                <h1 className="text-3xl font-bold text-[#FF4A4A]">Care</h1> */}

        <div className='mt-4 p-3 border-2 border-l-0 border-red-500 rounded-r-md'>
          <ul className='space-y-5'>
            {services.map((item) => (
              <div key={item.id} className='group relative'>
                <ItemCard
                  service={item}
                  key={item.id}
                  className='w-32 h-32 rounded-md hover:opacity-80 transition-opacity'
                  active={item.id === selected}
                />
                {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-80 group-hover:opacity-100 transition-opacity">
                                <p className="text-white text-lg">{item.title}</p>
                            </div> */}
              </div>
            ))}
          </ul>
        </div>

        {/* <div className="mt-4 p-3 border-2 border-l-0 border-red-500 rounded-r-md">
                    <ul className="space-y-5">
                        {services.map((item) => (
                            
                        ))}
                    </ul>
                </div> */}
      </nav>
    </div>
  );
};

export default Sidebar;
