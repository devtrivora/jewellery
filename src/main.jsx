import React, {useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import {Search, ShoppingBag, UserRound, Heart, X, Plus, Minus, ArrowRight, Sparkles, Menu, ChevronDown, CreditCard} from "lucide-react";
import "./styles.css";

const IMG = {
  hero: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=85",
  ring: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
  necklace: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
  earrings: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
  bracelet: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=85",
  gold: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=85",
  model: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1100&q=85"
};

const products = [
  {id:1,name:"Solitaire Élan Ring",category:"Rings",price:1890,image:IMG.ring,tag:"Bestseller",desc:"A refined solitaire silhouette designed around a brilliant-cut stone."},
  {id:2,name:"Aurelia Chain",category:"Necklaces",price:1240,image:IMG.necklace,tag:"New",desc:"A delicate gold chain with a polished, light-catching finish."},
  {id:3,name:"Étoile Drop Earrings",category:"Earrings",price:980,image:IMG.earrings,tag:"Signature",desc:"Elegant drops that bring a subtle sparkle to evening looks."},
  {id:4,name:"Luna Tennis Bracelet",category:"Bracelets",price:1450,image:IMG.bracelet,tag:"Limited",desc:"A streamlined row of stones set for effortless everyday luxury."},
  {id:5,name:"Seraphine Gold Ring",category:"Rings",price:1120,image:IMG.gold,tag:"New",desc:"Sculptural gold curves with a contemporary, understated profile."},
  {id:6,name:"Celeste Pendant",category:"Necklaces",price:860,image:IMG.necklace,tag:"Bestseller",desc:"A fine pendant made for layering or wearing beautifully alone."},
  {id:7,name:"Nocturne Hoops",category:"Earrings",price:720,image:IMG.earrings,tag:"Classic",desc:"Minimal hoops with a softly sculpted, high-polish surface."},
  {id:8,name:"Aster Cuff",category:"Bracelets",price:1090,image:IMG.bracelet,tag:"Signature",desc:"A modern open cuff with a balanced, architectural shape."}
];

function App(){
  const [category,setCategory]=useState("All");
  const [search,setSearch]=useState("");
  const [cart,setCart]=useState([]);
  const [wishlist,setWishlist]=useState([]);
  const [drawer,setDrawer]=useState(null);
  const [selected,setSelected]=useState(null);
  const [menu,setMenu]=useState(false);
  const [notice,setNotice]=useState("");

  const filtered=useMemo(()=>products.filter(p=>
    (category==="All"||p.category===category) &&
    `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase())
  ),[category,search]);

  const add=(p)=>{
    setCart(c=>{
      const found=c.find(x=>x.id===p.id);
      return found?c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x):[...c,{...p,qty:1}]
    });
    setNotice("Added to your bag");
    setTimeout(()=>setNotice(""),1800);
  };
  const change=(id,delta)=>setCart(c=>c.map(x=>x.id===id?{...x,qty:Math.max(1,x.qty+delta)}:x));
  const remove=(id)=>setCart(c=>c.filter(x=>x.id!==id));
  const total=cart.reduce((s,x)=>s+x.price*x.qty,0);

  return <div className="app">
    <div className="announcement">Complimentary shipping on orders over $500 · Discover the new collection</div>
    <header className="header">
      <button className="icon mobile-only" onClick={()=>setMenu(!menu)}><Menu size={20}/></button>
      <a className="brand" href="#" onClick={()=>{setCategory("All");setSearch("")}}>LUMIÈRE<span>JEWELLERY</span></a>
      <nav className={menu?"nav open":"nav"}>
        {["All","Rings","Necklaces","Earrings","Bracelets"].map(c=>
          <button key={c} className={category===c?"active":""} onClick={()=>{setCategory(c);setMenu(false)}}>{c}</button>
        )}
      </nav>
      <div className="header-actions">
        <button className="icon" onClick={()=>setDrawer("search")}><Search size={19}/></button>
        <button className="icon desktop-only" onClick={()=>setDrawer("profile")}><UserRound size={19}/></button>
        <button className="icon" onClick={()=>setDrawer("wishlist")}><Heart size={19}/><b>{wishlist.length||""}</b></button>
        <button className="icon bag" onClick={()=>setDrawer("cart")}><ShoppingBag size={19}/><b>{cart.reduce((s,x)=>s+x.qty,0)||""}</b></button>
      </div>
    </header>

    <main>
      <section className="hero">
        <img src={IMG.hero} alt="Fine jewellery"/>
        <div className="hero-overlay"/>
        <div className="hero-copy">
          <p className="eyebrow">THE NEW CHAPTER · 2026</p>
          <h1>Jewellery with<br/><i>a quiet presence.</i></h1>
          <p>Designed to be worn, remembered, and passed on.</p>
          <button className="btn light" onClick={()=>document.getElementById("collection").scrollIntoView({behavior:"smooth"})}>Explore collection <ArrowRight size={16}/></button>
        </div>
      </section>

      <section className="intro">
        <div><p className="eyebrow">OUR PHILOSOPHY</p><h2>Less, but more<br/><i>meaningful.</i></h2></div>
        <p className="intro-copy">LUMIÈRE creates modern heirlooms with clean silhouettes, luminous materials and an uncompromising eye for detail. Every piece is designed to live beyond a single season.</p>
      </section>

      <section className="categories">
        {[
          ["Rings",IMG.ring],["Necklaces",IMG.necklace],["Earrings",IMG.earrings],["Bracelets",IMG.bracelet]
        ].map(([c,img])=><button className="cat" key={c} onClick={()=>{setCategory(c);document.getElementById("collection").scrollIntoView({behavior:"smooth"})}}>
          <img src={img} alt={c}/><span>{c}</span><ArrowRight size={16}/>
        </button>)}
      </section>

      <section className="collection" id="collection">
        <div className="section-head"><div><p className="eyebrow">CURATED FOR YOU</p><h2>The collection</h2></div><span>{filtered.length} pieces</span></div>
        <div className="toolbar">
          <div className="pills">{["All","Rings","Necklaces","Earrings","Bracelets"].map(c=><button className={category===c?"selected":""} key={c} onClick={()=>setCategory(c)}>{c}</button>)}</div>
          <div className="sort">Featured <ChevronDown size={15}/></div>
        </div>
        <div className="grid">
          {filtered.map(p=><article className="product" key={p.id}>
            <div className="product-image" onClick={()=>setSelected(p)}>
              <img src={p.image} alt={p.name}/><span>{p.tag}</span>
              <button className="wish" onClick={(e)=>{e.stopPropagation();setWishlist(w=>w.includes(p.id)?w.filter(x=>x!==p.id):[...w,p.id])}}><Heart size={18} fill={wishlist.includes(p.id)?"currentColor":"none"}/></button>
              <button className="quick" onClick={(e)=>{e.stopPropagation();add(p)}}>Add to bag</button>
            </div>
            <div className="product-meta"><div><h3>{p.name}</h3><p>{p.category}</p></div><strong>${p.price.toLocaleString()}</strong></div>
          </article>)}
        </div>
      </section>

      <section className="story">
        <div className="story-image"><img src={IMG.model} alt="Lumiere jewellery"/></div>
        <div className="story-copy"><p className="eyebrow">THE LUMIÈRE STANDARD</p><h2>Made slowly.<br/><i>Worn forever.</i></h2><p>From the first sketch to the final polish, our pieces are considered from every angle. We believe luxury should feel effortless — never excessive.</p><button className="text-btn">Discover our story <ArrowRight size={16}/></button></div>
      </section>

      <section className="newsletter"><p className="eyebrow">A NOTE FROM US</p><h2>Be first to know.</h2><p>New pieces, private appointments and occasional notes from the atelier.</p><div className="email"><input placeholder="Your email address"/><button onClick={()=>setNotice("Thank you — you're on the list.")}>Subscribe <ArrowRight size={15}/></button></div></section>
    </main>

    <footer><div className="brand footer-brand">LUMIÈRE<span>JEWELLERY</span></div><div className="footer-links"><a>Shipping</a><a>Returns</a><a>Care guide</a><a>Contact</a></div><p>© 2026 Lumière Jewellery. Frontend concept.</p></footer>

    {notice&&<div className="toast">{notice}</div>}

    {selected&&<div className="modal-bg" onClick={()=>setSelected(null)}><div className="product-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}><X/></button><img src={selected.image} alt={selected.name}/><div className="modal-info"><p className="eyebrow">{selected.category}</p><h2>{selected.name}</h2><p className="price">${selected.price.toLocaleString()}</p><p>{selected.desc}</p><div className="details"><span>18k recycled gold</span><span>Ethically sourced stones</span><span>Hand-finished</span></div><button className="btn dark" onClick={()=>{add(selected);setSelected(null);setDrawer("cart")}}>Add to bag <ShoppingBag size={16}/></button></div></div></div>}

    {drawer&&<div className="drawer-bg" onClick={()=>setDrawer(null)}><aside className="drawer" onClick={e=>e.stopPropagation()}>
      <div className="drawer-head"><h3>{drawer==="cart"?"Your bag":drawer==="wishlist"?"Wishlist":drawer==="profile"?"Your account":"Search"}</h3><button className="icon" onClick={()=>setDrawer(null)}><X/></button></div>
      {drawer==="search"&&<div className="search-box"><Search size={18}/><input autoFocus placeholder="Search the collection…" value={search} onChange={e=>setSearch(e.target.value)}/></div>}
      {drawer==="profile"&&<div className="profile"><div className="avatar"><UserRound/></div><h2>Welcome back.</h2><p>Sign in to view orders, saved pieces and your profile.</p><button className="btn dark">Sign in</button><button className="outline">Create account</button></div>}
      {drawer==="wishlist"&&<div className="drawer-list">{wishlist.length?wishlist.map(id=>{const p=products.find(x=>x.id===id);return <div className="mini" key={id}><img src={p.image}/><div><h4>{p.name}</h4><p>${p.price.toLocaleString()}</p><button onClick={()=>add(p)}>Add to bag</button></div></div>}):<div className="empty"><Heart/><p>Your saved pieces will appear here.</p></div>}</div>}
      {drawer==="cart"&&<><div className="drawer-list">{cart.length?cart.map(x=><div className="mini" key={x.id}><img src={x.image}/><div><h4>{x.name}</h4><p>${x.price.toLocaleString()}</p><div className="qty"><button onClick={()=>change(x.id,-1)}><Minus size={13}/></button><span>{x.qty}</span><button onClick={()=>change(x.id,1)}><Plus size={13}/></button><button className="remove" onClick={()=>remove(x.id)}>Remove</button></div></div></div>):<div className="empty"><ShoppingBag/><p>Your bag is empty.</p></div>}</div>{cart.length>0&&<div className="checkout"><div><span>Subtotal</span><strong>${total.toLocaleString()}</strong></div><button className="btn dark" onClick={()=>setDrawer("payment")}>Checkout <CreditCard size={16}/></button><small>Demo frontend — no real payment is processed.</small></div>}</>}
      {drawer==="payment"&&<div className="payment"><p className="eyebrow">SECURE CHECKOUT</p><h2>Payment details</h2><label>Cardholder name<input placeholder="Alex Morgan"/></label><label>Card number<input placeholder="4242 4242 4242 4242"/></label><div className="two"><label>Expiry<input placeholder="MM / YY"/></label><label>CVC<input placeholder="123"/></label></div><button className="btn dark" onClick={()=>{setNotice("Demo order placed successfully.");setCart([]);setDrawer(null)}}>Pay ${total.toLocaleString()}</button><small>Frontend simulation only. No card data is sent anywhere.</small></div>}
    </aside></div>}
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);