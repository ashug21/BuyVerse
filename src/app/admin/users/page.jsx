"use client";
import AdminNavbar from "@/components/AdminNavbar/AdminNavbar";
import React, { useEffect, useState } from "react";
import styles from "./users.module.css";
import bin from "../../../../public/image.png";
import Image from "next/image";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);

  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");


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


  const deleteUser = async(id) => {

    if (!confirm("Are you sure you want to delete this user?")){
      return;
  }

    try {
    const res = await fetch(`/api/admin/users/${id}`, {
      method : "DELETE",
    });

    if(!res.ok){
      console.log("Failed to delete user");
      return;
    }

    toast.success("User deleted from DB");
    getUsers();
      
    } catch (error) {
      console.log(error);
    }
  }


  const addUsertoDB = async(e) => {
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
        throw new Error(data.error || "Signup failed");
      }

      toast.success("User created to DB");

      setName("");
      setEmail("");
      setPassword("");

      getUsers();
    } catch (error) {
      toast.error(error.message);
    } 

   

  }

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

              <img onClick={() => deleteUser(user._id)} src="/image.png" alt="Delete user" className={styles.binz} />
            </div>
          ))}

          {users.length === 0 && (
            <div className={styles.emptyz}>No users found</div>
          )}
        </div>
      </div>

      <br/><br/><br/><br/>

      <h1 className={styles.headinguserz}>Add a user to DB </h1>
     <div className={styles.userFormz}>
       
          <form onSubmit={addUsertoDB}>
            <label>Name</label>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" />

            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" />

            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" />
            <br/>
            <button type="submit">Add to DB</button>
          </form>
      </div>

          <br/><br/><br/><br/>
          <br/><br/><br/><br/>
          <br/><br/><br/><br/>
          <br/><br/><br/><br/>
          <br/><br/><br/><br/>
          <br/><br/><br/><br/>
          <br/><br/><br/><br/>
          <br/><br/><br/><br/>

    </div>
  );
};

export default Users;
