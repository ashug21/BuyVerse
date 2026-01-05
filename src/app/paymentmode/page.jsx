"use client";

import Navbar from "@/components/Navbar/Navbar";
import styles from "./paymentmode.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PaymentsPage = () => {
  const router = useRouter();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const getAddress = async () => {
    try {
      const res = await fetch("/api/address");
      const data = await res.json();
      setAddresses(data.address || []);
      setSelectedAddress(data.address?.[0] || null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  const itemsTotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const tax = Math.round(itemsTotal * 0.01);
  const delivery = itemsTotal <= 10000 ? 0 : 120;
  const finalTotal = itemsTotal + tax + delivery;

  const title = cart
    .map((item) => `${item.name} x${item.qty}`)
    .join(", ");

  const placeOrder = async () => {
    try {


      if (paymentMethod === "Upi") {
        const res = await fetch("/api/payment/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: finalTotal }),
        });

        const { order } = await res.json();

        if (!order) {
          alert("Failed to create payment order");
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          order_id: order.id,
          amount: order.amount,
          currency: order.currency,
          name: "BuyVerse",
          description: "Order Payment",
          handler: async function () {


            const orderRes = await fetch("/api/order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title,
                itemsTotal,
                delivery,
                total: finalTotal,
                paymentMethod: "UPI",
                paymentStatus: "Paid", 
              }),
            });

            if (!orderRes.ok) {
              alert("Order placement failed");
              return;
            }

            localStorage.removeItem("cart");
            router.push("/orders");
          },
          prefill: {
            name: selectedAddress?.fullname || "",
            contact: selectedAddress?.mobile || "",
          },
          theme: {
            color: "#121212",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
        return;
      }



      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          itemsTotal,
          delivery,
          total: finalTotal,
          paymentMethod,
          paymentStatus: "Pending", 
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }

      localStorage.removeItem("cart");
      router.replace("/orders");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>Checkout</h1>

          <div className={styles.layout}>
            {/* LEFT */}
            <div className={styles.left}>
              <section className={styles.card}>
                <h2 className={styles.cardTitle}>Delivery Address</h2>

                {addresses.length === 0 && (
                  <p>No address found. Please add one.</p>
                )}

                {addresses.map((addr) => (
                  <div key={addr._id} className={styles.addressBox}>
                    <label className={styles.addressSelect}>
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddress?._id === addr._id}
                        onChange={() => setSelectedAddress(addr)}
                      />
                      <div>
                        <p className={styles.name}>{addr.fullname}</p>
                        <p>{addr.address1}</p>
                        {addr.address2 && <p>{addr.address2}</p>}
                        <p>
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className={styles.phone}>
                          Phone: {addr.mobile}
                        </p>
                      </div>
                    </label>
                  </div>
                ))}
              </section>

              <br />

              <section className={styles.card}>
                <h2 className={styles.cardTitle}>Payment Method</h2>

                <div className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    onChange={() => setPaymentMethod("Upi")}
                  />
                  <Image src="/upi.png" alt="UPI" width={60} height={24} />
                  <span>UPI / Paytm / PhonePe / Google Pay / Amazon Pay</span>
                </div>

                {/* <div className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    onChange={() => setPaymentMethod("Card")}
                  />
                  <Image src="/credit.png" alt="Card" width={60} height={24} />
                  <span>Credit / Debit Card</span>
                </div> */}
{/* 
                <div className={styles.cardForm}>
                  <input placeholder="Card Number" />
                  <div className={styles.cardRow}>
                    <input placeholder="MM/YY" />
                    <input placeholder="CVV" />
                  </div>
                </div> */}

                <div className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="payment"
                    onChange={() => setPaymentMethod("COD")}
                  />
                  <span>Cash on Delivery</span>
                </div>
              </section>
            </div>

            {/* RIGHT */}
            <div className={styles.right}>
              <section className={styles.summaryCard}>
                <h2 className={styles.cardTitle}>Order Summary</h2>

                {cart.map((item, index) => (
                  <div key={index} className={styles.summaryRow}>
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span>₹ {item.price * item.qty}</span>
                  </div>
                ))}

                <div className={styles.divider}></div>

                <div className={styles.summaryRow}>
                  <span>Items Total</span>
                  <span>₹ {itemsTotal}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>Delivery</span>
                  <span>{delivery === 0 ? "Free" : `₹ ${delivery}`}</span>
                </div>

                <div className={styles.summaryRow}>
                  <span>Tax</span>
                  <span>₹ {tax}</span>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span>₹ {finalTotal}</span>
                </div>

                <button
                  className={styles.payBtn}
                  disabled={!paymentMethod}
                  onClick={placeOrder}
                >
                  Place Order
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
