import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function Swiggy() {
    const [search, setSearch] = useState("");
    const [email, setEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [cart, setCart] = useState([]);

    const cities = [
        "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad",
        "Chennai", "Kolkata", "Pune", "Jaipur", "Chandigarh", 
        "Lucknow", "Indore", "Surat", "Bhopal", "Nagpur"
    ];

    const optionCards = [
        {
            title: "Order Online",
            desc: "Stay in and order to your doorstep",
            img: "/images/We Deliver.jpg?q=80&w=1600&auto=format&fit=crop",
        },
        {
            title: "Dining",
            desc: "Explore curated places to eat out",
            img: "/images/outeating.jpg?q=80&w=1600&auto=format&fit=crop",
        },
        {
            title: "Nightlife & Clubs",
            desc: "Discover the city's nightlife",
            img: "/images/NIGHT.jpg?q=80&w=1600&auto=format&fit=crop",
        },
    ];

    const collections = [
        { title: "Trending This Week", count: 30, img: "/images/20.jpg" },
        { title: "Best of India", count: 50, img: "/images/30.jpg" },
        { title: "Newly Opened Spots", count: 25, img: "/images/40.jpg" },
        { title: "Great Cafés", count: 40, img: "/images/50.jpg" },
    ];

    const menuData = [
        { id: 1, name: "Pizza Margherita", price: 250, img: "/images/Pizza Margherita.jpg" },
        { id: 2, name: "Veg Burger", price: 150, img: "/images/vegan-hamburger.jpg" },
        { id: 3, name: "Pasta Alfredo", price: 300, img: "/images/alfredo pasta.jpg" },
        { id: 4, name: "Paneer Tikka", price: 220, img: "/images/panner tikka.jpg" }
    ];

    const addToCart = (item) => setCart((prev) => [...prev, item]);
    const removeFromCart = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx));
    const total = cart.reduce((sum, i) => sum + i.price, 0);

    const handleFakeSubmit = (e) => {
        e.preventDefault();
        alert(`This is a demo UI — no backend hooked up yet.\nsearch: ${search}`);
    };

    const handleAppLink = (e) => {
        e.preventDefault();
        if (!email) return alert("Please enter email or phone");
        alert("App link would be sent to: " + email);
        setEmail("");
    };

    const handleLogin = () => setLoggedIn(true);
    const handleLogout = () => { setLoggedIn(false); setCart([]); };
    const handleCheckout = () => {
        if (cart.length === 0) return alert("Cart is empty");
        alert(`Checkout — Total: ₹${total}`);
        setCart([]);
    };
    const navigate = useNavigate();
    const handleTakeOrder = () => {
        navigate("/order");
    };

    return (
        <div className="page">
            {/* NAVBAR */}
            <nav className="nav">
                <div className="navLeft">
                    <div className="logo">swiggy</div>
                    <div className="navCity">India</div>
                </div>
                <div className="navRight">
                    {!loggedIn ? (
                        <button className="navBtn" onClick={handleLogin}>Order</button>
                    ) : (
                        <>
                            <button className="navBtn" onClick={handleLogout}>Cancel</button>
                            <button className="navBtn" onClick={handleTakeOrder}>
                                🛒 Take Order ({cart.length})
                            </button>
                            <button className="navBtn checkoutBtn" onClick={handleCheckout}>Checkout ₹{total}</button>
                        </>
                    )}
                </div>
            </nav>

            {/* HERO SECTION */}
            <header className="hero">
                <div className="heroOverlay" />
                <div className="heroContent">
                    <div className="heroBrand">swiggy</div>
                    <h2 className="heroTag">Discover the best food & drinks in India</h2>
                    <form onSubmit={handleFakeSubmit} className="searchBar">
                        <span className="searchIcon">🔍</span>
                        <input
                            className="searchInput"
                            placeholder="Search for restaurants, cuisine or a dish (demo)"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="searchBtn" type="submit">Search</button>
                    </form>
                </div>
            </header>

            {/* MENU */}
            {loggedIn && (
                <section className="section">
                    <h2 className="h2">Menu</h2>
                    <div className="grid3">
                        {menuData.map((food) => (
                            <div key={food.id} className="collectionCard">
                                <img src={food.img} alt={food.name} className="menuImg" />
                                <div className="menuInfo">
                                    <div>
                                        <div className="menuName">{food.name}</div>
                                        <div className="menuPrice">₹{food.price}</div>
                                    </div>
                                    <button className="menuBtn" onClick={() => addToCart(food)}>Add</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* OPTIONS */}
            <section className="section">
                <div className="grid3">
                    {optionCards.map((c) => (
                        <div key={c.title} className="cardWrap">
                            <div className="optionCard" style={{ backgroundImage: `url(${c.img})` }}>
                                <div className="cardShade" />
                                <div className="optionInfo">
                                    <h3 className="cardTitle">{c.title}</h3>
                                    <p className="cardDesc">{c.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* COLLECTIONS */}
            <section className="section">
                <h2 className="h2">Collections</h2>
                <p className="subtle">Explore curated lists of top places around you</p>
                <div className="grid4">
                    {collections.map((col, index) => (
                        <div key={col.title} className="collectionCard">
                            {index === 0 && <div className="collectionImg1" />}
                            {index === 1 && <div className="collectionImg2" />}
                            {index === 2 && <div className="collectionImg3" />}
                            {index === 3 && <div className="collectionImg4" />}
                            <div className="collectionText">
                                <span>{col.title}</span>
                                <span className="collectionCount">{col.count} Places →</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CITIES */}
            <section className="section">
                <h2 className="h2">Popular localities in India</h2>
                <div className="cityGrid">
                    {cities.map((city) => <button key={city} className="cityBtn">{city}</button>)}
                </div>
            </section>

            {/* APP SECTION */}
            <section className="section appSection">
                <div className="appInner">
                    <div>
                        <h2 className="h2">Get the Swiggy app</h2>
                        <p className="subtle">We will send you a link, open it on your phone to download the app</p>
                        <form onSubmit={handleAppLink} className="appForm">
                            <input
                                className="appInput"
                                placeholder="Email or phone"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className="appBtn">Share App Link</button>
                        </form>
                        <div className="storeBadges">
                            <img alt="play" className="storeBadge" src="/images/Googlepaly.png" />
                            <img alt="app" className="storeBadge" src="/images/app-store.svg" />
                        </div>
                    </div>
                    <div>
                        <img alt="phone preview" className="phoneMock" src="/images/varityfood.jpg?q=80&w=1200&auto=format&fit=crop" />
                    </div>
                </div>
            </section>

            {/* CART */}
            {loggedIn && (
                <section className="section" style={{ maxWidth: 800 }}>
                    <h2 className="h2">🛒 Cart</h2>
                    {cart.length === 0 ? <p>Your cart is empty</p> :
                        <div>
                            {cart.map((item, idx) => (
                                <div key={idx} className="cartItem">
                                    <div>
                                        <div className="menuName">{item.name}</div>
                                        <div className="menuPrice">₹{item.price}</div>
                                    </div>
                                    <div className="cartActions">
                                        <div>Qty 1</div>
                                        <button className="removeBtn" onClick={() => removeFromCart(idx)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                            <div className="cartTotal">
                                <div>Total</div>
                                <div>₹{total}</div>
                            </div>
                            <button className="checkoutBtn" onClick={handleCheckout}>Checkout</button>
                        </div>
                    }
                </section>
            )}

            {/* FOOTER */}
            <footer className="footer">
                <div className="footerTop">
                    <div className="logo">swiggy</div>
                    <div>
                        <select className="select" defaultValue="India">
                            <option>India</option>
                            <option>UAE</option>
                            <option>USA</option>
                        </select>
                        <select className="select" defaultValue="English">
                            <option>English</option>
                            <option>Hindi</option>
                        </select>
                    </div>
                </div>
                <div className="footerCols">
                    {[
                        { head: "About Swiggy", items: ["Who We Are", "Blog", "Work With Us", "Investor Relations"] },
                        { head: "Swiggy Services", items: ["Swiggy", "Instamart", "Feeding India", "Hyperpure"] },
                        { head: "For Restaurants", items: ["Partner With Us", "Apps For You"] },
                        { head: "Learn More", items: ["Privacy", "Security", "Terms", "Sitemap"] },
                    ].map((col) => (
                        <div key={col.head}>
                            <h4 className="footerHead">{col.head}</h4>
                            <ul className="footerList">
                                {col.items.map((it) => <li key={it} className="footerItem">{it}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="copy">© {new Date().getFullYear()} Demo Swiggy Clone — UI only</div>
            </footer>
        </div>
    );
}
