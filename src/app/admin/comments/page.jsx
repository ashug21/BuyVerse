"use client";

import React, { useEffect, useState } from "react";
import styles from "./comment.module.css";
import AdminNavbar from "@/components/AdminNavbar/AdminNavbar";

const Comments = () => {
  const [data, setData] = useState([]);

  const getAllComments = async () => {
    try {
      const res = await fetch("/api/admin/comments", { cache: "no-store" });
      const data = await res.json();
      setData(data.comments || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className={styles.wrapperq}>
        <h1 className={styles.titleq}>Comments / Reviews</h1>

        {data.length === 0 && (
          <p className={styles.emptyq}>No Comments to Show</p>
        )}

        <div className={styles.cardGridq}>
          {data.map((item) => (
            <div key={item._id} className={styles.cardq}>
              <div className={styles.headerq}>
                <div>
                  <p className={styles.nameq}>{item.name}</p>
                  <p className={styles.emailq}>{item.email || "—"}</p>
                </div>
                <p className={styles.dateq}>
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>

              <div className={styles.contentq}>
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </>
  );
};

export default Comments;
