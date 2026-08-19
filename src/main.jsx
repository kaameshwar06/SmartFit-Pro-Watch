import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, ShoppingBag, Heart, Menu, X, Star, ArrowRight, ChevronDown } from 'lucide-react';
import './styles.css';

const products = [
  { id: 1, name: 'SmartFit Pro X1', category: 'Fitness', price: 8999, old: 10999, rating: 4.8, color: 'Midnight', image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=900&q=85', badge: 'BESTSELLER' },
  { id: 2, name: 'SmartFit Pro Active', category: 'Sport', price: 6499, old: 7999, rating: 4.7, color: 'Silver', image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=900&q=85', badge: 'NEW' },
  { id: 3, name: 'SmartFit Pro Elite', category: 'Premium', price: 12999, old: 15999, rating: 4.9, color: 'Graphite', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85', badge: 'PREMIUM' },
  { id: 4, name: 'SmartFit Pro Mini', category: 'Everyday', price: 4999, old: 5999, rating: 4.6, color: 'Rose', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=85', badge: 'SALE' },
  { id: 5, name: 'SmartFit Pro Ultra', category: 'Outdoor', price: 9999, old: 11999, rating: 4.8, color: 'Black', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=85', badge: 'POPULAR' },
  { id: 6, name: 'SmartFit Pro Classic', category: 'Everyday', price: 5799, old: 6999, rating: 4.7, color: 'Steel', image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=900&q=85', badge: 'LIMITED' }
];

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [menu, setMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const filtered = useMemo(() => products.filter(p =>
    (category === 'All' || p.category === category) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  ), [category, query]);

  const addToCart = (product) => setCart(c => [...c, product]);
  const toggleWish = (id) => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return <div className="app">
    <div className="topbar">Free shipping on orders over ₹5,000 <span>•</span> 7-day easy returns</div>
    <header className="header">
      <button className="icon mobile-menu" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
      <a className="logo" href="#home">SMART<span>FIT</span><small>PRO</small></a>
      <nav className={menu ? 'nav open' : 'nav'}>
        {['Home','Watches','Collections','About'].map((item, i) => <a key={item} href={i === 0 ? '#home' : '#products'} onClick={() => setMenu(false)}>{item}</a>)}
      </nav>
      <div className="actions">
        <div className="search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search watches..."/></div>
        <button className="icon" onClick={() => setShowCart(true)}><ShoppingBag/><b>{cart.length}</b></button>
      </div>
    </header>

    <main>
      <section id="home" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">SMART TECHNOLOGY. TIMELESS DESIGN.</p>
          <h1>Time moves.<br/><em>You move better.</em></h1>
          <p className="hero-text">Meet SmartFit Pro — intelligent watches designed for your workouts, workdays and everything in between.</p>
          <div className="hero-buttons"><a href="#products" className="btn primary">Shop watches <ArrowRight size={18}/></a><a href="#features" className="btn ghost">Explore features</a></div>
          <div className="hero-proof"><div><strong>4.8/5</strong><span><Star size={13} fill="currentColor"/> 2,000+ reviews</span></div><div><strong>7 days</strong><span>Battery life</span></div><div><strong>1 year</strong><span>Warranty</span></div></div>
        </div>
        <div className="hero-watch"><div className="glow"></div><img src={products[0].image} alt="SmartFit Pro X1 smartwatch"/><div className="floating-card"><span>HEART RATE</span><strong>72 <small>BPM</small></strong><div className="pulse"></div></div></div>
      </section>

      <section id="features" className="features">
        <div><span>01</span><h3>Health tracking</h3><p>24/7 heart rate, SpO₂, sleep and activity monitoring.</p></div>
        <div><span>02</span><h3>Built for movement</h3><p>100+ workout modes with GPS and performance insights.</p></div>
        <div><span>03</span><h3>All-day battery</h3><p>Up to 7 days of power so your routine never stops.</p></div>
        <div><span>04</span><h3>IP68 water resistant</h3><p>Swim, shower and train without worrying about water.</p></div>
      </section>

      <section id="products" className="products-section">
        <div className="section-head"><div><p className="eyebrow">THE COLLECTION</p><h2>Find your perfect watch.</h2></div><div className="filters">{['All','Fitness','Sport','Premium','Everyday','Outdoor'].map(c => <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div></div>
        <div className="grid">{filtered.map(p => <article className="product" key={p.id}>
          <div className="product-image"><span className="badge">{p.badge}</span><button className="wish" onClick={() => toggleWish(p.id)}><Heart size={19} fill={wishlist.includes(p.id) ? 'currentColor' : 'none'}/></button><img src={p.image} alt={p.name}/><button className="quick" onClick={() => addToCart(p)}>Add to cart <ArrowRight size={16}/></button></div>
          <div className="product-info"><div><h3>{p.name}</h3><p>{p.color} · {p.category}</p></div><div className="rating"><Star size={14} fill="currentColor"/> {p.rating}</div></div>
          <div className="price"><strong>₹{p.price.toLocaleString('en-IN')}</strong><del>₹{p.old.toLocaleString('en-IN')}</del></div>
        </article>)}</div>
        {!filtered.length && <div className="empty">No watches found. Try another search.</div>}
      </section>

      <section className="feature-banner"><div><p className="eyebrow">SMARTFIT PRO X1</p><h2>Your health.<br/>At a glance.</h2><p>AMOLED display. Advanced sensors. GPS. Sleep tracking. Designed to give you a clearer picture of your day.</p><a href="#products" className="btn light">Explore X1 <ArrowRight size={18}/></a></div><img src={products[2].image} alt="Premium SmartFit Pro watch"/></section>

      <section className="newsletter"><p className="eyebrow">STAY IN THE LOOP</p><h2>Get smarter about your time.</h2><p>New launches, exclusive offers and useful fitness tips — straight to your inbox.</p><form onSubmit={e => {e.preventDefault(); alert('Thanks for subscribing to SmartFit Pro!')}}><input type="email" required placeholder="Your email address"/><button>Subscribe <ArrowRight size={17}/></button></form></section>
    </main>

    <footer><div className="footer-brand"><a className="logo" href="#home">SMART<span>FIT</span><small>PRO</small></a><p>Smart technology for every move.</p></div><div><h4>Shop</h4><a href="#products">All watches</a><a href="#products">Fitness</a><a href="#products">Premium</a></div><div><h4>Support</h4><a href="#home">Contact</a><a href="#home">Shipping</a><a href="#home">Returns</a></div><div><h4>Follow</h4><a href="#home">Instagram</a><a href="#home">LinkedIn</a><a href="#home">Twitter</a></div><p className="copyright">© 2026 SmartFit Pro. Built for better days.</p></footer>

    {showCart && <div className="overlay" onClick={() => setShowCart(false)}><aside className="cart" onClick={e => e.stopPropagation()}><div className="cart-head"><h2>Your bag ({cart.length})</h2><button className="icon" onClick={() => setShowCart(false)}><X/></button></div>{cart.length ? <><div className="cart-items">{cart.map((p,i) => <div className="cart-item" key={`${p.id}-${i}`}><img src={p.image}/><div><h4>{p.name}</h4><p>₹{p.price.toLocaleString('en-IN')}</p></div></div>)}</div><div className="cart-total"><span>Total</span><strong>₹{total.toLocaleString('en-IN')}</strong></div><button className="checkout">Checkout <ArrowRight size={18}/></button></> : <div className="cart-empty"><ShoppingBag size={40}/><p>Your bag is waiting for something smart.</p><button className="btn primary" onClick={() => setShowCart(false)}>Continue shopping</button></div>}</aside></div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
