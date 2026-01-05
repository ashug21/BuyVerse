"use client";

import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./orders.module.css";
import { products } from "@/products";

const Orders = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);


  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.replace("/login");
    }
  }, [status, session, router]);


  useEffect(() => {
    getOrders();
    getAddress();
  }, []);

  const getOrders = async () => {
    try {
      const res = await fetch("/api/order");
      const data = await res.json();
      setOrders(data.order || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAddress = async () => {
    try {
      const res = await fetch("/api/address");
      const data = await res.json();
      setAddresses(data.address || []);
      setSelectedAddress(data.address?.[0] || null);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductImage = (title) => {
    const matchedProduct = products.find((product) =>
      title.toLowerCase().includes(product.name.toLowerCase())
    );
    return matchedProduct?.images?.[0] || "/placeholder/product.png";
  };

  // ✅ EARLY RETURN ONLY AFTER ALL HOOKS
  if (status === "loading") return null;

  return (
    <div>
      <Navbar />

      <div className={styles.pagem}>
        <h1 className={styles.headingm}>Your Orders</h1>

        {loading && <p className={styles.infom}>Loading orders...</p>}

        {!loading && orders.length === 0 && (
          <p className={styles.infom}>You have no orders yet</p>
        )}

        <div className={styles.ordersWrapm}>
          {orders.map((order) => (
            <div key={order._id} className={styles.orderm}>
              <div className={styles.orderHeaderm}>
                <div>
                  <p className={styles.labelm}>ORDER PLACED</p>
                  <p>{new Date(order.createdAt).toDateString()}</p>
                </div>

                <div>
                  <p className={styles.labelm}>TOTAL</p>
                  <p>₹ {order.total}</p>
                </div>

                <div>
                  <p className={styles.labelm}>PAYMENT</p>
                  <p className={styles.paymentModem}>
                    {order.paymentMethod || "N/A"}
                  </p>
                </div>

                <div>
                  <p className={styles.labelm}>ORDER ID</p>
                  <p className={styles.orderIdm}>{order._id}</p>
                </div>

                <div className={styles.statusm}>
  {order.paymentStatus || "Pending"}
</div>

              </div>

              <div className={styles.orderBodym}>
                <img
                  src={getProductImage(order.title)}
                  alt="product"
                  className={styles.productImgm}
                />

                <div className={styles.detailsm}>
                  <p className={styles.titlem}>{order.title}</p>

                  <div className={styles.breakdownm}>
                    <span>Items Total</span>
                    <span>₹ {order.itemsTotal}</span>
                  </div>

                  <div className={styles.breakdownm}>
                    <span>Delivery</span>
                    <span>
                      {order.delivery === 0
                        ? "Free Delivery"
                        : `₹ ${order.delivery}`}
                    </span>
                  </div>

                  <div className={styles.breakdownm}>
                    <span>Payment Method</span>
                    <span className={styles.paymentModem}>
                      {order.paymentMethod || "N/A"}
                    </span>
                  </div>

                  <div className={styles.breakdownm}>
                    <span>Order Total</span>
                    <span className={styles.totalm}>₹ {order.total}</span>
                  </div>

                  {selectedAddress && (
                    <div className={styles.addressBoxm}>
                      <p className={styles.addressTitlem}>Delivery Address</p>
                      <p className={styles.addressNamem}>
                        {selectedAddress.fullname}
                      </p>
                      <p>
                        {selectedAddress.address1}
                        {selectedAddress.address2 &&
                          `, ${selectedAddress.address2}`}
                      </p>
                      <p>
                        {selectedAddress.city}, {selectedAddress.state} -{" "}
                        {selectedAddress.pincode}
                      </p>
                      <p className={styles.addressPhonem}>
                        Phone: {selectedAddress.mobile}
                      </p>
                    </div>
                  )}

                  <button className={styles.viewBtnm}>
                    View Order Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
