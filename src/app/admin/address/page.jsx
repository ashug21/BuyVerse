"use client";

import AdminNavbar from "@/components/AdminNavbar/AdminNavbar";
import React, { useEffect, useState } from "react";
import styles from './address.module.css'

const Address = () => {
  const [address, setAddress] = useState([]);

  const getAddress = async () => {
    try {
      const res = await fetch("/api/admin/address");
      const data = await res.json();
      setAddress(data.address || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div className={styles.pagex}>
      <AdminNavbar />

      <div className={styles.containerx}>
        <h1 className={styles.titlex}>Address List</h1>

        <div className={styles.tablex}>
          <div className={`${styles.rowx} ${styles.headerx}`}>
            <span>Address ID</span>
            <span>Name</span>
            <span>Mobile</span>
            <span>Address 1</span>
            <span>Address 2</span>
            <span>State</span>
            <span>City</span>
            <span>Pincode</span>
            <span>User Email</span>
          </div>

          {address.map((addr) => (
            <div className={styles.rowx} key={addr._id}>
              <span className={styles.idx}>{addr._id}</span>
              <span>{addr.fullname || "—"}</span>
              <span>{addr.mobile}</span>
              <span>{addr.address1}</span>
              <span>{addr.address2}</span>
              <span>{addr.state}</span>
              <span>{addr.city}</span>
              <span>{addr.pincode}</span>
              <span>{addr.userEmail}</span>
            </div>
          ))}

          {address.length === 0 && (
            <div className={styles.emptyx}>No addresses found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;
