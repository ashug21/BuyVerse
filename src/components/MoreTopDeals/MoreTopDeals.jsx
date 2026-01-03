"use client";
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
            <div className={styles.cardd}>
              <img src="/electronics/phones/iphone15pro/1.png" alt="" />
              <p className={styles.named}>Smart Phones</p>
              <span className={styles.offerd}>Min. 70% Off</span>
            </div>
            <div className={styles.cardd}>
              <img src="/electronics/appleWatch/appleseries9/1.png" alt="" />
              <p className={styles.named}>Wrist Watches</p>
              <span className={styles.offerd}>Min. 90% Off</span>
            </div>
            <div className={styles.cardd}>
              <img src="/electronics/headphones/AppleAirpodsPro(2nd)/1.png" alt="" />
              <p className={styles.named}>Airpods</p>
              <span className={styles.offerd}>Min. 90% Off</span>
            </div>
            <div className={styles.cardd}>
              <img src="/electronics/laptop/DellXPS 13 i7/1.png" alt="" />
              <p className={styles.named}>Laptops</p>
              <span className={styles.offerd}>Min. 90% Off</span>
            </div>
           
          </div>
        </div>

        {/* Section 2 */}
        <div className={styles.sectiond}>
          <div className={styles.sectionHeaderd}>
            <h3 className={styles.sectionTitled}>Winter Essentials for You</h3>
            <button className={styles.arrowBtnd}>›</button>
          </div>

          <div className={styles.gridd}>
            <div className={styles.cardd}>
              <img src="/electronics/laptop/Macbookairm2/1.png" alt="" />
              <p className={styles.named}>Men's Jackets</p>
              <span className={styles.offerd}>Min. 50% Off</span>
            </div>
            <div className={styles.cardd}>
              <img src="/electronics/ipad/ipadAir5thgen/1.png" alt="" />
              <p className={styles.named}>Men's Caps</p>
              <span className={styles.offerd}>Top Picks</span>
            </div>
            <div className={styles.cardd} />
            <div className={styles.cardd} />
          </div>
        </div>

        {/* Section 3 */}
        <div className={styles.sectiond}>
  <div className={styles.sectionHeaderd}>
    <h3 className={styles.sectionTitled}>Fashion Deals</h3>
    <button className={styles.arrowBtnd}>›</button>
  </div>

  <div className={styles.gridd}>
    <div className={styles.cardd}>
      <img src="/banner/women.png" alt="Women's Ethnic Wear" />
      <p className={styles.named}>Women's Western Wear</p>
      <span className={styles.offerd}>Min. 60% Off</span>
    </div>

    <div className={styles.cardd}>
      <img src="/fashion/nike/menTshirt/1.png" alt="Men's T-Shirts" />
      <p className={styles.named}>Men's T-Shirts</p>
      <span className={styles.offerd}>Min. 50% Off</span>
    </div>

    <div className={styles.cardd}>
      <img src="/fashion/puma/mens solidslimfit polo/1.png" alt="Men's Polo T-Shirts" />
      <p className={styles.named}>Men's Polo T-Shirts</p>
      <span className={styles.offerd}>Min. 55% Off</span>
    </div>

    <div className={styles.cardd}>
      <img src="/banner/women2.png" alt="Women's Western Wear" />
      <p className={styles.named}>Women's Kurta</p>
      <span className={styles.offerd}>Min. 65% Off</span>
    </div>
  </div>
</div>


      </div>
    </section>
  );
};

export default MultiDeals;
