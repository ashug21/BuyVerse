"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { products } from "@/products";
import styles from "../../electronics/[id]/product.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { getRelatedProducts } from "../../../../utils/getRelatedProducts";
import Link from "next/link";

const ProductPage = ({ params }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const resolvedParams = React.use(params);
  const { id } = resolvedParams;

  const product = products.find((item) => String(item.id) === id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartState, setCartState] = useState("idle");

  const [comment, setComment] = useState("");
  const [totalcomments, setTotalComments] = useState([]);

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
      toast.error("Please login to add items to cart");
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

    toast.success("Added to cart");

    setTimeout(() => setCartState("added"), 350);
    setTimeout(() => setCartState("idle"), 2000);
  };

  const handleBuy = () => {
    if (status === "loading") return;

    if (!session) {
      toast.error("Please login to continue");
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

  const fetchComments = async () => {
    const res = await fetch(`/api/comments?productId=${product.id}`);
    const data = await res.json();
    setTotalComments(data);
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      toast.error("Login required");
      router.push("/login");
      return;
    }

    const text = comment.trim();
    if (!text) return;

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: text,
        productId: String(product.id),
      }),
    });

    if (res.ok) {
      toast.success("Comment added");
      setComment("");
      fetchComments();
    }
  };


  const handleWishList = async (e) => {
    e.preventDefault();
  
    if (status === "loading") return;
  
    if (!session) {
      toast.error("Please login to add items to wishlist");
      router.push("/login");
      return;
    }
  
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: product.name,
          price: product.price,
          img: product.images[0],
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "Failed to add to wishlist");
      }
  
      toast.success("Added to wishlist");
    } catch (error) {
      toast.error(error.message);
    }
  };


   const product1 = products.find(
      (item) => item.id === id
    );
  
  
    const relatedProducts = getRelatedProducts(products, id);

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
            <button className={styles.navLeft} onClick={prevImage}>
              ‹
            </button>

            <img src={images[currentIndex]} className={styles.productImg} />

            <button className={styles.navRight} onClick={nextImage}>
              ›
            </button>
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
            <span className={styles.beforePrice}>₹{product.beforePrice}</span>
            <div className={styles.priceRow}>
              <span className={styles.currency}>₹</span>
              <span className={styles.price}>{product.price}</span>
            </div>
            <span className={styles.discount}>
              (Save ₹{product.beforePrice - product.price})
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
              {cartState === "added" ? (
                <div>
                  <CheckSVG />
                </div>
              ) : (
                "Add to Cart"
              )}
            </button>

            <button onClick={handleBuy} className={styles.buyNow}>
              Buy Now
            </button>
           
          </div>
          <button onClick={handleWishList} className={styles.addToWishlist}>
              Add To WishList❤️
            </button>
        </div>
      </div>



      <br/>
<div className={styles.relatedSection}>
  <h2 className={styles.relatedTitle}>Related Products</h2>

  <div className={styles.relatedGrid}>
    {relatedProducts.map((item) => (
      <Link
        key={item.id}
        href={`/electronics/${item.id}`}
        className={styles.relatedCard}
      >
        <div className={styles.relatedImageWrapper}>
          <img
            src={item.images?.[0]}
            alt={item.name}
            className={styles.relatedImage}
          />
        </div>

        <h4 className={styles.relatedName}>{item.name}</h4>

        <div className={styles.relatedPrice}>
          ₹{item.price}
        </div>
      </Link>
    ))}
  </div>
</div>



      <div className={styles.reviewSection}>
        <form className={styles.reviewForm} onSubmit={handleCommentSubmit}>
          <p className={styles.reviewHeading}>
            Review this product <br />
            <span>Share your thoughts with other customers</span>
          </p>

          <label className={styles.reviewLabel}>Write a Review</label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles.reviewTextarea}
            placeholder="Write your review here..."
          />

          <button type="submit" className={styles.reviewSubmit}>
            Submit
          </button>
        </form>
      </div>

      {/* REVIEWS BELOW FORM */}

      <p className={styles.reviewListHeading}>Top reviews from India</p>
      <div className={styles.reviewList}>
  {totalcomments.length === 0 && (
    <div className={styles.noReview}>
      No reviews yet. Be the first to review this product.
    </div>
  )}

  {totalcomments.map((c) => (
    <div key={c._id} className={styles.reviewItem}>
      <div className={styles.reviewTop}>
        <span className={styles.reviewerName}>{c.name}</span>
        <span className={styles.reviewDate}>
          {new Date(c.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className={styles.reviewContent}>
        {c.description}
      </div>
    </div>
  ))}
</div>


      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default ProductPage;
