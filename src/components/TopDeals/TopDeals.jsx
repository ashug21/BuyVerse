"use client";

import Link from "next/link";
import styles from "./TopDeals.module.css";

const TopDeals = () => {
  return (
    <section className={styles.dealsSectionc}>
      <div className={styles.headerc}>
        <h2 className={styles.titlec}>Top Deals on Electronics🔥</h2>
        <Link href="/electronics" className={styles.viewAllc}>View All</Link>
      </div>

      <div className={styles.dealsRowc}>
        <Link href="/electronics/5" className={styles.cardc}>
          <span className={styles.discountTagc}>Up to 30% Off</span>
          <img src="/electronics/ipad/ipadAir5thgen/1.png" alt="iPad Air" />
          <p className={styles.productNamec}>iPad Air 5th Gen</p>
          <p className={styles.pricec}>₹54,999</p>
          <p className={styles.subTextc}>Apple Tablets</p>
        </Link>

        <Link href="/electronics/3" className={styles.cardc}>
          <span className={styles.discountTagc}>Flat 25% Off</span>
          <img src="/electronics/laptop/Macbookairm2/1.png" alt="MacBook Air" />
          <p className={styles.productNamec}>MacBook Air M2</p>
          <p className={styles.pricec}>₹89,990</p>
          <p className={styles.subTextc}>Thin & Powerful</p>
        </Link>

        <Link href="/electronics/1" className={styles.cardc}>
          <span className={styles.discountTagc}>Up to 20% Off</span>
          <img src="/electronics/phones/iphone15pro/1.png" alt="iPhone 15 Pro" />
          <p className={styles.productNamec}>iPhone 15 Pro</p>
          <p className={styles.pricec}>₹1,29,990</p>
          <p className={styles.subTextc}>Titanium Design</p>
        </Link>

        <Link href="/electronics/2" className={styles.cardc}>
          <span className={styles.discountTagc}>Special Price</span>
          <img src="/electronics/phones/samsung24ultra/1.png" alt="Samsung S24 Ultra" />
          <p className={styles.productNamec}>Galaxy S24 Ultra</p>
          <p className={styles.pricec}>₹1,19,999</p>
          <p className={styles.subTextc}>AI Smartphone</p>
        </Link>

        <Link href="/electronics/6" className={styles.cardc}>
          <span className={styles.discountTagc}>Best Seller</span>
          <img src="/electronics/appleWatch/appleseries9/1.png" alt="Apple Watch" />
          <p className={styles.productNamec}>Apple Watch Series 9</p>
          <p className={styles.pricec}>₹41,999</p>
          <p className={styles.subTextc}>Smart Wearables</p>
        </Link>

        <Link href="/electronics/12" className={styles.cardc}>
          <span className={styles.discountTagc}>Most Popular</span>
          <img src="/electronics/Playstation/ps5digitaledition/1.png" alt="Apple Watch" />
          <p className={styles.productNamec}>PlayStation 5 Digital Edition</p>
          <p className={styles.pricec}>₹39,990</p>
          <p className={styles.subTextc}>Gaming Consoles</p>
        </Link>
      </div>
    </section>
  );
};

export default TopDeals;
