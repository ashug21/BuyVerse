"use client";

import Link from "next/link";
import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <section className={styles.bannerb}>
      <div className={styles.sliderb}>

        <div className={styles.slideb}>
          <img src="/banner/electronics1.png" alt="iPad Air" />
          <div className={styles.contentb}>
            <h2 className={styles.titleb}>iPad Air 5th Gen</h2>
            <p className={styles.descb}>Powerful. Colorful. Versatile.</p>
            <div className={styles.actionsb}>
              <Link href="/electronics/5" className={styles.primaryBtnb}>Buy Now</Link>
              <Link href="/electronics/5" className={styles.secondaryBtnb}>View Details</Link>
            </div>
          </div>
        </div>

        <div className={styles.slideb}>
          <img src="/banner/electronics2.png" alt="MacBook Air M2" />
          <div className={styles.contentb}>
            <h2 className={styles.titleb}>MacBook Air M2</h2>
            <p className={styles.descb}>Supercharged by Apple Silicon</p>
            <div className={styles.actionsb}>
              <Link href="/electronics/3" className={styles.primaryBtnb}>Buy Now</Link>
              <Link href="/electronics/3" className={styles.secondaryBtnb}>View Details</Link>
            </div>
          </div>
        </div>

        <div className={styles.slideb}>
          <img src="/banner/electronics3.png" alt="Samsung S24 Ultra" />
          <div className={styles.contentb}>
            <h2 className={styles.titleb}>Galaxy S24 Ultra</h2>
            <p className={styles.descb}>AI-powered smartphone</p>
            <div className={styles.actionsb}>
              <Link href="/electronics/2" className={styles.primaryBtnb}>Buy Now</Link>
              <Link href="/electronics/2" className={styles.secondaryBtnb}>View Details</Link>
            </div>
          </div>
        </div>

        <div className={styles.slideb}>
          <img src="/banner/electronics4.png" alt="iPhone 15 Pro" />
          <div className={styles.contentb}>
            <h2 className={styles.titleb}>iPhone 15 Pro</h2>
            <p className={styles.descb}>Titanium. So strong. So light.</p>
            <div className={styles.actionsb}>
              <Link href="/electronics/1" className={styles.primaryBtnb}>Buy Now</Link>
              <Link href="/electronics/1" className={styles.secondaryBtnb}>View Details</Link>
            </div>
          </div>
        </div>

        <div className={styles.slideb}>
          <img src="/banner/electronics5.png" alt="Apple Watch Series 9" />
          <div className={styles.contentb}>
            <h2 className={styles.titleb}>Apple Watch Series 9</h2>
            <p className={styles.descb}>Smarter. Brighter. More powerful.</p>
            <div className={styles.actionsb}>
              <Link href="/electronics/6" className={styles.primaryBtnb}>Buy Now</Link>
              <Link href="/electronics/6" className={styles.secondaryBtnb}>View Details</Link>
            </div>
          </div>
        </div>

      </div>

      <div className={styles.overlayb} />
    </section>
  );
};

export default Banner;
