import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import images from "../constants/images";
import * as styles from "../styles/Navbar.module.css";
import { HamburgerButton } from "react-hamburger-button";


const Navbar = ({ active = -1 }) => {
	const [hidden, setHindden] = React.useState(true);
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	useEffect(() => {
		setToken(localStorage.getItem("token"));
	}, []);
	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("user")));
	}, []);
	return (
		<nav className='border-b-2'>
			<div className={` margin-on-side row ${styles.navContainer}`}>
				{/* logo */}
				<Link href='/'>
					<h1 className='text-5xl font-bold text-[#FF4A4A]'>HealthCare</h1>
				</Link>

				{/* nav-links */}
				<ul
					className={`row ${styles.navLinks} ${hidden ? styles.hide : styles.show
						}`}
					onClick={() => {
						setHindden((current) => !current);
					}}
				>
					<div className={`${styles.navMenuButton} ${styles.insideContainer}`}>
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
						className={` ${active === 0 ? styles.activeNavLink : " "
							} text-dark-gray ${styles.navLink}`}
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						<Link href='/'>Home</Link>
					</li>
					{(user?.role === "patient" || !user) && (
						<li
							className={`${active === 1 ? styles.activeNavLink : " "
								} text-dark-gray ${styles.navLink}`}
						>
							<Link href='/consultant'>Contact Consultant</Link>
						</li>
					)}
					{(user?.role === "patient" || !user) && (
						<li
							className={`${active === 2 ? styles.activeNavLink : " "
								} text-dark-gray ${styles.navLink}`}
						>
							<Link href='/finddoctor'>Find a doctor</Link>
						</li>
					)}

					{user?.role === "doctor" && (
						<li
							className={`${active === 3 ? styles.activeNavLink : " "
								} text-dark-gray ${styles.navLink}`}
						>
							<Link href='/doctor'>Doctor Dashboard</Link>
						</li>
					)}


					<li className={` text-dark-gray ${styles.navLink}`}>
						<Link href="/symptom">Syndrome Inquery </Link>
					</li>
					<li className={` text-dark-gray ${styles.navLink}`}>
						<Link href="/blogs">Blog & Health Tips</Link>
					</li>
					{token ? (
						<li className={` text-dark-gray ${styles.navLink}`}>
							<button
								onClick={() => {
									localStorage.removeItem("token");
									localStorage.removeItem("user");
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
