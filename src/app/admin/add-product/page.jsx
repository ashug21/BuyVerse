import AdminNavbar from '@/components/AdminNavbar/AdminNavbar'
import React from 'react'
import './addProduct.module.css'

const addProduct = () => {
  return (
    <div>
      <AdminNavbar/>

      <form>
        <br/> 
        <label>Title : </label>

        <input type='text' placeholder='Enter Title of Product' />
        <label>Stars : </label>

        <input type='text' placeholder='Enter Stars out of 5' />
        <label>Rating : </label>

        <input type='text' placeholder='Enter no of Rating of Product' />

        <label>BeforePrice : </label>
        <input type='text' placeholder='Enter before Price of Product' />
        <label>AfterPrice : </label>
        <input type='text' placeholder='Enter After price of Product' />


        <label className="label7">Category</label>
      <select >
      <option value="">Select Category</option>
        <option defaultValue>Electronics</option>
        <option>Fashion</option>
        <option>Skincare</option>
      </select>
     

        <label>Description : </label>
        <textarea type="text" placeholder='Enter Description of Product'></textarea>

            <label>Select Images : </label>
        <br/>
        <input type='file' placeholder='Enter Title of Product' />
      </form>
    </div>
  )
}

export default addProduct
