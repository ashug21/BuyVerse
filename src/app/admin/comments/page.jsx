"use client";

import React, { useEffect, useState } from "react";
import styles from "./comment.module.css";
import AdminNavbar from "@/components/AdminNavbar/AdminNavbar";
import toast from "react-hot-toast";

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

  const deleteComment = async (id) => {

    if (!confirm("Are you sure you want to delete this Comment?")){
      return;
    }
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.log("Failed to delete Comment");
        return;
      }


      setData((prev) => prev.filter((c) => c._id !== id));

      toast.success("Comment Deleted from DB");

    } catch (error) {
      console.log(error);
    }
  };

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
                  <p className={styles.emailq}>Email : {item.email || "—"}</p>
                  <p className={styles.emailq}>
                    ProductId : {item.productId || "—"}
                  </p>
                </div>
                <p className={styles.dateBottomq}>
                  {new Date(item.createdAt).toLocaleString()}
                </p>

                <img
                  src="/image.png"
                  alt="delete"
                  className={styles.binq}
                  onClick={() => deleteComment(item._id)}
                />
              </div>

              <div className={styles.contentq}>{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;


// All Okay