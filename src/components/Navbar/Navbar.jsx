"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import styles from "./Navbar.module.css";
import menuIcon from "../../../public/menus.png";
import { products } from "@/products";

const Navbar = () => {
  const { data: session, status } = useSession();

  
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  function handleSearchBar(e) {
    const value = e.target.value;
    setSearch(value);

    const query = value.trim().toLowerCase();

    if (!query) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(
      (item) =>
        item.name &&
        item.name.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered.slice(0, 6));
  }

  if (status === "loading") return null;

  if (!session) {
    return (
      <>
        <header className={styles.navbara}>
          <div className={styles.navContainera}>
            <div className={styles.lefta}>
              <button
                className={styles.menuButtona}
                onClick={() => setSidebarOpen(true)}
              >
                <Image src={menuIcon} alt="Menu" className={styles.logoImagea} />
              </button>

              <Link href="/" className={styles.logoa}>BuyVerse</Link>

              <nav className={styles.menua}>
                <Link href="/" className={styles.menuItema}>Home</Link>
                <Link href="/electronics" className={styles.menuItema}>Electronics</Link>
                <Link href="/fashion" className={styles.menuItema}>Fashion</Link>
                <Link href="/skincare" className={styles.menuItema}>Skincare</Link>
              </nav>
            </div>

            <div className={styles.centera}>
              <input
                value={search}
                onChange={handleSearchBar}
                type="text"
                placeholder="Search products, brands & more"
                className={styles.searchInputa}
              />

              {filteredProducts.length > 0 && (
                <div className={styles.searchDropdowna}>
                  {filteredProducts.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${item.category.toLowerCase()}/${item.id}`}
                      className={styles.searchCarda}
                      onClick={() => {
                        setSearch("");
                        setFilteredProducts([]);
                      }}
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className={styles.searchImagea}
                      />

                      <div className={styles.searchTexta}>
                        <p className={styles.searchNamea}>{item.name}</p>
                        <p className={styles.searchPricea}>₹{item.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.righta}>
              <Link href="/orders" className={styles.iconWrapa}>
                <span className={styles.iconTexta}>Orders</span>
              </Link>

              <Link href="/cart" className={styles.cartWrapa}>
                <span className={styles.cartTexta}>Cart</span>
              </Link>

              <div className={styles.accountWrapa}>
                <span
                  className={styles.iconTexta}
                  onClick={() => setOpen(!open)}
                >
                  Account ▾
                </span>

                {open && (
                  <div className={styles.accountDropdowna}>
                    <Link href="/signup" className={styles.dropdownItema}>Sign Up</Link>
                    <Link href="/login" className={styles.dropdownItema}>Login</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {sidebarOpen && (
          <>
            <div
              className={styles.overlaya}
              onClick={() => setSidebarOpen(false)}
            />

            <aside className={styles.sidebara}>
              <div className={styles.sidebarHeadera}>
                <span>Menu</span>
                <button
                  className={styles.closeBtna}
                  onClick={() => setSidebarOpen(false)}
                >
                  ✕
                </button>
              </div>

              <nav className={styles.sidebarMenua}>
                <Link href="/" className={styles.sidebarLinka}>Home</Link>
                <Link href="/electronics" className={styles.sidebarLinka}>Electronics</Link>
                <Link href="/fashion" className={styles.sidebarLinka}>Fashion</Link>
                <Link href="/skincare" className={styles.sidebarLinka}>Skincare</Link>
                <Link href="/orders" className={styles.sidebarLinka}>Orders</Link>
                <Link href="/cart" className={styles.sidebarLinka}>Cart</Link>
              </nav>
            </aside>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <header className={styles.navbara}>
        <div className={styles.navContainera}>
          <div className={styles.lefta}>
            <button
              className={styles.menuButtona}
              onClick={() => setSidebarOpen(true)}
            >
              <Image src={menuIcon} alt="Menu" className={styles.logoImagea} />
            </button>

            <Link href="/" className={styles.logoa}>BuyVerse</Link>

            <nav className={styles.menua}>
              <Link href="/" className={styles.menuItema}>Home</Link>
              <Link href="/electronics" className={styles.menuItema}>Electronics</Link>
              <Link href="/fashion" className={styles.menuItema}>Fashion</Link>
              <Link href="/skincare" className={styles.menuItema}>Skincare</Link>
            </nav>
          </div>

          <div className={styles.centera}>
            <input
              value={search}
              onChange={handleSearchBar}
              type="text"
              placeholder="Search products, brands & more"
              className={styles.searchInputa}
            />

            {filteredProducts.length > 0 && (
              <div className={styles.searchDropdowna}>
                {filteredProducts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/${item.category.toLowerCase()}/${item.id}`}
                    className={styles.searchCarda}
                    onClick={() => {
                      setSearch("");
                      setFilteredProducts([]);
                    }}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className={styles.searchImagea}
                    />

                    <div className={styles.searchTexta}>
                      <p className={styles.searchNamea}>{item.name}</p>
                      <p className={styles.searchPricea}>₹{item.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className={styles.righta}>
            <Link href="/orders" className={styles.iconWrapa}>
              <span className={styles.iconTexta}>Orders</span>
            </Link>

            <Link href="/cart" className={styles.cartWrapa}>
              <span className={styles.cartTexta}>Cart</span>
            </Link>

            <div className={styles.accountWrapa}>
              <span
                className={styles.iconTexta}
                onClick={() => setOpen(!open)}
              >
                {session.user.name} ▾
              </span>

              {open && (
                <div className={styles.accountDropdowna}>
                  <button
                    onClick={() => signOut()}
                    className={styles.dropdownItema}
                  >
                    LogOut
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {sidebarOpen && (
        <>
          <div
            className={styles.overlaya}
            onClick={() => setSidebarOpen(false)}
          />

          <aside className={styles.sidebara}>
            <div className={styles.sidebarHeadera}>
              <span>Menu</span>
              <button
                className={styles.closeBtna}
                onClick={() => setSidebarOpen(false)}
              >
                ✕
              </button>
            </div>

            <nav className={styles.sidebarMenua}>
              <Link href="/" className={styles.sidebarLinka}>Home</Link>
              <Link href="/electronics" className={styles.sidebarLinka}>Electronics</Link>
              <Link href="/fashion" className={styles.sidebarLinka}>Fashion</Link>
              <Link href="/skincare" className={styles.sidebarLinka}>Skincare</Link>
              <Link href="/orders" className={styles.sidebarLinka}>Orders</Link>
              <Link href="/cart" className={styles.sidebarLinka}>Cart</Link>
            </nav>
          </aside>
        </>
      )}
    </>
  );
};

export default Navbar;
