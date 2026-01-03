"use client";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footere}>
      <div className={styles.topAreace}>
        <div className={styles.columne}>
          <h4 className={styles.headinge}>About</h4>
          <a className={styles.linke}>Contact Us</a>
          <a className={styles.linke}>About Us</a>
          <a className={styles.linke}>Careers</a>
          <a className={styles.linke}>Press</a>
        </div>

        <div className={styles.columne}>
          <h4 className={styles.headinge}>Help</h4>
          <a className={styles.linke}>Payments</a>
          <a className={styles.linke}>Shipping</a>
          <a className={styles.linke}>Cancellation & Returns</a>
          <a className={styles.linke}>FAQ</a>
        </div>

        <div className={styles.columne}>
          <h4 className={styles.headinge}>Policy</h4>
          <a className={styles.linke}>Return Policy</a>
          <a className={styles.linke}>Terms of Use</a>
          <a className={styles.linke}>Security</a>
          <a className={styles.linke}>Privacy</a>
        </div>

        <div className={styles.columne}>
          <h4 className={styles.headinge}>Social</h4>
          <a className={styles.linke}>Facebook</a>
          <a className={styles.linke}>Twitter</a>
          <a className={styles.linke}>Instagram</a>
          <a className={styles.linke}>YouTube</a>
        </div>

        <div className={styles.columne}>
          <h4 className={styles.headinge}>Business</h4>
          <a className={styles.linke}>Become a Seller</a>
          <a className={styles.linke}>Advertise</a>
          <a className={styles.linke}>Affiliate Program</a>
          <a className={styles.linke}>Wholesale</a>
        </div>
      </div>

      <div className={styles.bottomAreace}>
        <div className={styles.paymente}>
          <span>Visa</span>
          <span>Mastercard</span>
          <span>RuPay</span>
          <span>UPI</span>
          <span>NetBanking</span>
        </div>

        <div className={styles.copyrighte}>
          © 2025 BuyVerse. All rights reserved.
        </div>

        <div className={styles.countrye}>
          India | United States | UAE | Germany
        </div>
      </div>
    </footer>
  );
};

export default Footer;
