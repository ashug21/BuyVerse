"use client";

import Link from "next/link";
import styles from "./signup.module.css";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Signup = () => {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleGenerateOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    const loadingToast = toast.loading("Sending OTP...");

    try {
      const res = await fetch("/api/auth/generate-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      toast.success("OTP sent to email");
      setStep(2);
    } catch (err) {
      toast.error(err.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("OTP is required");
      return;
    }

    const loadingToast = toast.loading("Verifying OTP...");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "OTP verification failed");
      }

      toast.success("Email verified");
      setStep(3);
    } catch (err) {
      toast.error(err.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 8) {
      toast.error("Password should be at least 8 characters");
      return;
    }

    if (
      password === "12345678" ||
      password === "password" ||
      password === "00000000" ||
      password === "11111111" ||
      password === "qwertyui"
    ) {
      toast.error("Choose a strong password");
      return;
    }

    const loadingToast = toast.loading("Creating account...");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      toast.success("Account created successfully");
      router.push("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div>
      <Navbar />

      <div className={styles.signupPageh}>
        <div className={styles.signupContainerh}>
          <div className={styles.signupLefth}>
            <h1 className={styles.signupTitleh}>Create Account</h1>
            <p className={styles.signupSubtexth}>
              Sign up to track orders, save addresses, and get exclusive offers.
            </p>

            {/* ⬇️ FORM REMOVED */}
            <div className={styles.signupFormh}>
              {step === 1 && (
                <div className={styles.inputGrouph}>
                  <label className={styles.labelh}>Email Address</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputh}
                  />
                </div>
              )}

              {step === 2 && (
                <div className={styles.inputGrouph}>
                  <label className={styles.labelh}>Enter OTP</label>
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    className={styles.inputh}
                  />
                </div>
              )}

              {step === 3 && (
                <>
                  <div className={styles.inputGrouph}>
                    <label className={styles.labelh}>Full Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="John Doe"
                      className={styles.inputh}
                    />
                  </div>

                  <div className={styles.inputGrouph}>
                    <label className={styles.labelh}>Password</label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Password should be of 8 letters"
                      className={styles.inputh}
                    />
                  </div>
                </>
              )}

              {step === 1 && (
                <button
                  type="button"
                  onClick={handleGenerateOtp}
                  className={styles.signupButtonh}
                >
                  Generate OTP
                </button>
              )}

              {step === 2 && (
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className={styles.signupButtonh}
                >
                  Verify OTP
                </button>
              )}

              {step === 3 && (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={styles.signupButtonh}
                >
                  Create Account
                </button>
              )}
            </div>

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
