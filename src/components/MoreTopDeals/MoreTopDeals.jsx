"use client";
import Link from 'next/link';
import styles from './MoreTopDetails.module.css'

const MultiDeals = () => {
  return (
    <section className={styles.wrapperd}>
      <div className={styles.containerd}>

        {/* Section 1 */}
        <div className={styles.sectiond}>
          <div className={styles.sectionHeaderd}>
            <h3 className={styles.sectionTitled}>Electronic's Deals</h3>
            <button className={styles.arrowBtnd}>›</button>
          </div>

          <div className={styles.gridd}>

            <Link href={"/electronics/1"} className={styles.cardd}>
              <img src="/electronics/phones/iphone15pro/1.png" alt="iphone15pro" />
              <p className={styles.named}>Smart Phones</p>
              <span className={styles.offerd}>Min. 20% Off</span>
            </Link>
            <Link href={"/electronics/6"} className={styles.cardd}>
              <img src="/electronics/appleWatch/appleseries9/1.png" alt="applewatch" />
              <p className={styles.named}>Wrist Watches</p>
              <span className={styles.offerd}>Min. 15% Off</span>
            </Link>
            <Link href={"/electronics/8"} className={styles.cardd}>
              <img src="/electronics/headphones/AppleAirpodsPro(2nd)/1.png" alt="airpods" />
              <p className={styles.named}>Airpods</p>
              <span className={styles.offerd}>Min. 30% Off</span>
            </Link>
            <Link href={"/electronics/4"} className={styles.cardd}>
              <img src="/electronics/laptop/DellXPS 13 i7/1.png" alt="dellLaptop" />
              <p className={styles.named}>Laptops</p>
              <span className={styles.offerd}>Min. 20% Off</span>
            </Link>
           
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.sectiond}>
          <div className={styles.sectionHeaderd}>
            <h3 className={styles.sectionTitled}>Winter Essentials for You</h3>
            <button className={styles.arrowBtnd}>›</button>
          </div>

          <div className={styles.gridd}>

            <Link href={"/skincare/34"} className={styles.cardd}>
              <img src="/skincare/PlumGreen/TeaOil/1.png" alt="teaoil" />
              <p className={styles.named}>Men's Jackets</p>
              <span className={styles.offerd}>Min. 50% Off</span>
            </Link>
            <Link href={"/skincare/41"} className={styles.cardd}>
              <img src="/skincare/Simple/hydratingLight/1.png" alt="hydratingmoisturizer" />
              <p className={styles.named}>Men's Caps</p>
              <span className={styles.offerd}>Top Picks</span>
            </Link>
            <Link href={"/fashion/22"} className={styles.cardd}>
              <img src="/Banner/men2.png" alt="menhoodie" />
              <p className={styles.named}>Men's Caps</p>
              <span className={styles.offerd}>Top Picks</span>
            </Link>
            <Link href={"/fashion/23"} className={styles.cardd}>
              <img src="/fashion/puma/WomensSolidCasualJacket/1.png" alt="womensolidjacket" />
              <p className={styles.named}>Men's Caps</p>
              <span className={styles.offerd}>Top Picks</span>
            </Link>
          </div>
        </div>

        {/* Section 3 */}
        <div className={styles.sectiond}>
  <div className={styles.sectionHeaderd}>
    <h3 className={styles.sectionTitled}>Fashion Deals</h3>
    <button className={styles.arrowBtnd}>›</button>
  </div>

  <div className={styles.gridd}>
    
    <Link href={"/fashion/18"} className={styles.cardd}>
      <img src="/banner/women.png" alt="Women's Ethnic Wear" />
      <p className={styles.named}>Women's Western Wear</p>
      <span className={styles.offerd}>Min. 30% Off</span>
    </Link>

    <Link href={"/fashion/16"} className={styles.cardd}>
      <img src="/fashion/nike/menTshirt/1.png" alt="Men's T-Shirts" />
      <p className={styles.named}>Men's T-Shirts</p>
      <span className={styles.offerd}>Min. 35% Off</span>
    </Link>

    <Link href={"/fashion/17"} className={styles.cardd}>
      <img src="/fashion/puma/mens solidslimfit polo/1.png" alt="Men's Polo T-Shirts" />
      <p className={styles.named}>Men's Polo T-Shirts</p>
      <span className={styles.offerd}>Min. 20% Off</span>
    </Link>

    <Link href={"/fashion/19"} className={styles.cardd}>
      <img src="/banner/women2.png" alt="Women's Western Wear" />
      <p className={styles.named}>Women's Kurta</p>
      <span className={styles.offerd}>Min. 25% Off</span>
    </Link>
  </div>
</div>


      </div>
    </section>
  );
};

export default MultiDeals;
