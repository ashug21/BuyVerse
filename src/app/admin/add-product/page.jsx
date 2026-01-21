import AdminNavbar from '@/components/AdminNavbar/AdminNavbar'
import React from 'react'
import styles from './addProduct.module.css'

const addProduct = () => {
  return (
    <div>
      <AdminNavbar />


<div className={styles.containeraa}>
      

      <form className={styles.formaa}>
        <div className={styles.fieldaa}>
          <label className={styles.labelaa}>Title</label>
          <input className={styles.inputaa} type="text" placeholder="Enter Title of Product" />
        </div>

        <div className={styles.fieldaa}>
          <label className={styles.labelaa}>Stars</label>
          <input className={styles.inputaa} type="text" placeholder="Enter Stars out of 5" />
        </div>

        <div className={styles.fieldaa}>
          <label className={styles.labelaa}>Rating</label>
          <input className={styles.inputaa} type="text" placeholder="Enter no of Ratings" />
        </div>

        <div className={styles.fieldaa}>
          <label className={styles.labelaa}>Before Price</label>
          <input className={styles.inputaa} type="text" placeholder="Enter Before Price" />
        </div>

        <div className={styles.fieldaa}>
          <label className={styles.labelaa}>After Price</label>
          <input className={styles.inputaa} type="text" placeholder="Enter After Price" />
        </div>

        <div className={styles.fieldaa}>
          <label className={styles.labelaa}>Category</label>
          <select className={styles.selectaa}>
            <option value="">Select Category</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Skincare</option>
          </select>
        </div>

        <div className={styles.fieldaa}>
          <label className={styles.labelaa}>Description</label>
          <textarea className={styles.textareaaa} placeholder="Enter Description of Product"></textarea>
        </div>

        <div className={styles.fieldaa}>
          <label className={styles.labelaa}>Select Images</label>
          <input className={styles.fileaa} type="file" />
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>

    </div>
    
  )
}

export default addProduct
