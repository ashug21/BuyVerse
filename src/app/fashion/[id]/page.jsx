"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { products } from "@/products";
import styles from "../../electronics/[id]/product.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const FashionProductPage = ({ params }) => {


   const { data: session, status } = useSession();
    const router = useRouter();

  const { id } = React.use(params);

  const product = products.find((item) => String(item.id) === id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartState, setCartState] = useState("idle"); // idle | adding | added

  if (!product) {
    return (
      <>
        <Navbar />
        <div className={styles.notFound}>
          <h1>Product not found</h1>
        </div>
        <Footer />
      </>
    );
  }

  const images =
    product.images?.length >= 3
      ? product.images.slice(0, 3)
      : ["/placeholder/product.png", "/placeholder/product.png"];

  const prevImage = () => {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const nextImage = () => {
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  const handleCart = () => {

    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    if (cartState !== "idle") return;

    setCartState("adding");

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.images[0],
      qty: 1,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    setTimeout(() => setCartState("added"), 350);
    setTimeout(() => setCartState("idle"), 2000);
  };


  const handleBuy = () => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.images[0],
      qty: 1,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    router.push("/cart");
  };

  const CheckSVG = () => (
    <svg
      className={styles.checkIcon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );

  return (
    <>
      <Navbar />

      <div className={styles.page}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {images.map((img, index) => (
              <div
                key={index}
                className={`${styles.thumb} ${
                  index === currentIndex ? styles.activeThumb : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <img src={img} className={styles.productImg} />
              </div>
            ))}
          </div>

          <div className={styles.mainImage}>
            <button className={styles.navLeft} onClick={prevImage}>‹</button>
            <img src={images[currentIndex]} className={styles.productImg} />
            <button className={styles.navRight} onClick={nextImage}>›</button>
          </div>
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.rating}>
            {Array.from({ length: 5 }, (_, index) =>
              index < product.starRating ? "★" : "☆"
            )}
            <span> {product.ratings} Ratings</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.priceBlock}>
            <div className={styles.priceRow}>
              <span className={styles.beforePrice}>₹{product.beforePrice}</span>
              <span className={styles.currency}>₹</span>
              <span className={styles.price}>{product.price}</span>
            </div>

            <span className={styles.discount}>
              Save ₹{product.beforePrice - product.price}
            </span>
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.actionRow}>
            <button
              onClick={handleCart}
              className={`${styles.cta} ${
                cartState === "adding" ? styles.adding : ""
              } ${cartState === "added" ? styles.added : ""}`}
            >
              {cartState === "added" ? <CheckSVG /> : "Add to Cart"}
            </button>

            <button onClick={handleBuy} className={styles.buyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <br /><br /><br />
      <br /><br /><br />

      <Footer />
    </>
  );
};

export default FashionProductPage;
