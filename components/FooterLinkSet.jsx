import React from "react";
import Link from "next/link";
import * as styles from "../styles/Footer.module.css";
const FooterLinkSet = ({ linkSet }) => {
  return (
    <div className={`${styles.linkGroup}`}>
      <h4 className='text-xl'>Stay Connected</h4>
      <br />
      <div>
        <ul className={`${styles.footerLinks}`}>
          {["Facebook", "Twitter", "Instagram", "LinkedIn"].map(
            (item, index) => {
              return (
                <li key={index}>
                  <Link href='/'>{item}</Link>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default FooterLinkSet;
