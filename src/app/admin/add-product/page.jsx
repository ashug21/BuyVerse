"use client";

import AdminNavbar from '@/components/AdminNavbar/AdminNavbar'
import React, { useState } from 'react'
import styles from './addProduct.module.css'
import { upload } from "@imagekit/next";

const addProduct = () => {
  const [file, setFile] = useState(null);

  const [title,setTitle] = useState("");
  const [stars,setStars] = useState("");
  const [rating,setRating] = useState("");
  const [beforePrice,setBeforePrice] = useState("");
  const [afterPrice,setAfterPrice] = useState("");
  const [category,setCategory] = useState("");
  const [description,setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) {
        alert("Please select an image");
        return;
      }

      const uploadRes = await upload({
        file,
        fileName: file.name,
        folder: "/products",

        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,

        // IMPORTANT FIX (absolute URL)
        authenticationEndpoint: `${window.location.origin}/api/imagekit-auth`,
      });

      const imageUrl = uploadRes.url;

      const res = await fetch("/api/admin/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          stars,
          rating,
          beforePrice,
          afterPrice,
          category,
          description,
          file: imageUrl
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }

      setTitle("");
      setStars("");
      setRating("");
      setBeforePrice("");
      setAfterPrice("");
      setCategory("");
      setDescription("");
      setFile(null);

      alert("Product added successfully");

    } catch (err) {
      console.error(err);
      alert(err?.message || "Upload failed");
    }
  };

  return (
    <div>
      <AdminNavbar />

      <div className={styles.containeraa}>
        <form className={styles.formaa} onSubmit={handleSubmit}>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>Title</label>
            <input className={styles.inputaa} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>Stars</label>
            <input className={styles.inputaa} value={stars} onChange={(e) => setStars(e.target.value)} />
          </div>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>Rating</label>
            <input className={styles.inputaa} value={rating} onChange={(e) => setRating(e.target.value)} />
          </div>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>Before Price</label>
            <input className={styles.inputaa} value={beforePrice} onChange={(e) => setBeforePrice(e.target.value)} />
          </div>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>After Price</label>
            <input className={styles.inputaa} value={afterPrice} onChange={(e) => setAfterPrice(e.target.value)} />
          </div>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>Category</label>
            <select className={styles.selectaa} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Skincare</option>
            </select>
          </div>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>Description</label>
            <textarea className={styles.textareaaa} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>Select Image</label>
            <input
              type="file"
              className={styles.fileaa}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default addProduct;
