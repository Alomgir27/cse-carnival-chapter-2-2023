import React from "react";
import * as styles from "../styles/Footer.module.css";
import FooterLinkSet from "./FooterLinkSet";
const Footer = () => {
  return (
    <footer className={`${styles.footerContainer} mx-20 rounded-t-md`}>
      <div className={`margin-on-side flex justify-between `} >
        {/* Company Info */}
        <div className={`${styles.companyInfo}`}>
          <div className={styles.branding}>
            {/* Name */}
            <h1 className='text-3xl'>HealthCare</h1>
          </div>
          {/* description */}
          <p className={`${styles.companyDes}`}>
            Connect with Trusted Medical Experts, Access Personalized
            Consultations, and Manage Your Wellness Effortlessly
          </p>
          <p>©HealthCare 2023. All rights reserved</p>
        </div>
        {/* Link Set 1 */}
        <FooterLinkSet />
      </div>
      
    </footer>
  );
};

export default Footer;
