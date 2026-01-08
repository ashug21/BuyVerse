"use client";

import AdminNavbar from "@/components/AdminNavbar/AdminNavbar";
import React, { useEffect, useState } from "react";
import styles from "./users.module.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={styles.pagez}>
      <AdminNavbar />

      <div className={styles.containerz}>
        <h1 className={styles.titlez}>Users List</h1>

        <div className={styles.tablez}>
          <div className={`${styles.rowz} ${styles.headerz}`}>
          <span>User ID</span>
            <span>Name</span>
            <span>Email</span>
            <span>Password</span>
          
          </div>

          {users.map((user) => (
            <div className={styles.rowz} key={user._id}>
                <span className={styles.idz}>{user._id}</span>
              <span>{user.name || "—"}</span>
              <span>{user.email}</span>
              <span>{user.password}</span>
              {/* <span className={styles.passwordz}>••••••••</span> */}
            
            </div>
          ))}

          {users.length === 0 && (
            <div className={styles.emptyz}>No users found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
