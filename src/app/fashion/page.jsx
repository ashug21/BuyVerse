"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { products } from "@/products";
import styles from "./fashion.module.css";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";

const Fashion = () => {
  const initialProducts = products.filter(
    (product) => product.category === "Fashion"
  );

  const [fashionProducts, setFashionProducts] = useState(initialProducts);
  const [sort, setSort] = useState("Default");

  const handleSort = (value) => {
    setSort(value);

    if (value === "Price : Low to High") {
      const sorted = [...fashionProducts].sort(
        (a, b) => a.price - b.price
      );
      setFashionProducts(sorted);
    }

    if (value === "Price : High to Low") {
      const sorted = [...fashionProducts].sort(
        (a, b) => b.price - a.price
      );
      setFashionProducts(sorted);
    }

    if (value === "Default") {
      setFashionProducts(initialProducts);
    }
  };

  return (
    <div className={styles.pageg}>
      <Navbar />

      {/* SORT BAR */}
      <div className={styles.sortBarg}>
        <span className={styles.sortLabelg}>Sort by</span>

        <select
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
          className={styles.sortSelectg}
        >
          <option>Default</option>
          <option>Price : Low to High</option>
          <option>Price : High to Low</option>
        </select>
      </div>

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
