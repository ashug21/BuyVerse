"use client";

import Link from "next/link";
import styles from "./Popular.module.css";

const PopularSection = () => {
  return (
    <section className={styles.popularSectionp}>
      <div className={styles.containerp}>

        <Link href="/fashion/24" className={styles.cardp}>
          <h2 className={styles.headingp}>
            Up to 40% off | Athletic & lifestyle footwear
          </h2>

          <div className={styles.imageWrap}>
            <img
              src="/banner/shoes1.png"
              alt="Nike Air Force 1 Flyknit sneakers main view"
            />
          </div>

          <p className={styles.titlep}>
            Nike Air Force 1 Flyknit Sneakers | Lightweight breathable design | Cushioned sole for all-day comfort
          </p>

          <div className={styles.priceRowp}>
            <span className={styles.pricep}>₹8,995</span>
            <span className={styles.mrpp}>M.R.P: ₹13,999.00</span>
          </div>

          <div className={styles.thumbsp}>
            <img
              src="/fashion/nike/AirForce1Flyknit/2.png"
              alt="Nike Air Force 1 Flyknit side view"
            />
            <img
              src="/fashion/nike/AirForce1Flyknit/3.png"
              alt="Nike Air Force 1 Flyknit angled view"
            />
            <img
              src="/fashion/nike/AirForce1Flyknit/4.png"
              alt="Nike Air Force 1 Flyknit top view"
            />
            <img
              src="/fashion/nike/AirForce1Flyknit/5.png"
              alt="Nike Air Force 1 Flyknit sole detail"
            />
          </div>
        </Link>

        <Link href="/fashion/30" className={styles.cardp}>
          <h2 className={styles.headingp}>
            Up to 20% off | Top deals on Top brands
          </h2>

          <div className={styles.imageWrap}>
            <img
              src="/fashion/DanielWellington/womensClassicWatch/1.png"
              alt="Daniel Wellington women's classic wrist watch front view"
            />
          </div>

          <p className={styles.titlep}>
            Daniel Wellington Women’s Classic Watch | Minimal dial | Premium leather strap | Timeless design
          </p>

          <div className={styles.priceRowp}>
            <span className={styles.pricep}>₹11,999</span>
            <span className={styles.mrpp}>M.R.P: ₹13,999.00</span>
          </div>

          <div className={styles.thumbsp}>
            <img
              src="/fashion/DanielWellington/womensClassicWatch/2.png"
              alt="Daniel Wellington watch side angle"
            />
            <img
              src="/fashion/DanielWellington/womensClassicWatch/3.png"
              alt="Daniel Wellington watch strap close-up"
            />
          </div>
        </Link>

        <Link href="/skincare/31" className={styles.cardp}>
          <h2 className={styles.headingp}>
            Deals on popular reorders
          </h2>

          <div className={styles.imageWrap}>
            <img
              src="/skincare/Cetaphil/GentleSkinCleanser/1.png"
              alt="Cetaphil Gentle Skin Cleanser bottle front"
            />
          </div>

          <div className={styles.badgep}>
            <span>41% off</span>
            <span>Limited time deal</span>
          </div>

          <div className={styles.thumbsp}>
            <img
              src="/skincare/Cetaphil/GentleSkinCleanser/2.png"
              alt="Cetaphil Gentle Skin Cleanser side view"
            />
            <img
              src="/skincare/Cetaphil/GentleSkinCleanser/3.png"
              alt="Cetaphil Gentle Skin Cleanser usage texture"
            />
            <img
              src="/skincare/Cetaphil/GentleSkinCleanser/4.png"
              alt="Cetaphil Gentle Skin Cleanser packaging back"
            />
          </div>

          <span className={styles.linkp}>See more deals</span>
        </Link>

        <Link href="/electronics/12" className={styles.cardp}>
          <h2 className={styles.headingp}>
            Up to 30% off | Gaming
          </h2>

          <div className={styles.imageWrap}>
            <img
              src="/electronics/Playstation/ps5digitaledition/1.png"
              alt="Sony PlayStation 5 Digital Edition console"
            />
          </div>

        <br/>
          <p className={styles.titlep}>
    Sony PlayStation 5 Digital Edition | Ultra-fast SSD | Ray tracing | Next-gen gaming performance
  </p>

          <span className={styles.linkp}>Visit the store</span>
        </Link>

      </div>
    </section>
  );
};

export default PopularSection;
