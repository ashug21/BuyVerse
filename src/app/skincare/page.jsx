"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import { products } from "@/products";
import styles from "./skincare.module.css";
import Footer from "@/components/Footer/Footer";

const Skincare = () => {
  const initialProducts = products.filter(
    (product) => product.category === "Skincare"
  );

  const [skincareProducts, setSkincareProducts] = useState(initialProducts);
  const [sort, setSort] = useState("Default");

  const handleSort = (value) => {
    setSort(value);

    if (value === "Price : Low to High") {
      const sorted = [...skincareProducts].sort(
        (a, b) => a.price - b.price
      );
      setSkincareProducts(sorted);
    }

    if (value === "Price : High to Low") {
      const sorted = [...skincareProducts].sort(
        (a, b) => b.price - a.price
      );
      setSkincareProducts(sorted);
    }

    if (value === "Default") {
      setSkincareProducts(initialProducts);
    }
  };

  return (
    <div className={styles.pagen}>
      <Navbar />

      {/* SORT BAR */}
      <div className={styles.sortBarn}>
        <span className={styles.sortLabeln}>Sort by</span>

        <select
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
          className={styles.sortSelectn}
        >
          <option>Default</option>
          <option>Price : Low to High</option>
          <option>Price : High to Low</option>
        </select>
      </div>

      <div className={styles.gridWrappern}>
        {skincareProducts.map((item) => (
          <Link
            key={item.id}
            href={`/skincare/${item.id}`}
            className={styles.cardn}
          >
            <div className={styles.imageWrappern}>
              <img
                src={item.images?.[0] || "/placeholder/product.png"}
                alt={item.name}
                className={styles.imagen}
              />
            </div>

            <h3 className={styles.titlen}>{item.name}</h3>

            <div className={styles.ratingRown}>
              <span className={styles.starsn}>
                {Array.from({ length: 5 }, (_, index) =>
                  index < item.starRating ? "★" : "☆"
                )}
              </span>
              <span className={styles.reviewCountn}>
                {item.ratings} Ratings
              </span>
            </div>

            <div className={styles.priceRown}>
              <span className={styles.currencyn}>₹</span>
              <span className={styles.pricen}>
                {item.price === 0 ? "—" : item.price}
              </span>
            </div>

            <button className={styles.ctan}>Add to Cart</button>
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

export default Skincare;
