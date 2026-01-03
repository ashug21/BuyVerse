import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import { products } from "@/products";
import styles from "./fashion.module.css";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

const Fashion = () => {
  const fashionProducts = products.filter(
    (product) => product.category === "Fashion"
  );

  return (
    <div className={styles.pageg}>
      <Navbar />

      <div className={styles.gridWrapperg}>
        {fashionProducts.map((item) => (
          <Link
            key={item.id}
            href={`/fashion/${item.id}`}
            className={styles.cardg}
          >
            <div className={styles.imageWrapperg}>
              <img
                src={item.images?.[0] || "/placeholder/product.png"}
                alt={item.name}
                className={styles.imageg}
              />
            </div>

            <h3 className={styles.titleg}>{item.name}</h3>

            <div className={styles.ratingRowg}>
              <span className={styles.starsg}>
                {Array.from({ length: 5 }, (_, index) =>
                  index < item.starRating ? "★" : "☆"
                )}
              </span>
              <span className={styles.reviewCountg}>
                {item.ratings} Ratings
              </span>
            </div>

            <div className={styles.priceRowg}>
              <span className={styles.currencyg}>₹</span>
              <span className={styles.priceg}>
                {item.price === 0 ? "—" : item.price}
              </span>
            </div>

            <button className={styles.ctag}>Add to Cart</button>
          </Link>
        ))}
      </div>

      <br /><br /><br />
      <br /><br /><br />
      <br /><br /><br />
      <br /><br /><br />
      <br /><br /><br />
      <br /><br /><br />
      <br /><br /><br />

      <Footer />
    </div>
  );
};

export default Fashion;
