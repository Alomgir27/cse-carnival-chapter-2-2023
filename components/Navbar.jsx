import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import images from "../constants/images";
import * as styles from "../styles/Navbar.module.css";
import { HamburgerButton } from "react-hamburger-button";
const Navbar = () => {
	const [hidden, setHindden] = React.useState(true);
	const [token, setToken] = useState(null);
	useEffect(() => {
		const token = localStorage.getItem("token");
		setToken(token);
	}, []);
	return (
		<nav className="border-b-2">
			<div className={` margin-on-side row ${styles.navContainer}`}>
				{/* logo */}
				<h3 className="py-2 flex-1 text-red-500 font-bold text-3xl flex items-center font-roboto text-center md:text-left md:justify-start">
					HealthCare
				</h3>

				{/* nav-links */}
				<ul
					className={`row ${styles.navLinks} ${hidden ? styles.hide : styles.show
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
						<Link href="/">Ask an expert</Link>
					</li>
					<li className={` text-dark-gray ${styles.navLink}`}>
						<Link href="/">Blogs & Health Tips</Link>
					</li>
					<li className={` text-dark-gray ${styles.navLink}`}>
						<Link href="/">Find a doctor</Link>
					</li>

					<li className={` text-dark-gray ${styles.navLink}`}>
						<Link href="/"> About Us</Link>
					</li>
					{token ? (
						<li className={` text-dark-gray ${styles.navLink}`}>
							<button
								onClick={() => {
									localStorage.removeItem("token");
									window.location.reload();
								}}
							>
								Logout
							</button>
						</li>
					) : (
						<li className={` text-dark-gray ${styles.navLink}`}>
							<Link href="/signIn">Login</Link>
						</li>
					)}

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
