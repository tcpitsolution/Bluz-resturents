import React, { useEffect, useMemo, useState, useRef } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, MapPin, Menu as MenuIcon, MessageCircle, Minus, Plus, Search, Send, Sparkles, Utensils, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { restaurant, outlets, experiences, menuCategories, demoMenu, faqs } from './data/restaurantConfig.js'

const img = (id, w=1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`
const photos = {
  hero: img('photo-1517248135467-4c7edcad34c4', 2000),
  table: img('photo-1414235077428-338989a2e8c0'),
  food: img('photo-1504674900247-0877df9cc836'),
  candle: img('photo-1511795409834-ef04bbd61622'),
  terrace: img('photo-1533777857889-4be7c70b33f7'),
  interior: img('photo-1559339352-11d035aa65de'),
  dessert: img('photo-1488477181946-6428a0291777'),
  party: img('photo-1464366400600-7168b8af9bc3'),
  ranchhodra: img('photo-1537047902294-62a40c20a6ae'),
}
const wa = (message='Hello Bluez Team, I would like to enquire about a table. Please share the available options.') => `https://wa.me/${restaurant.phoneDigits}?text=${encodeURIComponent(message)}`
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

/* ── Splash Screen ── */
function SplashScreen({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t) }, [])
  return (
    <motion.div
      initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.55 } }}
      style={{ position:'fixed', inset:0, zIndex:9999, background:'var(--navy)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20 }}
    >
      <motion.div initial={{ opacity:0, scale:.82 }} animate={{ opacity:1, scale:1 }} transition={{ duration:.7, ease:'easeOut' }}
        style={{ display:'flex', alignItems:'center', gap:14, fontFamily:'var(--serif)', fontSize:'clamp(2rem,6vw,3.8rem)', color:'white', letterSpacing:'-1px' }}>
        <span style={{ width:56, height:56, border:'1px solid var(--gold)', borderRadius:'50%', display:'grid', placeItems:'center', color:'var(--gold)', fontSize:'2rem', flexShrink:0 }}>
          B<span style={{ fontSize:'0.42em' }}>·</span>
        </span>
        <span>bluez<small style={{ display:'block', fontFamily:'var(--sans)', fontSize:'0.22em', letterSpacing:'2px', marginTop:8, color:'#c7bca9', fontWeight:600 }}>RESTAURANT &amp; TERRACE CAFE</small></span>
      </motion.div>
      <motion.div initial={{ width:0 }} animate={{ width:160 }} transition={{ duration:1.5, ease:'easeInOut', delay:.45 }}
        style={{ height:1, background:'var(--gold)', borderRadius:1 }} />
      <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:.85, duration:.6 }}
        style={{ color:'#a9a09a', fontSize:'0.72rem', letterSpacing:'0.22em', fontFamily:'var(--sans)', fontWeight:600, margin:0 }}>
        AHMEDABAD · GUJARAT
      </motion.p>
    </motion.div>
  )
}

/* ── Scroll Reveal ── */
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return [ref, visible]
}
function Reveal({ children, delay = 0, y = 30, className = '', style = {} }) {
  const [ref, visible] = useReveal()
  return (
    <motion.div ref={ref} className={className} style={style}
      initial={{ opacity:0, y }} animate={visible ? { opacity:1, y:0 } : { opacity:0, y }}
      transition={{ duration:.65, ease:'easeOut', delay }}>
      {children}
    </motion.div>
  )
}

/* ── Safe Image (fallback placeholder) ── */
function Image({ src, alt, className = '' }) {
  const [err, setErr] = useState(false)
  if (err || !src) return (
    <div className={className} style={{ background:'#1a2233', display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%', minHeight:220, color:'#c7a46a', fontSize:11, letterSpacing:'0.12em', fontFamily:'var(--sans)', fontWeight:600 }}>
      BLUEZ
    </div>
  )
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setErr(true)} />
}

/* ── App ── */
function App() {
  const location = useLocation()
  const [splash, setSplash] = useState(true)
  useEffect(() => { scrollTop(); document.title = `${pageTitle(location.pathname)} | Bluez Restaurant — Demo` }, [location.pathname])
  const [chatOpen, setChatOpen] = useState(false)
  return (
    <>
      <AnimatePresence>{splash && <SplashScreen onDone={() => setSplash(false)} />}</AnimatePresence>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/reserve" element={<ReservePage />} />
        <Route path="/experiences" element={<ExperiencesPage />} />
        <Route path="/celebrations" element={<CelebrationsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/locations/cg-road" element={<OutletPage outlet={outlets[0]} />} />
        <Route path="/locations/ranchhodra" element={<OutletPage outlet={outlets[1]} />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<LegalPage type="Privacy Policy" />} />
        <Route path="/terms" element={<LegalPage type="Terms & Conditions" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <a className="float-wa" href={wa()} target="_blank" rel="noreferrer" aria-label="Enquire on WhatsApp">
        <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.738 5.494 2.031 7.807L0 32l8.418-2.007A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.77-1.853l-.486-.29-5.002 1.193 1.215-4.87-.317-.5A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.87c-.398-.199-2.354-1.162-2.72-1.294-.365-.133-.631-.199-.897.199-.266.398-1.03 1.294-1.263 1.56-.232.266-.465.299-.863.1-.398-.2-1.681-.62-3.202-1.977-1.183-1.056-1.982-2.36-2.214-2.758-.232-.398-.025-.613.175-.811.18-.178.398-.465.597-.698.2-.232.266-.398.398-.664.133-.266.067-.498-.033-.697-.1-.2-.897-2.162-1.23-2.96-.323-.778-.651-.672-.897-.685l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.395 1.362-1.395 3.323s1.428 3.854 1.627 4.12c.2.266 2.81 4.29 6.808 6.017.951.41 1.694.655 2.272.839.955.304 1.824.261 2.511.158.766-.114 2.354-.962 2.687-1.891.332-.93.332-1.727.232-1.892-.1-.165-.365-.265-.763-.464z"/></svg>
      </a>
      <Concierge open={chatOpen} setOpen={setChatOpen} />
    </>
  )
}

function pageTitle(path){return({'/':'Home','/menu':'Menu','/reserve':'Reserve a Table','/experiences':'Experiences','/celebrations':'Celebrations','/gallery':'Gallery','/locations':'Locations','/locations/cg-road':'CG Road Outlet','/locations/ranchhodra':'Ranchhodra Outlet','/faq':'Frequently Asked Questions','/contact':'Contact','/privacy-policy':'Privacy Policy','/terms':'Terms & Conditions'})[path]||'Page Not Found'}

function Navbar(){const [open,setOpen]=useState(false);const links=[['Our Story','/#story'],['Menu','/menu'],['Experiences','/experiences'],['Celebrations','/celebrations'],['Gallery','/gallery'],['Locations','/locations'],['Contact','/contact']];return <header className="nav"><Link to="/" className="wordmark" onClick={()=>setOpen(false)}><span className="logo-mark">B<span>·</span></span><span>bluez<small>RESTAURANT &amp; TERRACE CAFE</small></span></Link><nav className={open?'nav-links open':'nav-links'}>{links.map(([t,to])=><Link key={t} to={to} onClick={()=>setOpen(false)}>{t}</Link>)}<Link className="nav-menu" to="/menu" onClick={()=>setOpen(false)}>View Menu <ArrowUpRight size={14}/></Link><Link className="btn btn-gold nav-reserve" to="/reserve" onClick={()=>setOpen(false)}>Reserve a Table <ArrowUpRight size={15}/></Link></nav><button className="mobile-toggle" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<MenuIcon/>}</button></header>}

function Eyebrow({children}){return <div className="eyebrow"><span/>{children}</div>}
function SectionHead({eyebrow,title,copy,light=false}){return <div className={`section-head ${light?'light':''}`}><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>}
function ButtonLink({to='/reserve',children,kind='gold'}){return <Link className={`btn btn-${kind}`} to={to}>{children}<ArrowUpRight size={16}/></Link>}
function LockIcon(){return <span className="lock-icon">●</span>}

function PageHero({eyebrow,title,copy,image=photos.terrace}){
  return <section className="page-hero">
    <Image src={image} alt="Bluez restaurant-inspired ambience" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
    <div className="page-hero-shade"/>
    <motion.div className="page-hero-content" initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.7,ease:'easeOut',delay:.1}}>
      <Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1>{copy&&<p>{copy}</p>}
    </motion.div>
  </section>
}

function OutletCard({outlet,image}){return <article className="location-card"><div className="location-card-img"><Image src={image} alt={`${outlet.name} restaurant atmosphere`}/></div><div className="location-card-content"><span className="eyebrow">AHMEDABAD, GUJARAT</span><h3>{outlet.name}</h3><p><MapPin size={15}/>{outlet.address}</p>{!outlet.verifiedAddress&&<small className="pending">Details awaiting verification</small>}<div className="card-actions"><Link to={`/locations/${outlet.id}`}>Outlet details <ArrowUpRight size={15}/></Link><Link to="/reserve">Enquire <ArrowRight size={15}/></Link></div></div></article>}

function FinalCTA(){return(
  <Reveal>
    <section className="final-cta">
      <div className="cta-orb orb-one"/><div className="cta-orb orb-two"/>
      <Eyebrow>YOUR NEXT GOOD EVENING</Eyebrow>
      <h2>Let's make it<br/><em>one to remember.</em></h2>
      <p>Tell us what you're celebrating — or simply when you'd like to visit.</p>
      <div className="hero-actions"><ButtonLink>Plan Your Visit</ButtonLink><ButtonLink to="/contact" kind="outline">Talk to Bluez</ButtonLink></div>
    </section>
  </Reveal>
)}

/* ── Home ── */
function Home(){return <main>
<section className="hero">
  <Image src={photos.hero} alt="Warm, elegant restaurant interior with intimate dining tables" className="hero-bg"/>
  <div className="hero-shade"/>
  <motion.div className="hero-content" initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:.8,ease:'easeOut',delay:.2}}>
    <Eyebrow>AHMEDABAD · TERRACE DINING · CELEBRATIONS</Eyebrow>
    <h1>Make Every Moment<br/>a Little More <em>Extraordinary.</em></h1>
    <p>Thoughtfully served flavours, intimate candlelight dinners, and memorable celebrations at Bluez.</p>
    <div className="hero-actions"><ButtonLink>Reserve Your Table</ButtonLink><ButtonLink to="/menu" kind="outline">Explore the Menu</ButtonLink></div>
    <Link to="/experiences" className="hero-text-link">Discover our experiences <ArrowRight size={16}/></Link>
  </motion.div>
  <div className="hero-bottom">
    <div className="rating"><span className="google-g">G</span><span><strong>{restaurant.rating}/5 <span className="stars">★★★★★</span></strong><small>{restaurant.reviewCount} reviews · supplied rating</small></span></div>
    <span className="hero-location"><MapPin size={15}/> Ahmedabad, Gujarat</span>
    <a href="#story" className="scroll-cue">SCROLL TO DISCOVER <ArrowDown size={14}/></a>
  </div>
  <div className="hero-index">01 <span/> 04</div>
</section>

<section className="intro section-pad" id="story">
  <Reveal className="intro-images">
    <Image src={photos.table} alt="Thoughtfully set restaurant table" className="intro-main"/>
    <Image src={photos.candle} alt="Celebration table in warm candlelight" className="intro-overlap"/>
    <span className="image-note">AN EVENING, WELL SPENT</span>
  </Reveal>
  <Reveal delay={0.15} className="intro-copy">
    <Eyebrow>THE BLUEZ EXPERIENCE</Eyebrow>
    <h2>Good Food. Beautiful Spaces. <em>Moments Worth Remembering.</em></h2>
    <p className="lead">Some evenings are about more than what's on the plate. They're about the people across the table, the atmosphere around you, and the little details that make a moment yours.</p>
    <p>From relaxed terrace cafe visits to candlelight dinners and celebrations with your favourite people, Bluez is a place to gather, unwind and make time for what matters.</p>
    <div className="signature"><span className="signature-line"/><span>Come for the flavours. Stay for the feeling.</span></div>
    <ButtonLink to="/experiences" kind="dark">Explore the Bluez Experience</ButtonLink>
  </Reveal>
</section>

<section className="experience-band section-pad dark-section">
  <Reveal><SectionHead eyebrow="MADE FOR YOUR MOMENTS" title={<>A setting for every <em>kind of together.</em></>} copy="A little romance, a reason to celebrate, or simply a good meal shared well." light/></Reveal>
  <div className="experience-grid">
    {experiences.slice(0,4).map((e,i)=>(
      <Reveal key={e[0]} delay={i*0.1}>
        <Link to="/experiences" className={`experience-card ec-${i}`}>
          <Image src={e[2]} alt={e[0]}/>
          <div className="experience-overlay"><span>0{i+1} / EXPERIENCE</span><h3>{e[0]}</h3><p>{e[1]}</p><span className="circle-arrow"><ArrowUpRight size={19}/></span></div>
        </Link>
      </Reveal>
    ))}
  </div>
  <div className="center-cta"><ButtonLink to="/experiences" kind="outline">Discover All Experiences</ButtonLink></div>
</section>

<section className="menu-feature section-pad">
  <Reveal className="menu-feature-copy">
    <Eyebrow>A TASTE OF BLUEZ</Eyebrow>
    <h2>Flavours that bring<br/>everyone <em>to the table.</em></h2>
    <p>Explore a menu concept inspired by North Indian favourites, fusion ideas and cafe classics. The items shown here are illustrative demo content, not a verified official menu.</p>
    <ButtonLink to="/menu" kind="dark">Explore Demo Menu</ButtonLink>
    <small className="fine-print">Official dishes, dietary details and prices to be confirmed.</small>
  </Reveal>
  <Reveal delay={0.15} className="food-collage">
    <Image src={photos.food} alt="Colourful shared meal" className="food-large"/>
    <Image src={photos.dessert} alt="Dessert presentation" className="food-small"/>
    <span className="collage-label">GOOD FOOD, GOOD COMPANY</span>
  </Reveal>
</section>

<section className="quote-section">
  <Image src={photos.terrace} alt="Atmospheric evening dining"/>
  <div className="quote-shade"/>
  <Reveal className="quote-inner">
    <span className="quote-mark">"</span>
    <h2>Some moments deserve more than a table. <em>They deserve a memory.</em></h2>
    <ButtonLink>Let's Plan Your Evening</ButtonLink>
  </Reveal>
</section>

<section className="location-preview section-pad">
  <Reveal><div className="location-preview-top">
    <div><Eyebrow>FIND YOUR BLUEZ</Eyebrow><h2>Two addresses.<br/><em>One memorable feeling.</em></h2></div>
    <ButtonLink to="/locations" kind="dark">Explore Locations</ButtonLink>
  </div></Reveal>
  <div className="location-cards">
    <Reveal delay={0}><OutletCard outlet={outlets[0]} image={photos.interior}/></Reveal>
    <Reveal delay={0.12}><OutletCard outlet={outlets[1]} image={photos.ranchhodra}/></Reveal>
  </div>
</section>

<Reveal>
  <section className="review-strip">
    <div className="review-stars">★★★★★</div>
    <div><span className="eyebrow">A COMMUNITY OF SHARED MOMENTS</span><h2>{restaurant.rating} <small>/ 5</small></h2><p>{restaurant.reviewCount} Google reviews · supplied information</p></div>
    <a className="btn btn-outline" href="https://www.google.com/maps/search/?api=1&query=Bluez+Restaurant+Ahmedabad" target="_blank" rel="noreferrer">Read Reviews on Google <ArrowUpRight size={15}/></a>
  </section>
</Reveal>

<FinalCTA/>
</main>}

/* ── Menu Page ── */
function MenuPage(){
  const [category,setCategory]=useState('All'),[query,setQuery]=useState(''),[selected,setSelected]=useState(null)
  const filtered=useMemo(()=>demoMenu.filter(x=>(category==='All'||x.category===category)&&`${x.name} ${x.description} ${x.category}`.toLowerCase().includes(query.toLowerCase())),[category,query])
  return <main>
    <PageHero eyebrow="A TASTE OF BLUEZ" title={<>A menu made for<br/><em>sharing the moment.</em></>} copy="Explore a sample of the kinds of categories that could live on Bluez's digital menu." image={photos.food}/>
    <section className="menu-page section-pad">
      <Reveal><div className="demo-notice"><Sparkles size={18}/><div><strong>Demo Menu — Illustrative Items</strong><span>These sample dishes are for website demonstration only. Official dishes, allergens, dietary labels and prices must be verified with Bluez.</span></div></div></Reveal>
      <Reveal delay={0.1}><div className="menu-controls">
        <div className="category-tabs">{menuCategories.map(c=><button className={category===c?'active':''} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div>
        <label className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search demo menu"/></label>
      </div></Reveal>
      <div className="menu-items">
        {filtered.map((item,i)=>(
          <Reveal key={item.name} delay={i*0.04} y={16}>
            <button className="menu-item" style={{width:'100%'}} onClick={()=>setSelected(item)}>
              <span className="menu-item-number">{String(i+1).padStart(2,'0')}</span>
              <span className="veg-dot"/>
              <span className="menu-item-text"><strong>{item.name}</strong><small>{item.category}</small><p>{item.description}</p></span>
              <span className="menu-item-open"><Plus size={18}/></span>
            </button>
          </Reveal>
        ))}
      </div>
      {filtered.length===0&&<p className="empty-state">No illustrative items match that search. Try another keyword.</p>}
      <Reveal><div className="menu-bottom-note"><Utensils size={20}/><p>Looking for the current official menu? Contact the Bluez team to confirm dishes, prices and dietary options.</p><a href={wa('Hello Bluez Team, could you please share the current official menu?')} target="_blank" rel="noreferrer">Ask on WhatsApp <ArrowUpRight size={15}/></a></div></Reveal>
    </section>
    <AnimatePresence>{selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><motion.div className="menu-modal" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)}><X/></button><Eyebrow>ILLUSTRATIVE DEMO ITEM</Eyebrow><h2>{selected.name}</h2><span className="menu-modal-category">{selected.category}</span><p>{selected.description}</p><p className="fine-print">This is not a verified official menu listing. Please confirm availability and ingredients with the restaurant.</p><ButtonLink to="/contact">Ask About This Item</ButtonLink></motion.div></div>}</AnimatePresence>
  </main>
}

/* ── Reservation Form ── */
function ReservationForm({eventMode=false}){const [form,setForm]=useState({outlet:'cg-road',guests:'2',date:'',time:'',occasion:eventMode?'Birthday':'Dining',seating:'Terrace preferred',name:'',phone:'',email:'',budget:'',food:'',decoration:'',notes:'',consent:false});const [status,setStatus]=useState('');const [ref,setRef]=useState('');const update=(e)=>setForm({...form,[e.target.name]:e.target.type==='checkbox'?e.target.checked:e.target.value});function submit(e){e.preventDefault();if(!form.consent){setStatus('Please provide consent before sending your demo enquiry.');return}const code='BZ-'+Math.random().toString(36).slice(2,8).toUpperCase();setRef(code);setStatus('success');}const chosen=outlets.find(o=>o.id===form.outlet);return <form className="booking-form" onSubmit={submit}><div className="form-intro"><Eyebrow>{eventMode?'EVENT ENQUIRY':'TABLE ENQUIRY'}</Eyebrow><h2>{eventMode?'Tell us what you\u2019re planning.':'Your evening, your way.'}</h2><p>Share a few details and we'll prepare a demo enquiry summary. This form is not connected to Bluez's booking system.</p></div>{status==='success'?<div className="form-success"><span><Check size={25}/></span><Eyebrow>DEMO ENQUIRY RECORDED</Eyebrow><h3>Thank you, {form.name}.</h3><p>Your enquiry has been recorded in this demo interface. This is not a confirmed reservation and the restaurant has not been notified.</p><div className="booking-ref">DEMO REFERENCE <strong>{ref}</strong></div><a className="btn btn-dark" href={wa(`Hello Bluez Team, I would like to enquire about ${form.occasion}. Outlet: ${chosen?.name}. Date: ${form.date||'flexible'}. Guests: ${form.guests}. Please confirm availability and options.`)} target="_blank" rel="noreferrer">Continue on WhatsApp <ArrowUpRight size={16}/></a><button type="button" className="text-button" onClick={()=>{setStatus('');setRef('')}}>Start another enquiry</button></div>:<><div className="form-grid"><label>Preferred outlet<select name="outlet" value={form.outlet} onChange={update}><option value="cg-road">Bluez — CG Road</option><option value="ranchhodra">Bluez — Ranchhodra (address to verify)</option></select></label><label>Number of guests<select name="guests" value={form.guests} onChange={update}>{['1','2','3','4','5','6','7–10','11–20','20+'].map(n=><option key={n}>{n}</option>)}</select></label><label>Preferred date<input type="date" name="date" value={form.date} onChange={update} min={new Date().toISOString().slice(0,10)}/></label><label>Preferred time<select name="time" value={form.time} onChange={update}><option value="">Choose a preferred time</option>{['12:00 PM','1:00 PM','2:00 PM','4:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM','Flexible / discuss'].map(t=><option key={t}>{t}</option>)}</select></label><label>Occasion<select name="occasion" value={form.occasion} onChange={update}>{['Dining','Candlelight Dinner','Date Night','Birthday','Anniversary','Marriage Proposal','Bridal Celebration','Kids\u2019 Party','Corporate Event','Family Gathering','Group Dining','Late-Night Request','Other'].map(t=><option key={t}>{t}</option>)}</select></label><label>Seating preference<select name="seating" value={form.seating} onChange={update}><option>Terrace preferred</option><option>Indoor preferred</option><option>No preference</option></select></label>{eventMode&&<><label>Approximate budget<input name="budget" value={form.budget} onChange={update} placeholder="Optional budget"/></label><label>Food preferences<input name="food" value={form.food} onChange={update} placeholder="e.g. Jain / vegetarian / allergies"/></label><label className="span-2">Decoration requirements<textarea name="decoration" value={form.decoration} onChange={update} placeholder="Describe the setup you have in mind"/></label></>}<label>Your name<input name="name" required value={form.name} onChange={update} placeholder="Full name"/></label><label>Mobile number<input name="phone" required type="tel" value={form.phone} onChange={update} placeholder="Your contact number" pattern="[+0-9()\-\s]{7,20}"/></label><label>Email (optional)<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com"/></label><label className="span-2">Special requests<textarea name="notes" value={form.notes} onChange={update} placeholder="Anything else the team should know?"/></label></div><label className="consent"><input type="checkbox" name="consent" checked={form.consent} onChange={update}/><span>I understand this is a demo enquiry form and my submission does not confirm a reservation or notify the restaurant.</span></label>{status&&<p className="form-error">{status}</p>}<button className="btn btn-gold submit-btn" type="submit">{eventMode?'Submit Event Enquiry':'Send Table Enquiry'} <ArrowUpRight size={16}/></button><p className="form-footnote"><LockIcon/> Demo mode · No information is sent to a booking server.</p></>}</form>}

function ReservePage(){return <main>
  <PageHero eyebrow="LET'S PLAN YOUR VISIT" title={<>A table for your<br/><em>kind of evening.</em></>} copy="Share your preferences. The Bluez team must confirm availability and arrangements directly." image={photos.candle}/>
  <section className="reserve-layout section-pad">
    <Reveal><div className="reserve-side">
      <Eyebrow>THE DETAILS MATTER</Eyebrow>
      <h2>Make space for<br/><em>what matters.</em></h2>
      <p>From a relaxed dinner to a special celebration, let the team know what you have in mind. We've designed this form to show how an online enquiry experience could work.</p>
      <div className="reserve-info">
        <div><CalendarDays/><span><strong>Choose your date</strong><small>Share your preferred day and time.</small></span></div>
        <div><Utensils/><span><strong>Set the scene</strong><small>Tell us about the occasion and seating preference.</small></span></div>
        <div><MessageCircle/><span><strong>Confirm directly</strong><small>Availability and details need confirmation from Bluez.</small></span></div>
      </div>
      <a className="contact-line" href={wa()} target="_blank" rel="noreferrer">Prefer WhatsApp? Start an enquiry <ArrowUpRight size={15}/></a>
    </div></Reveal>
    <Reveal delay={0.15}><ReservationForm/></Reveal>
  </section>
</main>}

function ExperiencesPage(){return <main>
  <PageHero eyebrow="EXPERIENCES AT BLUEZ" title={<>The moments that<br/><em>bring us together.</em></>} copy="From quiet, intimate evenings to lively celebrations — start with an idea and ask the Bluez team what may be possible." image={photos.candle}/>
  <section className="experiences-list section-pad">
    <Reveal><div className="experiences-intro">
      <SectionHead eyebrow="FIND YOUR OCCASION" title="A little something for every reason." copy="Explore ideas for your next visit. All arrangements are subject to confirmation by the restaurant."/>
      <ButtonLink to="/celebrations" kind="dark">Plan a Celebration</ButtonLink>
    </div></Reveal>
    <div className="experiences-editorial">
      {experiences.map((e,i)=>(
        <Reveal key={e[0]} delay={(i%2)*0.12}>
          <article className={`experience-row ${i%2?'reverse':''}`}>
            <div className="experience-row-image"><Image src={e[2]} alt={`${e[0]} experience concept`}/><span>0{i+1}</span></div>
            <div className="experience-row-copy"><Eyebrow>THE BLUEZ EXPERIENCE · {String(i+1).padStart(2,'0')}</Eyebrow><h3>{e[0]}</h3><p>{e[1]}</p><Link to="/reserve" className="under-link">Plan your experience <ArrowUpRight size={15}/></Link></div>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
  <FinalCTA/>
</main>}

function CelebrationsPage(){return <main>
  <PageHero eyebrow="CELEBRATE YOUR WAY" title={<>For the milestones<br/>and the <em>in-between.</em></>} copy="Birthdays, anniversaries, proposals and gatherings — share your vision and ask about options." image={photos.party}/>
  <section className="celebration-intro section-pad">
    <Reveal><div><Eyebrow>MADE PERSONAL</Eyebrow><h2>Big reasons. Small details.<br/><em>Memories that stay.</em></h2></div></Reveal>
    <Reveal delay={0.12}><p>Every celebration has its own feeling. Tell us what matters to you, how many people you're gathering, and what you'd like the evening to feel like. The team can confirm which arrangements are available.</p></Reveal>
  </section>
  <div className="celebration-cards section-pad">
    {experiences.filter((_,i)=>[2,3,5,6,8,9,10,11].includes(i)).map((e,i)=>(
      <Reveal key={e[0]} delay={i*0.07}>
        <Link to="/reserve" className="celebration-card">
          <Image src={e[2]} alt={e[0]}/><span>0{i+1}</span>
          <div><h3>{e[0]}</h3><p>{e[1]}</p><b>Start an enquiry <ArrowUpRight size={15}/></b></div>
        </Link>
      </Reveal>
    ))}
  </div>
  <section className="event-form-wrap section-pad"><ReservationForm eventMode/></section>
</main>}

function GalleryPage(){
  const items=[['Terrace ambience',photos.terrace,'Ambience'],['A table for two',photos.candle,'Celebrations'],['Food, shared well',photos.food,'Food'],['The dining room',photos.interior,'Ambience'],['A sweet finish',photos.dessert,'Food'],['Gather together',photos.table,'Celebrations'],['Candlelight details',img('photo-1511795409834-ef04bbd61622'),'Celebrations'],['A special occasion',photos.party,'Celebrations']]
  const [filter,setFilter]=useState('All'),[selected,setSelected]=useState(-1)
  const cats=['All','Ambience','Food','Celebrations']
  const list=items.filter(x=>filter==='All'||x[2]===filter)
  return <main>
    <PageHero eyebrow="A FEELING IN FRAMES" title={<>A glimpse of the<br/><em>Bluez atmosphere.</em></>} copy="A visual moodboard for the restaurant website concept. Images are illustrative hospitality photography, not verified photos of Bluez." image={photos.interior}/>
    <section className="gallery-page section-pad">
      <Reveal><div className="gallery-toolbar">
        <div><Eyebrow>THE GALLERY</Eyebrow><h2>Little details. <em>Lasting impressions.</em></h2></div>
        <div className="gallery-filters">{cats.map(c=><button className={filter===c?'active':''} key={c} onClick={()=>setFilter(c)}>{c}</button>)}</div>
      </div></Reveal>
      <div className="masonry">
        {list.map((x,i)=>(
          <Reveal key={x[0]} delay={i*0.06} y={20}>
            <button className={`gallery-tile tile-${i%4}`} style={{width:'100%'}} onClick={()=>setSelected(items.indexOf(x))}>
              <Image src={x[1]} alt={x[0]}/><span>{x[0]} <ArrowUpRight size={15}/></span>
            </button>
          </Reveal>
        ))}
      </div>
      <Reveal><div className="gallery-video">
        <Image src={photos.terrace} alt="Illustrative restaurant evening scene"/>
        <div><Eyebrow>WATCH THE BLUEZ EXPERIENCE</Eyebrow><h2>A little preview<br/>of the <em>evening mood.</em></h2><p>Demo visual direction. An official Bluez video can be added once supplied or verified.</p><ButtonLink to="/contact" kind="outline">Plan Your Visit</ButtonLink></div>
      </div></Reveal>
    </section>
    <AnimatePresence>{selected>=0&&<div className="lightbox" onClick={()=>setSelected(-1)}><button className="lightbox-close" onClick={()=>setSelected(-1)}><X/></button><button className="lightbox-prev" onClick={e=>{e.stopPropagation();setSelected((selected-1+items.length)%items.length)}}><ChevronLeft/></button><Image src={items[selected][1]} alt={items[selected][0]}/><div className="lightbox-caption">{items[selected][0]}</div><button className="lightbox-next" onClick={e=>{e.stopPropagation();setSelected((selected+1)%items.length)}}><ChevronRight/></button></div>}</AnimatePresence>
  </main>
}

function LocationsPage(){return <main>
  <PageHero eyebrow="FIND YOUR BLUEZ" title={<>Find your place<br/>at <em>the table.</em></>} copy="Explore the two Ahmedabad outlets mentioned for this concept. Confirm addresses and directions before travelling." image={photos.interior}/>
  <section className="locations-page section-pad">
    <Reveal><SectionHead eyebrow="TWO OUTLETS · AHMEDABAD" title="Come on in." copy="Each outlet can be selected independently in the demo enquiry flow."/></Reveal>
    <div className="location-cards large-cards">
      <Reveal><OutletCard outlet={outlets[0]} image={photos.interior}/></Reveal>
      <Reveal delay={0.12}><OutletCard outlet={outlets[1]} image={photos.ranchhodra}/></Reveal>
    </div>
    <Reveal><div className="location-note"><MapPin/><p><strong>Please verify before visiting.</strong> The CG Road-side address is supplied in this concept. The Ranchhodra address and any outlet-specific phone number or hours still need confirmation from Bluez.</p></div></Reveal>
  </section>
</main>}

function OutletPage({outlet}){
  const isCG=outlet.id==='cg-road'
  return <main>
    <PageHero eyebrow="BLUEZ · AHMEDABAD" title={isCG?<>Bluez — <em>CG Road.</em></>:<>Bluez — <em>Ranchhodra.</em></>} copy="A dedicated outlet page concept with practical details and a direct enquiry path." image={isCG?photos.interior:photos.ranchhodra}/>
    <section className="outlet-detail section-pad">
      <Reveal><div className="outlet-detail-photo">
        <Image src={isCG?photos.table:photos.ranchhodra} alt={`${outlet.name} illustrative interior`}/>
        <span className="photo-stamp">BLUEZ<br/>AHMEDABAD</span>
      </div></Reveal>
      <Reveal delay={0.15}><div className="outlet-detail-copy">
        <Eyebrow>YOUR LOCAL BLUEZ</Eyebrow><h2>{outlet.name}</h2><p>{outlet.address}</p>
        {!isCG&&<div className="demo-notice"><MapPin/><span>This outlet's exact address is an editable placeholder awaiting owner verification.</span></div>}
        <div className="outlet-actions">
          <ButtonLink to="/reserve">Enquire About a Table</ButtonLink>
          {isCG?<a className="btn btn-outline-dark" href="https://www.google.com/maps/search/?api=1&query=Bluez+Restaurant+Supermall+CG+Road+Ahmedabad" target="_blank" rel="noreferrer">Open Map Search <ArrowUpRight size={15}/></a>:<span className="pending">Directions link pending verification</span>}
        </div>
        <p className="fine-print">Opening hours, current menu, and booking availability should be confirmed directly with the Bluez team.</p>
      </div></Reveal>
    </section>
    <FinalCTA/>
  </main>
}

function FAQPage(){
  const [open,setOpen]=useState(0),[q,setQ]=useState('')
  const filtered=faqs.filter(([question,answer])=>(question+' '+answer).toLowerCase().includes(q.toLowerCase()))
  return <main>
    <PageHero eyebrow="HERE TO HELP" title={<>A few things<br/><em>you might wonder.</em></>} copy="Helpful starting points for planning your visit. Please confirm current policies and arrangements directly with Bluez." image={photos.table}/>
    <section className="faq-page section-pad">
      <Reveal><div className="faq-side">
        <Eyebrow>THE DETAILS</Eyebrow><h2>Good to <em>know.</em></h2>
        <p>We want planning your visit to feel easy. Search the questions or reach out to the team for anything specific.</p>
        <ButtonLink to="/contact" kind="dark">Contact Bluez</ButtonLink>
      </div></Reveal>
      <Reveal delay={0.1}><div className="faq-content">
        <label className="search-box"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search questions"/></label>
        {filtered.map(([question,answer],i)=>(
          <div className={`faq-item ${open===i?'opened':''}`} key={question}>
            <button onClick={()=>setOpen(open===i?-1:i)}><span>{question}</span>{open===i?<Minus size={17}/>:<Plus size={17}/>}</button>
            <AnimatePresence>{open===i&&<motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}>{answer}</motion.p>}</AnimatePresence>
          </div>
        ))}
        {!filtered.length&&<p>No questions match that search. Try a different term or contact the team.</p>}
      </div></Reveal>
    </section>
  </main>
}

function ContactPage(){
  const [sent,setSent]=useState(false)
  return <main>
    <PageHero eyebrow="SAY HELLO" title={<>Let's start with<br/><em>a conversation.</em></>} copy="Questions about dining, an occasion or the right outlet? Send a demo enquiry or contact Bluez directly." image={photos.candle}/>
    <section className="contact-layout section-pad">
      <Reveal><div className="contact-details">
        <Eyebrow>GET IN TOUCH</Eyebrow><h2>We'd love to hear<br/><em>what you have in mind.</em></h2>
        <p>Use the form to preview a polished online contact experience. This demo does not send your message to Bluez.</p>
        <div className="contact-detail"><span><MessageCircle/></span><div><small>PHONE / PROPOSED WHATSAPP</small><a href={wa()} target="_blank" rel="noreferrer">{restaurant.phoneDisplay} <ArrowUpRight size={14}/></a><small className="pending">Verify number before launch</small></div></div>
        <div className="contact-detail"><span><MapPin/></span><div><small>LOCATION</small><strong>Ahmedabad, Gujarat, India</strong><Link to="/locations">View both outlets <ArrowUpRight size={14}/></Link></div></div>
        <div className="contact-detail"><span><Clock3/></span><div><small>OPENING HOURS</small><strong>Hours to be confirmed</strong><small>Contact Bluez for current timings.</small></div></div>
      </div></Reveal>
      <Reveal delay={0.15}><form className="booking-form contact-form" onSubmit={e=>{e.preventDefault();setSent(true)}}>
        {sent?<div className="form-success"><span><Check/></span><Eyebrow>DEMO MESSAGE READY</Eyebrow><h3>Thank you for reaching out.</h3><p>This demo form does not deliver messages to Bluez. You can continue with a WhatsApp enquiry.</p><a className="btn btn-dark" href={wa()} target="_blank" rel="noreferrer">Continue on WhatsApp <ArrowUpRight size={15}/></a></div>
        :<><Eyebrow>GENERAL ENQUIRY</Eyebrow><h2>How can we help?</h2><div className="form-grid"><label>Your name<input required placeholder="Full name"/></label><label>Email address<input required type="email" placeholder="you@example.com"/></label><label>What is this about?<select><option>General enquiry</option><option>Reservation</option><option>Celebration</option><option>Corporate / group booking</option><option>Menu question</option></select></label><label>Preferred outlet<select><option>CG Road</option><option>Ranchhodra (details to verify)</option><option>No preference</option></select></label><label className="span-2">Your message<textarea required placeholder="Tell us a little more…"/></label></div><button className="btn btn-gold submit-btn">Submit Demo Enquiry <Send size={15}/></button><p className="form-footnote">Demo only · No backend connected</p></>}
      </form></Reveal>
    </section>
  </main>
}

function LegalPage({type}){return <main>
  <PageHero eyebrow="WE BELIEVE IN CLARITY" title={<>{type.split(' ')[0]} <em>{type.split(' ').slice(1).join(' ')}</em></>} copy="This is an editable placeholder page for the website demonstration." image={photos.interior}/>
  <section className="legal-page section-pad">
    <Reveal>
      <Eyebrow>DEMO POLICY PLACEHOLDER</Eyebrow>
      <h2>{type} — <em>to be reviewed.</em></h2>
      <p>This page is a placeholder and is not approved legal advice or a final policy for Bluez Restaurant. Before launch, the business owner should provide and approve the applicable privacy, data handling, reservation, cancellation, liability and website-use terms.</p>
      <p>Any real form or analytics integrations should explain what information is collected, why it is used, how long it is retained, and how customers can request assistance.</p>
      <ButtonLink to="/contact" kind="dark">Contact the Team</ButtonLink>
    </Reveal>
  </section>
</main>}

function NotFound(){return <main className="not-found">
  <Reveal><Eyebrow>404 · WRONG TURN</Eyebrow><h1>Looks like this<br/><em>isn't our table.</em></h1><p>The page you're looking for may have moved or may not exist.</p><ButtonLink to="/">Back to Home</ButtonLink></Reveal>
</main>}

function Footer(){return <footer className="footer"><div className="footer-top"><div className="footer-brand"><Link to="/" className="wordmark"><span className="logo-mark">B<span>·</span></span><span>bluez<small>RESTAURANT &amp; TERRACE CAFE</small></span></Link><p>Where beautiful evenings meet memorable flavours. A place for dining, celebrations and time well spent.</p><span className="gujarati">{restaurant.gujarati}</span></div><div className="footer-column"><h4>EXPLORE</h4><Link to="/#story">Our Story</Link><Link to="/menu">Menu</Link><Link to="/experiences">Experiences</Link><Link to="/gallery">Gallery</Link><Link to="/faq">FAQs</Link></div><div className="footer-column"><h4>RESERVATIONS</h4><Link to="/reserve">Reserve a Table</Link><Link to="/celebrations">Birthday Celebrations</Link><Link to="/experiences">Candlelight Dinner</Link><Link to="/celebrations">Corporate Events</Link><Link to="/contact">Contact Us</Link></div><div className="footer-column"><h4>FIND BLUEZ</h4><Link to="/locations/cg-road">CG Road, Ahmedabad</Link><Link to="/locations/ranchhodra">Ranchhodra, Ahmedabad</Link><a href={wa()} target="_blank" rel="noreferrer">WhatsApp Enquiry <ArrowUpRight size={13}/></a><a href="https://www.google.com/maps/search/?api=1&query=Bluez+Restaurant+Ahmedabad" target="_blank" rel="noreferrer">Google Maps Search <ArrowUpRight size={13}/></a></div></div><div className="footer-thought">"Some moments deserve more than a table. <em>They deserve a memory.</em>"</div><div className="footer-bottom"><span>© {new Date().getFullYear()} Bluez Restaurant. Demo website concept.</span><div><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms">Terms &amp; Conditions</Link></div><a className="tcp-credit" href="https://www.tcpitsolution.in/" target="_blank" rel="noreferrer">Powered by <strong>TCP IT Solution</strong> <ArrowUpRight size={13}/></a></div><div className="demo-disclaimer">Website demonstration by TCP IT Solution. Menu, photos, rating and business details require owner verification before publication.</div></footer>}

/* ── Robot SVG ── */
function RobotSVG({ size = 44, animate: doAnim = false }) {
  return (
    <motion.svg
      width={size} height={size} viewBox="0 0 64 64" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={doAnim ? { y: [0, -5, 0] } : {}}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* antenna */}
      <motion.line x1="32" y1="4" x2="32" y2="13" stroke="#c7a46a" strokeWidth="2.5" strokeLinecap="round"
        animate={doAnim ? { rotate: [-8, 8, -8] } : {}} style={{ originX: '32px', originY: '13px' }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}/>
      <circle cx="32" cy="3" r="2.5" fill="#c7a46a"/>
      {/* head */}
      <rect x="14" y="13" width="36" height="26" rx="7" fill="#1a2a3a" stroke="#c7a46a" strokeWidth="1.5"/>
      {/* eyes */}
      <motion.circle cx="24" cy="26" r="4.5" fill="#c7a46a"
        animate={doAnim ? { scale: [1, 1.18, 1] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0 }}/>
      <motion.circle cx="40" cy="26" r="4.5" fill="#c7a46a"
        animate={doAnim ? { scale: [1, 1.18, 1] } : {}}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}/>
      <circle cx="24" cy="26" r="2" fill="#08111f"/>
      <circle cx="40" cy="26" r="2" fill="#08111f"/>
      {/* mouth */}
      <rect x="22" y="33" width="20" height="3" rx="1.5" fill="#c7a46a" opacity="0.7"/>
      {/* neck */}
      <rect x="29" y="39" width="6" height="5" rx="1" fill="#1a2a3a" stroke="#c7a46a" strokeWidth="1"/>
      {/* body */}
      <rect x="12" y="44" width="40" height="18" rx="6" fill="#1a2a3a" stroke="#c7a46a" strokeWidth="1.5"/>
      {/* chest light */}
      <motion.circle cx="32" cy="53" r="3.5" fill="#c7a46a"
        animate={doAnim ? { opacity: [1, 0.3, 1] } : {}}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}/>
      {/* arms */}
      <motion.rect x="2" y="46" width="10" height="5" rx="2.5" fill="#1a2a3a" stroke="#c7a46a" strokeWidth="1.2"
        animate={doAnim ? { rotate: [-12, 12, -12] } : {}} style={{ originX: '12px', originY: '48px' }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}/>
      <motion.rect x="52" y="46" width="10" height="5" rx="2.5" fill="#1a2a3a" stroke="#c7a46a" strokeWidth="1.2"
        animate={doAnim ? { rotate: [12, -12, 12] } : {}} style={{ originX: '52px', originY: '48px' }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}/>
    </motion.svg>
  )
}

function Concierge({ open, setOpen }) {
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Hi! I\'m here 👋 Welcome to Bluez. Looking for a beautiful evening, a celebration, or a great meal? Ask me anything!' }])
  const [value, setValue] = useState('')
  const [greeted, setGreeted] = useState(false)
  const msgEnd = useRef(null)

  // auto-scroll
  useEffect(() => { msgEnd.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  // greeting bubble after 1.5s
  useEffect(() => {
    const t = setTimeout(() => setGreeted(true), 1500)
    return () => clearTimeout(t)
  }, [])

  const quick = ['Reserve a Table', 'Explore the Menu', 'Plan a Birthday', 'Candlelight Dinner', 'Corporate Events', 'Find an Outlet', 'Contact on WhatsApp']

  function answer(text) {
    const t = text.toLowerCase()
    let response = 'I don\'t have verified information for that just yet. Please contact the Bluez team to confirm current details.'
    let action = null
    if (t.includes('menu') || t.includes('food')) { response = 'Our demo menu shows illustrative categories and sample items only. Please contact Bluez for the current official menu and prices.'; action = ['Open Demo Menu', '/menu'] }
    else if (t.includes('reserve') || t.includes('table') || t.includes('booking')) { response = 'You can share your preferred outlet, date and guest count through the enquiry form. Submitting it does not confirm a table.'; action = ['Start Table Enquiry', '/reserve'] }
    else if (t.includes('birthday') || t.includes('anniversary') || t.includes('candlelight') || t.includes('romantic') || t.includes('proposal') || t.includes('celebrat')) { response = 'Tell us your occasion, preferred date and group size. The Bluez team will need to confirm arrangements, pricing and availability.'; action = ['Plan an Experience', '/celebrations'] }
    else if (t.includes('corporate') || t.includes('group') || t.includes('event')) { response = 'For corporate and group enquiries, share your guest count and preferred date so the team can confirm suitable options.'; action = ['Send Event Enquiry', '/celebrations'] }
    else if (t.includes('location') || t.includes('address') || t.includes('direction') || t.includes('outlet')) { response = 'The concept includes CG Road and Ranchhodra outlets. The supplied CG Road-side address is shown on our Locations page; Ranchhodra details need verification.'; action = ['View Locations', '/locations'] }
    else if (t.includes('hour') || t.includes('open') || t.includes('price') || t.includes('cost')) { response = 'I don\'t want to guess about current opening hours or prices. Please contact the Bluez team directly.'; action = ['Contact Bluez', '/contact'] }
    else if (t.includes('whatsapp') || t.includes('contact')) { response = 'You can open WhatsApp with a prepared enquiry message. Please verify the supplied number before the live website launches.'; action = ['Open WhatsApp', wa()] }
    setMessages(m => [...m, { from: 'user', text }, { from: 'bot', text: response, action }])
    setValue('')
  }

  function send(e) { e.preventDefault(); if (value.trim()) answer(value.trim()) }

  return (
    <>
      {/* greeting bubble */}
      <AnimatePresence>
        {greeted && !open && (
          <motion.div className="robot-greet"
            initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4 }}>
            Hi! I&apos;m here 👋
            <button className="robot-greet-close" onClick={() => setGreeted(false)} aria-label="Dismiss"><X size={11}/></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* launcher button */}
      <button className="robot-launcher" onClick={() => { setOpen(!open); setGreeted(false) }} aria-label="Open Bluez Concierge">
        <RobotSVG size={46} animate={!open} />
        <span className="robot-label">{open ? 'Close' : 'Concierge'}</span>
      </button>

      {/* chat panel */}
      <AnimatePresence>
        {open && (
          <motion.aside className="concierge-panel"
            initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }}>
            <div className="concierge-head">
              <RobotSVG size={38} animate />
              <div><strong>Bluez Concierge</strong><small><span /> AI Demo · Here to help</small></div>
              <button onClick={() => setOpen(false)} aria-label="Close"><X size={18} /></button>
            </div>
            <div className="concierge-messages">
              {messages.map((m, i) => (
                <div className={`chat-message ${m.from}`} key={i}>
                  <p>{m.text}</p>
                  {m.action && (m.action[1].startsWith('http')
                    ? <a href={m.action[1]} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>{m.action[0]} <ArrowUpRight size={13} /></a>
                    : <Link to={m.action[1]} onClick={() => setOpen(false)}>{m.action[0]} <ArrowUpRight size={13} /></Link>)}
                </div>
              ))}
              <div ref={msgEnd} />
              <div className="quick-replies">{quick.map(q => <button key={q} onClick={() => answer(q)}>{q}</button>)}</div>
            </div>
            <form className="chat-input" onSubmit={send}>
              <input value={value} onChange={e => setValue(e.target.value)} placeholder="Ask Bluez Concierge…" aria-label="Ask Bluez Concierge" />
              <button aria-label="Send"><Send size={16} /></button>
            </form>
            <div className="chat-disclaimer">Demo response engine · No live AI connected</div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
