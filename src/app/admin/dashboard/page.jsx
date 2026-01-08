"use client"

import AdminNavbar from '@/components/AdminNavbar/AdminNavbar'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


const AdminDashboard = () => {

  const router = useRouter();

useEffect(() => {
  if(!localStorage.getItem("admin")){
    router.replace("/admin");
  }
})

  return (
    <div>
        <AdminNavbar/>
      <h1>Admin Dashboard Page</h1>
    </div>
  )
}

export default AdminDashboard
