"use client";

import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import Navbar from "@/components/Navbar/Navbar";
import bin from "../../../public/bin.png";
import Link from "next/link";

const Cart = () => {
  const [cart, setCart] = useState([]);

  
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const deleteCartItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].qty += 1;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQty = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].qty > 1) {
      updatedCart[index].qty -= 1;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  return (
    <>
      <Navbar />

      <div className={styles.pagek}>
        <div className={styles.contentk}>
          {cart.length === 0 && (
            <p style={{ textAlign: "center" }}>Cart is empty</p>
          )}

          {cart.map((item, index) => (
            <div className={styles.cardk} key={index}>
              <img src={item.img} alt={item.name} className={styles.imgk} />

              <div className={styles.infok}>
                <h2 className={styles.titlek}>{item.name}</h2>
                <p className={styles.pricek}>₹{item.price}</p>

                <div className={styles.qtyk}>
                  <button
                    className={styles.btnk}
                    onClick={() => decreaseQty(index)}
                  >
                    -
                  </button>
                  <span className={styles.countk}>{item.qty}</span>
                  <button
                    className={styles.btnk}
                    onClick={() => increaseQty(index)}
                  >
                    +
                  </button>
                </div>
              </div>

              <img
                src={bin.src}
                alt="remove"
                className={styles.bink}
                onClick={() => deleteCartItem(index)}
              />
              
            </div>
            
          ))}
        </div>

        {/* button INSIDE container, at bottom */}
        {cart.length !== 0 && (
            <div className={styles.payWrapk}>
            <Link href="/add-address" className={styles.payBtnk}>Add Delivery Address</Link>
          </div>
)}

      </div>
    </>
  );
};

export default Cart;
