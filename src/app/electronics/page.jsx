"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import { products } from "@/products";
import styles from "./electronics.module.css";
import Footer from "@/components/Footer/Footer";



const Electronics = () => {
  const initialProducts = products.filter(
    (product) => product.category === "Electronics"
  );

  const [electronicsProducts, setElectronicsProducts] =
    useState(initialProducts);

  const [sort, setSort] = useState("Default");

  const handleSort = (value) => {
    setSort(value);

    if (value === "Price : Low to High") {
      const sorted = [...electronicsProducts].sort(
        (a, b) => a.price - b.price
      );
      setElectronicsProducts(sorted);
    }

    if (value === "Price : High to Low") {
      const sorted = [...electronicsProducts].sort(
        (a, b) => b.price - a.price
      );
      setElectronicsProducts(sorted);
    }

    if (value === "Default") {
      setElectronicsProducts(initialProducts);
    }
  };





  return (
    <div className={styles.pagef}>
      <Navbar />

      {/* SORT BAR */}
      <div className={styles.sortBarf}>
        <span className={styles.sortLabelf}>Sort by</span>

        <select
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
          className={styles.sortSelectf}
        >
          <option>Default</option>
          <option>Price : Low to High</option>
          <option>Price : High to Low</option>
        </select>
      </div>

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
