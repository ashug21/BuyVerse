"use client";

import Link from "next/link";
import styles from "./login.module.css";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import google_icon from "../../../public/google.png";

const Login = () => {
  const router = useRouter();

  const {data : session , status} = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Both Fields are required");
      return;
    }

    const loadingToast = toast.loading("Logging in...");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    toast.dismiss(loadingToast);

    if (result?.error) {
      toast.error("Invalid email or password");
      console.log(result.error);
    } else {
      toast.success("Login successful");
      router.push("/");
    }
  };

  async function handleGoogleLogin() {
    await signIn("google", {
      callbackUrl: "/",
    });
  }

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);


  const handleGuestLogin = async () => {
    try {
      const email = process.env.NEXT_PUBLIC_GUEST_LOGIN_EMAIL;
      const password = process.env.NEXT_PUBLIC_GUEST_LOGIN_PASSWORD;
  
      if (!email || !password) {
        toast.error("Guest credentials not configured");
        return;
      }
  
      const result = await signIn("credentials", {
        email : email,
        password : password,
        redirect: false,
      });
  
      if (result?.error) {
        toast.error("Guest login failed");
        return;
      }
  
      toast.success("Guest Logged In");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  
  

  return (
    <div>
      <Navbar />

      <div className={styles.loginPagei}>
        <div className={styles.loginContaineri}>
          <div className={styles.loginLefti}>
            <h1 className={styles.loginTitlei}>Welcome back</h1>
            <p className={styles.loginSubtexti}>
              Login to manage orders, track shipments, and continue shopping.
            </p>

            <form onSubmit={handleSubmit} className={styles.loginFormi}>
              <div className={styles.inputGroupi}>
                <label className={styles.labeli}>Email Address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="john@example.com"
                  className={styles.inputi}
                />
              </div>

              <div className={styles.inputGroupi}>
                <label className={styles.labeli}>Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Enter your password"
                  className={styles.inputi}
                />
              </div>
            
              <button type="submit" className={styles.loginButtoni}>
                Login
              </button>
              <button onClick={handleGuestLogin}  type="submit" className={styles.loginButtoni}>
              Login As Guest
              </button>
              <button
                type="button"
                className={styles.googlesignupbuttoni}
                onClick={handleGoogleLogin}
              >
                <img
                  src={google_icon.src}
                  alt="Google"
                  className={styles.googleIconi}
                />
                <span>Sign in with Google</span>
              </button>
            </form>

            <p className={styles.signupTexti}>
              Don’t have an account?
              <Link href="/signup" className={styles.signupLinki}>
                Sign up
              </Link>
            </p>
          </div>

          <div className={styles.loginRighti}>
            <div className={styles.loginPromoi}>
              <h2>Elevate your style</h2>
              <p>
                Access exclusive fashion drops, faster checkout, and
                personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
