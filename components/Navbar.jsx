import React from "react";
import Image from "next/image";
import Link from "next/link";
import images from "../constants/images";
import * as styles from "../styles/Navbar.module.css";
import { HamburgerButton } from "react-hamburger-button";
import { CloudLightning } from "react-feather";
const Navbar = () => {
	const [hidden, setHindden] = React.useState(true);
	return (
		<nav>
			<div className={` margin-on-side row ${styles.navContainer}`}>
				{/* logo */}
				<h1 className="text-5xl font-bold text-[#FF4A4A]">HealthCare</h1>

				{/* nav-links */}
				<ul
					className={`row ${styles.navLinks} ${
						hidden ? styles.hide : styles.show
					}`}
					onClick={() => {
						setHindden((current) => !current);
					}}
				>
					<div
						className={`${styles.navMenuButton} ${styles.insideContainer}`}
					>
						<HamburgerButton
							strokeWidth={3}
							open={!hidden}
							animationDuration={0.5}
							onClick={(e) => {
								e.stopPropagation();
								setHindden((current) => {
									return !current;
								});
							}}
							color={"white"}
							width={20}
							height={17}
						/>
					</div>
					<li
						className={` ${styles.activeNavLink} text-dark-gray ${styles.navLink}`}
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						<Link href="/">Home</Link>
					</li>
					<li className={` text-dark-gray ${styles.navLink}`}>
						<Link href="/">Contact Consultant</Link>
					</li>
					<li className={` text-dark-gray ${styles.navLink}`}>
						<Link href="/">Find a doctor</Link>
					</li>
					
					{/* <li className={` text-dark-gray ${styles.navLink}`}>
						<Link href="/">History</Link>
					</li> */}
					<li className={` text-dark-gray ${styles.navLink}`}>
						<Link href="/">Signin</Link>
					</li>
				</ul>
				<div className={`${styles.navMenuButton}`}>
					<HamburgerButton
						strokeWidth={3}
						open={!hidden}
						animationDuration={0.5}
						onClick={() =>
							setHindden((current) => {
								return !current;
							})
						}
						width={20}
						height={17}
					/>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
