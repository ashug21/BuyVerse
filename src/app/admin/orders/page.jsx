"use client";

import AdminNavbar from "@/components/AdminNavbar/AdminNavbar";
import React, { useEffect, useState } from "react";
import styles from "./orders.module.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className={styles.pagey}>
      <AdminNavbar />

      <div className={styles.containery}>
        <h1 className={styles.titley}>Orders List</h1>

        <div className={styles.tabley}>
          <div className={`${styles.rowy} ${styles.headery}`}>
            <span>Order ID</span>
            <span>Title</span>
            <span>Items Total</span>
            <span>Delivery</span>
            <span>Total</span>
            <span>Payment</span>
            <span>Status</span>
            <span>User Email</span>
          </div>

          {orders.map((order) => (
            <div className={styles.rowy} key={order._id}>
              <span className={styles.idy}>{order._id}</span>
              <span>{order.title || "—"}</span>
              <span>{order.itemsTotal}</span>
              <span>{order.delivery}</span>
              <span>{order.total}</span>
              <span>{order.paymentMethod}</span>
              <span className={styles.statusy}>{order.paymentStatus}</span>
              <span>{order.userEmail}</span>
            </div>
          ))}

          {orders.length === 0 && (
            <div className={styles.emptyy}>No orders found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
