"use client";

import AdminNavbar from '@/components/AdminNavbar/AdminNavbar'
import React, { useState } from 'react'
import styles from './addProduct.module.css'
import { upload } from "@imagekit/next";

const addProduct = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [stars, setStars] = useState("");
  const [rating, setRating] = useState("");
  const [beforePrice, setBeforePrice] = useState("");
  const [afterPrice, setAfterPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file) return;
  
    try {
      setLoading(true);
  
      // 1️⃣ Get signed URL from backend
      const res = await fetch("/api/upload");
      const { url, fileName } = await res.json();
  
      // 2️⃣ Upload image directly to S3
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
  
      // 3️⃣ Construct public image URL
      const imageUrl = `https://${process.env.NEXT_PUBLIC_BUCKET}.s3.${process.env.NEXT_PUBLIC_REGION}.amazonaws.com/${fileName}`;
  
      // 4️⃣ Send product data to your backend
      await fetch("/api/admin/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          stars,
          rating,
          beforePrice,
          afterPrice,
          category,
          description,
          image: imageUrl,
        }),
      });
  
      alert("Product added successfully");

      setTitle("");
      setStars("");
      setRating("");
      setBeforePrice("");
      setAfterPrice("");
      setCategory("");
      setDescription("");

  
      setLoading(false);
  
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
   

  

  return (
    <div>
      <AdminNavbar />

      <div className={styles.containeraa}>
        <form className={styles.formaa} onSubmit={handleSubmit}>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>Title</label>
            <input 
              className={styles.inputaa} 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              required 
            />
          </div>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>Stars</label>
            <input 
              className={styles.inputaa} 
              type="number"
              min="1"
              max="5"
              value={stars} 
              onChange={(e) => setStars(e.target.value)}
              required 
            />
          </div>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>Rating</label>
            <input 
              className={styles.inputaa} 
              type="number"
              step="0.1"
              value={rating} 
              onChange={(e) => setRating(e.target.value)}
              required 
            />
          </div>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>Before Price</label>
            <input 
              className={styles.inputaa} 
              type="number"
              step="0.01"
              value={beforePrice} 
              onChange={(e) => setBeforePrice(e.target.value)}
              required 
            />
          </div>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>After Price</label>
            <input 
              className={styles.inputaa} 
              type="number"
              step="0.01"
              value={afterPrice} 
              onChange={(e) => setAfterPrice(e.target.value)}
              required 
            />
          </div>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>Category</label>
            <select 
              className={styles.selectaa} 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Skincare">Skincare</option>
            </select>
          </div>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>Description</label>
            <textarea 
              className={styles.textareaaa} 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              required 
            />
          </div>

          <div className={styles.fieldaa}>
            <label className={styles.labelaa}>Select Image</label>
            <input
              type="file"
              className={styles.fileaa}
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default addProduct;
