import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import { products } from "@/products";
import styles from "./electronics.module.css";
import Footer from "@/components/Footer/Footer";

const Electronics = () => {
  const electronicsProducts = products.filter(
    (product) => product.category === "Electronics"
  );

  return (
    <div className={styles.pagef}>
      <Navbar />

      <div className={styles.gridWrapperf}>
        {electronicsProducts.map((item) => (
          <Link
            key={item.id}
            href={`/electronics/${item.id}`}
            className={styles.cardf}
          >
            <div className={styles.imageWrapperf}>
              <img
                src={item.images?.[0] || "/placeholder/product.png"}
                alt={item.name}
                className={styles.imagef}
              />
            </div>

            <h3 className={styles.titlef}>{item.name}</h3>

            <div className={styles.ratingRowf}>
              <span className={styles.starsf}>
                {Array.from({ length: 5 }, (_, index) =>
                  index < item.starRating ? "★" : "☆"
                )}
              </span>
              <span className={styles.reviewCountf}>
                {item.ratings} Ratings
              </span>
            </div>

            <div className={styles.priceRowf}>
              <span className={styles.currencyf}>₹</span>
              <span className={styles.pricef}>
                {item.price === 0 ? "—" : item.price}
              </span>
            </div>

            <button className={styles.ctaf}>Add to Cart</button>
          </Link>
        ))}
      </div>

      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />

      <Footer />
    </div>
  );
};

export default Electronics;
