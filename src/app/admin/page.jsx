"use client";

import React, { useState } from "react";
import styles from "./admin.module.css";
import { useRouter } from "next/navigation";

const Admin = () => {

  const router = useRouter();

  const[email , setEmail] = useState("");
  const[password , setPassword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();


    if(email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD){

      localStorage.setItem("admin" , true);
      router.replace("/admin/dashboard");
    }
    else{
      router.replace("/");
    }
  }


  return (
    <>
      <div className={styles.adminContainern}>
        <form onSubmit={handleSubmit} className={styles.loginBoxn}>
          <h2 className={styles.titlen}>Admin Login</h2>

          <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
            type="email"
            placeholder="Admin Email"
            className={styles.inputn}
            required
          />

          <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
            type="password"
            placeholder="Password"
            className={styles.inputn}
            required
          />

          <button type="submit" className={styles.buttonn}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Admin;
