// ===== CONFIG =====
let BACKEND_URL = "https://brainstorm-backend-cayj.onrender.com"; // <- set to your Render URL (no trailing slash), e.g. "https://your-backend.onrender.com"

// ===== UTIL =====
function $(sel){return document.querySelector(sel)}
function jfetch(url, body){
  return fetch((BACKEND_URL||"")+url,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body||{})})
}
function getName(){
  const v = localStorage.getItem('bsu_name'); return (v && v.trim()) ? v.trim().slice(0,80) : ''
}
function setName(n){ localStorage.setItem('bsu_name', (n||'').trim()) }

// Daily limiter for blog token (client-side; server also enforces)
function blogMarkedToday(){
  return localStorage.getItem('bsu_blog_date') === (new Date().toDateString())
}
function markBlogToday(){
  localStorage.setItem('bsu_blog_date', new Date().toDateString())
}

// Secret daily claims (client hint; server enforces real limit)
function getClaims(name){
  const all = JSON.parse(localStorage.getItem('bsu_secret_claims')||'{}'); return all[name]||0
}
function addClaim(name){
  const all = JSON.parse(localStorage.getItem('bsu_secret_claims')||'{}'); all[name]=(all[name]||0)+1; localStorage.setItem('bsu_secret_claims', JSON.stringify(all))
}

// Interstitial ad injection (dummy)
function showInterstitial(i){
  return new Promise(res=>{
    const wrap = document.createElement('div')
    wrap.style.position='fixed';wrap.style.inset='0';wrap.style.background='rgba(0,0,0,.85)';
    wrap.style.display='flex';wrap.style.alignItems='center';wrap.style.justifyContent='center';wrap.style.zIndex='9999';
    wrap.innerHTML = `<div class="card" style="max-width:600px;text-align:center">
      <div class="full-ad ad">Interstitial Ad ${i}</div>
      <button class="btn" id="closeAd">Continue</button>
    </div>`;
    document.body.appendChild(wrap);
    $('#closeAd').onclick=()=>{document.body.removeChild(wrap);res()};
  })
}
