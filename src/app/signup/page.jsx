"use client";

import Link from "next/link";
import styles from './signup.module.css'
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
        <Navbar/>
 <div className={styles.signupPageh}>
      <div className={styles.signupContainerh}>
        <div className={styles.signupLefth}>
          <h1 className={styles.signupTitleh}>Create Account</h1>
          <p className={styles.signupSubtexth}>
            Sign up to track orders, save addresses, and get exclusive offers.
          </p>

          <form onSubmit={handleSubmit} className={styles.signupFormh}>
            <div className={styles.inputGrouph}>
              <label className={styles.labelh}>Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="John Doe"
                className={styles.inputh}
              />
            </div>

            <div className={styles.inputGrouph}>
              <label className={styles.labelh}>Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="john@example.com"
                className={styles.inputh}
              />
            </div>

            <div className={styles.inputGrouph}>
              <label className={styles.labelh}>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter your password"
                className={styles.inputh}
              />
            </div>

            <button className={styles.signupButtonh} type="submit">
              Create Account
            </button>
          </form>

          <p className={styles.loginTexth}>
            Already have an account?
            <Link href="/login" className={styles.loginLinkh}>
              Login
            </Link>
          </p>
        </div>

        <div className={styles.signupRighth}>
  <div className={styles.promoBoxh}>
    <h2 className={styles.promoTitleh}>Shop smarter with us</h2>
    <ul className={styles.promoListh}>
      <li>Trusted by thousands of happy customers</li>
      <li>100% secure checkout & encrypted payments</li>
      <li>Lightning-fast shipping across India</li>
      <li>Hassle-free returns & instant support</li>
    </ul>
  </div>
</div>

      </div>
    </div>
    </div>
   
  );
};

export default Signup;
