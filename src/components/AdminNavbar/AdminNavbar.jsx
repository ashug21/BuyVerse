"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./AdminNavbar.module.css";
import menuIcon from "../../../public/menus.png";
import { useRouter } from "next/navigation";



const AdminNavbar = () => {

  const router = useRouter();

  const logOutAdmin = async() => {

    localStorage.removeItem("admin");
    router.replace("/");
  }



  return (
    <>
      <header className={styles.navbara}>
        <div className={styles.navContainera}>
          <div className={styles.lefta}>

            <button onClick={logOutAdmin} className={styles.logoa}>
              BuyVerse
            </button>

            <nav className={styles.menua}>

            <Link href="/admin/dashboard" className={styles.menuItema}>Dashboard</Link>
            </nav>
          </div>

          <div className={styles.righta}>
          
          <Link href="/admin/users" className={styles.menuItema}>Users</Link>
              <Link href="/admin/orders" className={styles.menuItema}>Orders</Link>
              <Link href="/admin/address" className={styles.menuItema}>Address</Link>
              <Link href="/admin/comments" className={styles.menuItema}>Comments</Link>
                <button onClick={logOutAdmin} className={styles.dropdownItema}>LogOut</button>
            </div>
          </div>

      </header>




    </>
  );
};

export default AdminNavbar;
