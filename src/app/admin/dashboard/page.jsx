"use client";

import AdminNavbar from "@/components/AdminNavbar/AdminNavbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";

const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [totalearnings , setTotalEarnings] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("admin")) {
      router.replace("/admin");
    }
  }, [router]);

  useEffect(() => {
    fetch("/api/razorpaydetails")
      .then((res) => res.json())
      .then((data) => setPayments(data));
  }, []);


  function getTotalEarnings() {
    let sum = 0;
  
    payments.forEach((item) => {
      sum += item.amount;
    });
  
    const total = (sum / 100);
    setTotalEarnings(total);

  }

  useEffect(() => {
    getTotalEarnings();
  }, [payments]);
  
  

  return (
    <div className={styles.dashboardWrapperw}>
      <AdminNavbar />

      <div className={styles.dashboardContentw}>
        <h1 className={styles.titlew}>Admin Dashboard</h1>

        <div className={styles.sectionw}>
          <h2 className={styles.sectionTitlew}>Payments History</h2>

          <div className={styles.paymentGridw}>
            {payments.map((p) => (
              <div key={p.id} className={styles.paymentCardw}>
                <p className={styles.labelw}>Payment ID</p>
                <p className={styles.valuew}>{p.id}</p>

                <p className={styles.labelw}>Amount</p>
                <p className={styles.valuew}>₹{p.amount / 100}</p>

                <p className={styles.labelw}>Status</p>
                <span
                  className={`${styles.statusw} ${
                    p.status === "captured"
                      ? styles.successw
                      : styles.failedw
                  }`}
                >
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

              <br/><br/>
              <br/><br/>
              <div className={styles.totalEarningsBoxw}>
  <p className={styles.totalLabelw}>Total Earnings</p>
  <h2 className={styles.totalValuew}>₹{totalearnings}</h2>
</div>


<br/><br/>
<br/><br/>
<br/><br/>
<br/><br/>
<br/><br/>
<br/><br/>


      </div>
    </div>
  );
};

export default AdminDashboard;
