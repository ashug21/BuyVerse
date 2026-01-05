"use client";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState } from "react";
import styles from "./address.module.css";
import bin from '../../../public/bin.png'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const AddressPage = () => {

  const router = useRouter();

  const { data: session, status } = useSession();


  const [fullname, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPinCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const getAddress = async () => {
    try {
      const res = await fetch("/api/address");
      if (!res.ok) throw new Error("Failed to fetch address");

      const data = await res.json();
      setAddresses(data.address || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  const deleteAddress = async (id) => {
    try {
      const res = await fetch(`/api/address/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message || "Failed to delete address");
        return;
      }

      if (selectedAddress === id) {
        setSelectedAddress(null);
      }

      getAddress();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "loading") return;

    if (!session) {
      toast.error("Please login to add address");
      router.push("/login");
      return;
    }  

    const res = await fetch("/api/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname,
        mobile,
        pincode,
        address1,
        address2,
        city,
        state,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
      return;
    }

    setFullName("");
    setMobile("");
    setPinCode("");
    setAddress1("");
    setAddress2("");
    setCity("");
    setState("");

    getAddress();

    router.push("/paymentmode");
  };

  return (
    <>
      <Navbar />
      <br /><br />

      <div className={styles.pagel}>

        {addresses.length > 0 && (
          <div className={styles.containerl}>
            <h1 className={styles.headingl}>Delivery Address</h1>

            {addresses.map((addr) => (
              <div key={addr._id} className={styles.addressCard}>
                <input
                  type="radio"
                  name="selectedAddress"
                  checked={selectedAddress === addr._id}
                  onChange={() => setSelectedAddress(addr._id)}
                />

                <div className={styles.addressText}>
                  <strong>{addr.fullname}</strong>
                  <p>{addr.address1}, {addr.address2}</p>
                  <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                  <p>Mobile: {addr.mobile}</p>
                </div>

                <img
                  src={bin.src}
                  alt="delete address"
                  className={styles.binIcon}
                  onClick={() => {
                    deleteAddress(addr._id);
                  }}
                />
              </div>
            ))}

            <Link
              href="/paymentmode"
              className={`${styles.useAddressBtn} ${
                !selectedAddress ? styles.disabled : ""
              }`}
              onClick={(e) => {
                if (!selectedAddress) {
                  e.preventDefault();
                  return;
                }
                console.log("Using address:", selectedAddress);
              }}
            >
              Use this address
            </Link>
          </div>
        )}

        <br />

        {/* 🔒 FORM ONLY WHEN NO ADDRESS EXISTS */}
        {addresses.length === 0 && (
          <div className={styles.containerl}>
            <h1 className={styles.headingl}>Add a New Delivery Address</h1>

            <form className={styles.forml} onSubmit={handleSubmit}>
              <div className={styles.fieldl}>
                <label className={styles.labell}>Full name</label>
                <input className={styles.inputl} value={fullname} onChange={(e) => setFullName(e.target.value)} />
              </div>

              <div className={styles.fieldl}>
                <label className={styles.labell}>Mobile number</label>
                <input className={styles.inputl} value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </div>

              <div className={styles.fieldl}>
                <label className={styles.labell}>Pincode</label>
                <input className={styles.inputl} value={pincode} onChange={(e) => setPinCode(e.target.value)} />
              </div>

              <div className={styles.fieldl}>
                <label className={styles.labell}>Flat / House</label>
                <input className={styles.inputl} value={address1} onChange={(e) => setAddress1(e.target.value)} />
              </div>

              <div className={styles.fieldl}>
                <label className={styles.labell}>Area</label>
                <input className={styles.inputl} value={address2} onChange={(e) => setAddress2(e.target.value)} />
              </div>

              <div className={styles.rowl}>
                <input className={styles.inputl} placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                <input className={styles.inputl} placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
              </div>

              <button type="submit" className={styles.submitl}>
                Add address
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default AddressPage;
