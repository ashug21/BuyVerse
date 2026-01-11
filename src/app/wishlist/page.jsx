"use client";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import React, { useEffect, useState } from "react";
import styles from "./wishlist.module.css";
import toast from "react-hot-toast";
import Image from "next/image";
import bin from "../../../public/bin.png";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Wishlist = () => {
  const [wishlist, setWishList] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  const getWishListItems = async () => {
    try {
      const res = await fetch("/api/wishlist");

      if (res.status === 204) {
        setWishList([]);
        return;
      }

      const data = await res.json();
      setWishList(data.wishlists || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishListItems();
  }, []);

  const handleCart = (item) => {
    if (status === "loading") return;

    if (!session) {
      toast.error("Please login to add items to cart");
      router.push("/login");
      return;
    }

    const cartItem = {
      id: item._id,
      name: item.title,
      price: item.price,
      img: item.img,
      qty: 1,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    toast.success("Added to cart");
  };

  const deleteWishListItems = async (id) => {
    try {
      const res = await fetch(`/api/wishlist/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message || "Failed to delete Wishlist item");
        return;
      } 
      else if (res.ok){
        toast.success("Item deleted from Wishlist");
      }

      getWishListItems();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.wrapperv}>
        <h1 className={styles.titlev}>Your Wishlist</h1>

        {wishlist.length === 0 ? (
          <p className={styles.emptyv}>Your Wishlist is empty</p>
        ) : (
          <div className={styles.listv}>
            {wishlist.map((item) => (
              <div key={item._id} className={styles.cardv}>
                <img
                  src={item.img}
                  alt={item.title}
                  className={styles.imagev}
                />

                <div className={styles.infov}>
                  <p className={styles.productTitlev}>{item.title}</p>
                  <p className={styles.pricev}>₹{item.price}</p>
                  <p className={styles.stockv}>In stock</p>

                  <button
                    onClick={() => handleCart(item)}
                    className={styles.cartBtnv}
                  >
                    Add to Cart
                  </button>
                </div>

                <div className={styles.deleteWrapv}>
                  <Image
                    onClick={() => deleteWishListItems(item._id)}
                    src={bin}
                    alt="Remove from wishlist"
                    className={styles.binv}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <br /> <br /> <br />
      <br /> <br /> <br />
      <br /> <br /> <br />
      <br /> <br /> <br />
      <br /> <br />
      <Footer />
    </div>
  );
};

export default Wishlist;
