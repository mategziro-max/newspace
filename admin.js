/* =====================================================
   დამხმარე
===================================================== */
const $ = (s, r = document) => r.querySelector(s);
const qa = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const iso = d => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
const todayIso = () => iso(new Date());
const CATS = { burgers: '🍔 ბურგერები', pizza: '🍕 პიცები', khachapuri: '🧀 ხაჭაპურები', desserts: '🍰 დესერტები', snacks: '🍟 სნექები', drinks: '🥤 სასმელები', cocktails: '🍹 კოქტეილები' };
const ST = { pending: 'ახალი', confirmed: 'დადასტურებული', cancelled: 'გაუქმებული' };
const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);
const waNum = p => { const d = String(p).replace(/\D/g, ''); return d.length === 9 ? '995' + d : d; };

let D = { products: [], reviews: [], reservations: [], blocks: [], gallery: [], settings: {} };
let tab = 'dash', booted = false;
const view = $('#view');

function toast(msg, type = 'ok') {
  const t = document.createElement('div'); t.className = 'toast ' + type; t.textContent = msg;
  $('#toasts').appendChild(t); setTimeout(() => t.classList.add('out'), 4500); setTimeout(() => t.remove(), 5100);
}
function beep() {
  try {
    const c = new (window.AudioContext || window.webkitAudioContext)(), o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination); o.frequency.value = 880;
    g.gain.setValueAtTime(.25, c.currentTime); g.gain.exponentialRampToValueAtTime(.001, c.currentTime + .7);
    o.start(); o.stop(c.currentTime + .7);
  } catch (e) { }
}
function modal(html, wide) {
  const m = document.createElement('div'); m.className = 'amodal';
  m.innerHTML = `<div class="abox ${wide ? 'wide' : ''}"><button class="x">×</button>${html}</div>`;
  m.onclick = e => { if (e.target === m || e.target.classList.contains('x')) m.remove(); };
  document.body.appendChild(m); return m;
}
function setTheme(t) { document.documentElement.dataset.theme = t; localStorage.setItem('ns_theme', t); $('#themeBtn').textContent = t === 'dark' ? '☀️' : '🌙'; }
setTheme(localStorage.getItem('ns_theme') || 'dark');
$('#themeBtn').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');

/* ---------- ფოტოს ატვირთვა (იპატარავებს ავტომატურად) ---------- */
function resizeImg(file, max) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
      c.width = img.width * s; c.height = img.height * s;
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      c.toBlob(b => b ? res(b) : rej(new Error('resize failed')), 'image/jpeg', .85); URL.revokeObjectURL(img.src);
    };
    img.onerror = rej; img.src = URL.createObjectURL(file);
  });
}
async function uploadImage(file, folder) {
  const blob = await resizeImg(file, 1400);
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
  const { error } = await db.storage.from('photos').upload(path, blob, { contentType: 'image/jpeg' });
  if (error) throw error;
  return db.storage.from('photos').getPublicUrl(path).data.publicUrl;
}

/* =====================================================
   ავტორიზაცია
===================================================== */
function loginMsg(t) { const m = $('#loginMsg'); m.className = 'msg err'; m.textContent = t; }
async function boot(session) {
  if (!session || booted) return;
  const { data } = await db.from('admins').select('user_id').eq('user_id', session.user.id).maybeSingle();
  if (!data) { await db.auth.signOut(); return loginMsg('ეს მომხმარებელი ადმინი არ არის. დაამატე admins ცხრილში (იხილე SQL-ის ბოლო ხაზი).'); }
  booted = true;
  $('#loginView').hidden = true; $('#app').hidden = false;
  await loadAll(); subscribe(); go('dash');
}
$('#loginForm').onsubmit = async e => {
  e.preventDefault();
  const { data, error } = await db.auth.signInWithPassword({ email: $('#email').value, password: $('#pass').value });
  if (error) return loginMsg(error.message);
  boot(data.session);
};
$('#logout').onclick = async () => { await db.auth.signOut(); location.reload(); };
db.auth.getSession().then(({ data }) => boot(data.session));

/* =====================================================
   მონაცემები
===================================================== */
async function loadAll() {
  const res = await Promise.all([
    db.from('products').select('*').order('id', { ascending: false }),
    db.from('reviews').select('*').order('created_at', { ascending: false }),
    db.from('reservations').select('*').order('reservation_date', { ascending: false }).order('reservation_time').limit(2000),
    db.from('table_blocks').select('*').gte('block_date', todayIso()).order('block_date'),
    db.from('gallery').select('*').order('id', { ascending: false }),
    db.from('settings').select('*')
  ]);
  const [p, r, rs, b, g, s] = res;
  D.products = p.data || []; D.reviews = r.data || []; D.reservations = rs.data || []; D.blocks = b.data || []; D.gallery = g.data || [];
  D.settings = {}; (s.data || []).forEach(x => D.settings[x.key] = x.value);
  const err = res.find(x => x.error); if (err) toast(err.error.message, 'err');
  const pend = D.reservations.filter(r => r.status === 'pending').length, c = $('#pendCount');
  c.textContent = pend; c.hidden = !pend;
}
async function refresh() { await loadAll(); RENDER[tab](); }

function subscribe() {
  db.channel('rt-res').on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, async p => {
    if (p.eventType === 'INSERT') {
      const r = p.new;
      toast(`🔔 ახალი დაჯავშნა: მაგიდა ${r.table_id}, ${r.reservation_date} ${r.reservation_time}, ${r.first_name} ${r.last_name}`, 'new'); beep();
    }
    await loadAll(); if (['dash', 'res', 'tables'].includes(tab)) RENDER[tab]();
  }).subscribe();
}

const RENDER = { dash: renderDash, res: renderRes, tables: renderTables, menu: renderMenu, reviews: renderReviews, gallery: renderGallery, settings: renderSettings };
function go(t) { tab = t; qa('#sideNav button').forEach(b => b.classList.toggle('on', b.dataset.tab === t)); RENDER[t](); scrollTo(0, 0); }
qa('#sideNav button').forEach(b => b.onclick = () => go(b.dataset.tab));

/* =====================================================
   მიმოხილვა
===================================================== */
function renderDash() {
  const td = todayIso(), act = D.reservations.filter(r => r.status !== 'cancelled');
  const todayR = act.filter(r => r.reservation_date === td).sort((a, b) => a.reservation_time.localeCompare(b.reservation_time));
  const pend = D.reservations.filter(r => r.status === 'pending').length;
  const sold = D.products.filter(p => p.stock <= 0).length, low = D.products.filter(p => p.stock > 0 && p.stock <= 3);
  const avg = D.reviews.length ? (D.reviews.reduce((s, r) => s + r.rating, 0) / D.reviews.length).toFixed(1) : '–';
  const days = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() + i); const k = iso(d); return { label: d.toLocaleDateString('ka-GE', { weekday: 'short', day: 'numeric' }), n: act.filter(r => r.reservation_date === k).length }; });
  const max = Math.max(1, ...days.map(d => d.n));
  const stat = (ic, l, v, s, c = '') => `<div class="stat ${c}"><div class="ic">${ic}</div><div><small>${l}</small><b>${v}</b><em>${s || ''}</em></div></div>`;
  view.innerHTML = `
  <div class="head"><h1>მიმოხილვა</h1><div class="head-act"><button class="btn sm" data-act="newres">+ ახალი დაჯავშნა</button></div></div>
  <div class="stats">
    ${stat('📅', 'დღეს დაჯავშნები', todayR.length, todayR.reduce((s, r) => s + r.guests, 0) + ' სტუმარი')}
    ${stat('🔔', 'დასადასტურებელი', pend, 'ახალი', pend ? 'warn' : '')}
    ${stat('🍽️', 'კერძები', D.products.length, `${sold} ამოწურული`, sold ? 'warn' : '')}
    ${stat('⭐', 'საშუალო შეფასება', avg, D.reviews.length + ' შეფასება')}
  </div>
  <div class="two">
    <div class="panel"><h3>მომდევნო 7 დღე</h3><div class="chart">${days.map(d => `<div><b>${d.n}</b><i style="height:${d.n / max * 100}%"></i>${d.label}</div>`).join('')}</div></div>
    <div class="panel"><h3>⚠️ მარაგი იწურება</h3>${low.length || sold ? D.products.filter(p => p.stock <= 3).map(p => `<div class="li"><span>${esc(p.name_ka)}</span><b class="${p.stock <= 0 ? 'zero' : ''}" style="color:${p.stock <= 0 ? 'var(--busy)' : 'var(--gold)'}">${p.stock <= 0 ? 'ამოიწურა' : 'დარჩა ' + p.stock}</b></div>`).join('') : '<small class="muted">ყველაფერი რიგზეა ✓</small>'}</div>
  </div>
  <div class="panel"><h3>დღევანდელი დაჯავშნები</h3>${todayR.length ? todayR.map(r => `<div class="li"><span><b>${r.reservation_time}</b> · მაგიდა ${r.table_id} · ${esc(r.first_name)} ${esc(r.last_name)} · ${r.guests} კაცი</span><span><a href="tel:${esc(r.phone)}">${esc(r.phone)}</a> <span class="st ${r.status}">${ST[r.status]}</span></span></div>`).join('') : '<small class="muted">დღეს დაჯავშნა არ არის</small>'}</div>`;
}

/* =====================================================
   დაჯავშნები
===================================================== */
let RF = { date: '', status: '', q: '' };
const resFiltered = () => D.reservations.filter(r =>
  (!RF.date || r.reservation_date === RF.date) && (!RF.status || r.status === RF.status) &&
  (!RF.q || (r.first_name + ' ' + r.last_name + ' ' + r.phone).toLowerCase().includes(RF.q.toLowerCase())));

function renderRes() {
  view.innerHTML = `
  <div class="head"><h1>დაჯავშნები</h1><div class="head-act"><button class="btn sm" data-act="newres">+ ახალი დაჯავშნა</button><button class="btn sm ghost" data-act="csv">⬇ CSV</button></div></div>
  <div class="filters-bar">
    <input type="date" id="fDate" value="${RF.date}">
    <select id="fStatus"><option value="">ყველა სტატუსი</option>${Object.entries(ST).map(([k, v]) => `<option value="${k}" ${RF.status === k ? 'selected' : ''}>${v}</option>`).join('')}</select>
    <input type="search" id="fQ" placeholder="სახელი ან ტელეფონი" value="${esc(RF.q)}">
    <button class="btn sm ghost" data-act="clearf">გასუფთავება</button>
  </div>
  <div class="tbl-scroll"><table class="at"><thead><tr><th>თარიღი</th><th>დრო</th><th>მაგიდა</th><th>სტუმარი</th><th>ტელეფონი</th><th>რაოდ.</th><th>კომენტარი</th><th>სტატუსი</th><th></th></tr></thead><tbody id="resBody"></tbody></table></div>
  <div class="muted" id="resCount"></div>`;
  drawRes();
}
function drawRes() {
  const list = resFiltered(), td = todayIso();
  $('#resBody').innerHTML = list.map(r => `<tr class="${r.reservation_date === td ? 'today' : ''}">
    <td>${r.reservation_date}</td><td>${esc(r.reservation_time)}</td><td>#${r.table_id}</td>
    <td>${esc(r.first_name)} ${esc(r.last_name)}${r.email ? `<br><small>${esc(r.email)}</small>` : ''}</td>
    <td><a href="tel:${esc(r.phone)}">${esc(r.phone)}</a></td><td>${r.guests}</td><td>${esc(r.comment || '')}</td>
    <td><span class="st ${r.status}">${ST[r.status] || r.status}</span></td>
    <td class="acts">
      <button class="ok" data-act="rs" data-id="${r.id}" data-v="confirmed" title="დადასტურება">✔</button>
      <button data-act="rs" data-id="${r.id}" data-v="cancelled" title="გაუქმება">✖</button>
      <a href="tel:${esc(r.phone)}" title="დარეკვა">📞</a>
      <a href="https://wa.me/${waNum(r.phone)}" target="_blank" rel="noopener" title="WhatsApp">💬</a>
      <button class="del" data-act="rdel" data-id="${r.id}" title="წაშლა">🗑</button></td></tr>`).join('') || '<tr><td colspan="9" style="text-align:center;padding:30px;color:var(--muted)">ჩანაწერი არ არის</td></tr>';
  $('#resCount').textContent = `სულ: ${list.length}`;
}
function exportCSV() {
  const rows = [['თარიღი', 'დრო', 'მაგიდა', 'სახელი', 'გვარი', 'ტელეფონი', 'ელფოსტა', 'სტუმრები', 'კომენტარი', 'სტატუსი']]
    .concat(resFiltered().map(r => [r.reservation_date, r.reservation_time, r.table_id, r.first_name, r.last_name, r.phone, r.email || '', r.guests, r.comment || '', ST[r.status]]));
  const csv = '\ufeff' + rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = `reservations-${todayIso()}.csv`; a.click();
}
function newReservation(pre = {}) {
  const m = modal(`<h2>ახალი დაჯავშნა (ტელეფონით)</h2>
  <form id="nrf" class="g2">
    <div><label>მაგიდა</label><select name="table_id">${TABLES.map(t => `<option value="${t.id}" ${pre.table_id === t.id ? 'selected' : ''}>#${t.id} · ${t.seats} ადგილი</option>`).join('')}</select></div>
    <div><label>თარიღი</label><input type="date" name="reservation_date" value="${pre.date || todayIso()}" required></div>
    <div><label>დრო</label><select name="reservation_time">${TIMES.map(t => `<option ${pre.time === t ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
    <div><label>სტუმრები</label><input type="number" name="guests" min="1" max="30" value="2" required></div>
    <div><label>სახელი</label><input name="first_name" required></div>
    <div><label>გვარი</label><input name="last_name" required></div>
    <div class="span"><label>ტელეფონი</label><input name="phone" type="tel" required></div>
    <div class="span"><label>კომენტარი</label><textarea name="comment"></textarea></div>
    <div class="span form-actions"><button class="btn">შენახვა</button></div>
  </form>`);
  $('#nrf', m).onsubmit = async e => {
    e.preventDefault();
    const row = Object.fromEntries(new FormData(e.target)); row.table_id = +row.table_id; row.guests = +row.guests; row.status = 'confirmed';
    const { error } = await db.from('reservations').insert(row);
    if (error) return toast(error.code === '23505' ? 'ეს მაგიდა ამ დროს უკვე დაკავებულია' : error.message, 'err');
    m.remove(); toast('დაჯავშნა დაემატა'); refresh();
  };
}

/* =====================================================
   მაგიდები (საიტის რუკა, დაკავება ხელით)
===================================================== */
let TB = { date: todayIso(), time: '19:00', d3: true };
function renderTables() {
  view.innerHTML = `
  <div class="head"><h1>მაგიდები</h1><div class="head-act"><button class="btn sm ghost" id="tb3d">${TB.d3 ? '3D' : '2D'}</button></div></div>
  <div class="filters-bar"><input type="date" id="tbDate" value="${TB.date}"></div>
  <div class="tm">${TIMES.map(t => `<button class="time ${t === TB.time ? 'on' : ''}" data-act="tm" data-t="${t}">${t}</button>`).join('')}</div>
  <div class="legend">
    <span><i style="background:var(--primary)"></i>თავისუფალი</span>
    <span><i style="background:var(--busy)"></i>სტუმრის დაჯავშნა</span>
    <span><i style="background:var(--blocked)"></i>ადმინის მიერ დაკავებული</span>
  </div>
  <div class="hint" id="tbCount"></div>
  <div class="hint">👆 დააჭირე მაგიდას: თავისუფალი მაგიდა დაიკავე (საიტზეც დაკავებული გამოჩნდება), დაკავებული გაათავისუფლე ან ნახე დეტალები.</div>
  <div class="stage-wrap" id="awrap"><div class="stage-box ${TB.d3 ? 'd3' : ''}" id="abox"><div class="stage" id="astage"></div></div></div>`;
  $('#astage').onclick = e => { const el = e.target.closest('.tbl'); if (el) tableClick(+el.dataset.id); };
  $('#tb3d').onclick = e => { TB.d3 = !TB.d3; $('#abox').classList.toggle('d3', TB.d3); e.target.textContent = TB.d3 ? '3D' : '2D'; };
  drawAdminMap();
}
function tbState() {
  const res = D.reservations.filter(r => r.reservation_date === TB.date && r.reservation_time === TB.time && r.status !== 'cancelled');
  const blk = D.blocks.filter(b => b.block_date === TB.date && (!b.block_time || b.block_time === TB.time));
  return { res, blk };
}
function drawAdminMap() {
  const { res, blk } = tbState();
  $('#astage').innerHTML = stageDecor({ pool: 'POOL', terrace: 'ტერასა', hall: 'დარბაზი' }) + TABLES.map(t => {
    const r = res.find(x => x.table_id === t.id), b = blk.find(x => x.table_id === t.id);
    return tableHTML(t, r ? 'busy' : b ? 'blocked' : 'free', `#${t.id} · ${t.seats} ადგილი` + (r ? ` · ${r.first_name} ${r.last_name}` : b ? ` · ${b.note || 'დაკავებულია'}` : ''));
  }).join('');
  const taken = new Set([...res.map(r => r.table_id), ...blk.map(b => b.table_id)]).size;
  $('#tbCount').textContent = `${TABLES.length - taken} თავისუფალია · ${taken} დაკავებული (${TB.date}, ${TB.time})`;
  const s = Math.min(1, ($('#awrap').clientWidth - 8) / 900);
  $('#abox').style.width = 900 * s + 'px'; $('#abox').style.height = 560 * s + 'px'; $('#astage').style.transform = `scale(${s})`;
}
addEventListener('resize', () => { if (tab === 'tables') drawAdminMap(); });

function tableClick(id) {
  const { res, blk } = tbState(), r = res.find(x => x.table_id === id), b = blk.find(x => x.table_id === id), t = TABLES.find(x => x.id === id);
  if (r) {
    const m = modal(`<h2>მაგიდა ${id} · ${TB.time}</h2>
      <div class="panel"><div class="li"><span>სტუმარი</span><b>${esc(r.first_name)} ${esc(r.last_name)}</b></div>
      <div class="li"><span>ტელეფონი</span><a href="tel:${esc(r.phone)}">${esc(r.phone)}</a></div>
      <div class="li"><span>სტუმრები</span><b>${r.guests}</b></div>
      <div class="li"><span>სტატუსი</span><span class="st ${r.status}">${ST[r.status]}</span></div>
      <div class="li"><span>კომენტარი</span><span>${esc(r.comment || '–')}</span></div></div>
      <div class="form-actions"><button class="btn sm" data-v="confirmed">✔ დადასტურება</button><button class="btn sm danger" data-v="cancelled">✖ გაუქმება (მაგიდა გათავისუფლდება)</button></div>`);
    qa('[data-v]', m).forEach(btn => btn.onclick = async () => {
      const { error } = await db.from('reservations').update({ status: btn.dataset.v }).eq('id', r.id);
      if (error) return toast(error.message, 'err'); m.remove(); refresh();
    });
  } else if (b) {
    const m = modal(`<h2>მაგიდა ${id} დაკავებულია</h2><p class="muted">${b.block_time ? b.block_date + ' · ' + b.block_time : b.block_date + ' · მთელი დღე'}${b.note ? '<br>შენიშვნა: ' + esc(b.note) : ''}</p>
      <div class="form-actions"><button class="btn danger" id="unb">გათავისუფლება</button></div>`);
    $('#unb', m).onclick = async () => {
      const { error } = await db.from('table_blocks').delete().eq('id', b.id);
      if (error) return toast(error.message, 'err'); m.remove(); toast('მაგიდა გათავისუფლდა'); refresh();
    };
  } else {
    const m = modal(`<h2>მაგიდა ${id} · ${t.seats} ადგილი</h2>
      <form id="blf"><label>შენიშვნა (არასავალდებულო)</label><input name="note" placeholder="მაგ. დაბადების დღე, VIP სტუმარი">
      <div style="margin:14px 0" class="g2"><label class="chk"><input type="radio" name="scope" value="hour" checked> მხოლოდ ${TB.time}</label><label class="chk"><input type="radio" name="scope" value="day"> მთელი დღე (${TB.date})</label></div>
      <div class="form-actions"><button class="btn">დაკავება</button><button type="button" class="btn ghost" id="mkres">+ დაჯავშნის ჩაწერა</button></div></form>`);
    $('#mkres', m).onclick = () => { m.remove(); newReservation({ table_id: id, date: TB.date, time: TB.time }); };
    $('#blf', m).onsubmit = async e => {
      e.preventDefault(); const f = new FormData(e.target);
      const { error } = await db.from('table_blocks').insert({ table_id: id, block_date: TB.date, block_time: f.get('scope') === 'day' ? null : TB.time, note: f.get('note') || null });
      if (error) return toast(error.message, 'err'); m.remove(); toast('მაგიდა დაკავებულია, საიტზეც დაკავებული ჩანს'); refresh();
    };
  }
}

/* =====================================================
   მენიუ (კერძები)
===================================================== */
let MF = { q: '', cat: '' };
function renderMenu() {
  view.innerHTML = `
  <div class="head"><h1>მენიუ</h1><div class="head-act"><button class="btn sm" data-act="pnew">+ ახალი კერძი</button></div></div>
  <div class="filters-bar"><input type="search" id="mQ" placeholder="კერძის ძებნა" value="${esc(MF.q)}">
    <select id="mCat"><option value="">ყველა კატეგორია</option>${Object.entries(CATS).map(([k, v]) => `<option value="${k}" ${MF.cat === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
  <div class="tbl-scroll"><table class="at"><thead><tr><th></th><th>სახელი</th><th>კატეგორია</th><th>ფასი</th><th>მარაგი</th><th>⭐ პოპულარული</th><th></th></tr></thead><tbody id="prodBody"></tbody></table></div>`;
  drawProd();
}
function drawProd() {
  const s = MF.q.toLowerCase();
  const list = D.products.filter(p => (!MF.cat || p.category === MF.cat) && (!s || [p.name_ka, p.name_en, p.name_ru].join(' ').toLowerCase().includes(s)));
  $('#prodBody').innerHTML = list.map(p => `<tr>
    <td><img src="${esc(p.image_url)}" alt=""></td>
    <td><b>${esc(p.name_ka)}</b><br><small>${esc(p.name_en || '')}</small></td><td>${CATS[p.category] || p.category}</td><td>${p.price} ₾</td>
    <td><span class="stk"><button data-act="stock" data-id="${p.id}" data-d="-1">−</button><b class="${p.stock <= 0 ? 'zero' : p.stock <= 3 ? 'low' : ''}">${p.stock <= 0 ? 'ამოიწურა' : p.stock}</b><button data-act="stock" data-id="${p.id}" data-d="1">+</button></span></td>
    <td><button class="chip ${p.popular ? 'on' : ''}" data-act="pop" data-id="${p.id}">${p.popular ? '★ პოპულარული' : '☆'}</button></td>
    <td class="acts"><button data-act="sold" data-id="${p.id}">${p.stock <= 0 ? 'დამატება' : 'ამოწურვა'}</button><button data-act="pedit" data-id="${p.id}">✏️</button><button class="del" data-act="pdel" data-id="${p.id}">🗑</button></td></tr>`).join('') || '<tr><td colspan="7" style="text-align:center;padding:30px;color:var(--muted)">კერძი არ არის</td></tr>';
}
async function patchProduct(id, patch) {
  const p = D.products.find(x => x.id === id); Object.assign(p, patch); drawProd();
  const { error } = await db.from('products').update(patch).eq('id', id);
  if (error) { toast(error.message, 'err'); refresh(); }
}
function productForm(id) {
  const p = id ? D.products.find(x => x.id === id) : { category: 'burgers', stock: 10, price: 0, popular: false };
  const f = (n, l, t = 'input') => `<div><label>${l}</label>${t === 'input' ? `<input name="${n}" value="${esc(p[n])}">` : `<textarea name="${n}">${esc(p[n])}</textarea>`}</div>`;
  const m = modal(`<h2>${id ? 'კერძის რედაქტირება' : 'ახალი კერძი'}</h2>
  <form id="pf">
    <div class="g3">${f('name_ka', 'სახელი (ქართ.)').replace('<input', '<input required')}${f('name_en', 'Name (EN)')}${f('name_ru', 'Название (RU)')}
      ${f('description_ka', 'აღწერა (ქართ.)', 't')}${f('description_en', 'Description (EN)', 't')}${f('description_ru', 'Описание (RU)', 't')}</div>
    <div class="g3" style="margin-top:12px">
      <div><label>ფასი ₾</label><input name="price" type="number" step="0.01" min="0" value="${p.price}" required></div>
      <div><label>კატეგორია</label><select name="category">${Object.entries(CATS).map(([k, v]) => `<option value="${k}" ${p.category === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
      <div><label>მარაგი (0 = ამოიწურა)</label><input name="stock" type="number" min="0" value="${p.stock}" required></div></div>
    <div class="upl" style="margin-top:14px">
      <img class="preview" id="pv" src="${esc(p.image_url || '')}" alt="">
      <div style="flex:1;min-width:220px"><label>ფოტოს ატვირთვა</label><input type="file" id="pfile" accept="image/*">
        <label style="margin-top:8px">ან ფოტოს ლინკი</label><input name="image_url" id="purl" value="${esc(p.image_url || '')}"></div></div>
    <label class="chk" style="margin-top:14px"><input type="checkbox" name="popular" ${p.popular ? 'checked' : ''}> ⭐ პოპულარული კერძი</label>
    <div class="form-actions"><button class="btn" id="psave">შენახვა</button></div>
  </form>`, true);
  $('#pfile', m).onchange = async e => {
    const file = e.target.files[0]; if (!file) return;
    $('#psave', m).disabled = true; toast('ფოტო იტვირთება...');
    try { const url = await uploadImage(file, 'products'); $('#purl', m).value = url; $('#pv', m).src = url; toast('ფოტო აიტვირთა'); }
    catch (err) { toast('ატვირთვა ვერ მოხერხდა: ' + err.message, 'err'); }
    $('#psave', m).disabled = false;
  };
  $('#purl', m).oninput = e => $('#pv', m).src = e.target.value;
  $('#pf', m).onsubmit = async e => {
    e.preventDefault();
    const row = Object.fromEntries(new FormData(e.target)); row.price = +row.price; row.stock = parseInt(row.stock, 10); row.popular = e.target.popular.checked;
    const { error } = id ? await db.from('products').update(row).eq('id', id) : await db.from('products').insert(row);
    if (error) return toast(error.message, 'err'); m.remove(); toast('შენახულია'); refresh();
  };
}

/* =====================================================
   შეფასებები
===================================================== */
let VF = { prod: '', rate: '' };
function renderReviews() {
  const avg = D.reviews.length ? (D.reviews.reduce((s, r) => s + r.rating, 0) / D.reviews.length).toFixed(1) : '–';
  view.innerHTML = `<div class="head"><h1>შეფასებები <small style="color:var(--muted)">(${D.reviews.length} · საშ. ${avg} ★)</small></h1></div>
  <div class="filters-bar"><select id="vProd"><option value="">ყველა კერძი</option>${D.products.map(p => `<option value="${p.id}" ${VF.prod == p.id ? 'selected' : ''}>${esc(p.name_ka)}</option>`).join('')}</select>
    <select id="vRate"><option value="">ყველა ვარსკვლავი</option>${[5, 4, 3, 2, 1].map(n => `<option value="${n}" ${VF.rate == n ? 'selected' : ''}>${n} ★</option>`).join('')}</select></div>
  <div id="rvBox"></div>`;
  drawReviews();
}
function drawReviews() {
  const list = D.reviews.filter(r => (!VF.prod || r.product_id == VF.prod) && (!VF.rate || r.rating == VF.rate));
  $('#rvBox').innerHTML = list.map(r => {
    const p = D.products.find(x => x.id === r.product_id);
    return `<div class="rv-card"><div><b>${esc(r.name)}</b> <span class="stars">${stars(r.rating)}</span><div>${esc(r.comment || '')}</div><small class="muted">${esc(p ? p.name_ka : '')} · ${new Date(r.created_at).toLocaleString('ka-GE')}</small></div>
    <button class="btn sm danger" data-act="vdel" data-id="${r.id}">🗑 წაშლა</button></div>`;
  }).join('') || '<p class="muted">შეფასება არ არის</p>';
}

/* =====================================================
   გალერეა
===================================================== */
function renderGallery() {
  view.innerHTML = `<div class="head"><h1>გალერეა</h1><div class="head-act"><label class="btn sm" style="margin:0;cursor:pointer">+ ფოტოების ატვირთვა<input type="file" id="gUp" accept="image/*" multiple hidden></label></div></div>
  <p class="hint">თუ გალერეაში ფოტო არ არის, საიტზე დროებითი ფოტოები ჩანს. ატვირთული ფოტოები მაშინვე ჩანაცვლდება.</p>
  <div class="gal">${D.gallery.map(g => `<div><img src="${esc(g.image_url)}" alt=""><button data-act="gdel" data-id="${g.id}">🗑</button></div>`).join('') || '<p class="muted">ჯერ ფოტო არ არის</p>'}</div>`;
}

/* =====================================================
   პარამეტრები
===================================================== */
function renderSettings() {
  const s = D.settings;
  view.innerHTML = `<div class="head"><h1>პარამეტრები</h1></div>
  <form class="panel" id="setForm" style="max-width:640px">
    <label>📢 განცხადება საიტის თავში (ცარიელი = არ ჩანს)</label>
    <input name="announcement" value="${esc(s.announcement || '')}" placeholder="მაგ. დღეს ცოცხალი მუსიკა 20:00 საათიდან">
    <div class="g2" style="margin-top:14px"><div><label>გაიხსნება</label><input type="time" name="open_time" value="${esc(s.open_time || '12:00')}"></div>
      <div><label>იკეტება</label><input type="time" name="close_time" value="${esc(s.close_time || '00:00')}"></div></div>
    <p class="hint">ამ საათებით საიტის ზედა ნაწილში ავტომატურად ჩანს "ღიაა" ან "დაკეტილია".</p>
    <div class="form-actions"><button class="btn">შენახვა</button></div>
  </form>
  <div class="panel" style="max-width:640px"><h3>🧹 გასუფთავება</h3>
    <p class="hint">30 დღეზე ძველი დაჯავშნების წაშლა ბაზის სისუფთავისთვის.</p>
    <button class="btn danger sm" data-act="purge">ძველი დაჯავშნების წაშლა</button></div>`;
}

/* =====================================================
   ღილაკებისა და ველების ერთიანი დამმუშავებელი
===================================================== */
view.addEventListener('click', async e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const a = b.dataset.act, id = +b.dataset.id;
  switch (a) {
    case 'newres': return newReservation();
    case 'csv': return exportCSV();
    case 'clearf': RF = { date: '', status: '', q: '' }; return renderRes();
    case 'rs': { const { error } = await db.from('reservations').update({ status: b.dataset.v }).eq('id', id); if (error) return toast(error.message, 'err'); toast('სტატუსი შეიცვალა'); return refresh(); }
    case 'rdel': { if (!confirm('წავშალო დაჯავშნა?')) return; await db.from('reservations').delete().eq('id', id); return refresh(); }
    case 'tm': TB.time = b.dataset.t; qa('.tm .time').forEach(x => x.classList.toggle('on', x === b)); return drawAdminMap();
    case 'pnew': return productForm();
    case 'pedit': return productForm(id);
    case 'pdel': { if (!confirm('წავშალო კერძი? მისი შეფასებებიც წაიშლება.')) return; const { error } = await db.from('products').delete().eq('id', id); if (error) return toast(error.message, 'err'); return refresh(); }
    case 'stock': { const p = D.products.find(x => x.id === id); return patchProduct(id, { stock: Math.max(0, p.stock + +b.dataset.d) }); }
    case 'pop': { const p = D.products.find(x => x.id === id); return patchProduct(id, { popular: !p.popular }); }
    case 'sold': { const p = D.products.find(x => x.id === id); return patchProduct(id, { stock: p.stock <= 0 ? 10 : 0 }); }
    case 'vdel': { if (!confirm('წავშალო შეფასება?')) return; const { error } = await db.from('reviews').delete().eq('id', id); if (error) return toast(error.message, 'err'); toast('შეფასება წაიშალა'); return refresh(); }
    case 'gdel': {
      if (!confirm('წავშალო ფოტო?')) return;
      const g = D.gallery.find(x => x.id === id), path = (g.image_url.split('/photos/')[1] || '');
      await db.from('gallery').delete().eq('id', id); if (path) await db.storage.from('photos').remove([path]); return refresh();
    }
    case 'purge': {
      if (!confirm('წავშალო 30 დღეზე ძველი დაჯავშნები?')) return;
      const d = new Date(); d.setDate(d.getDate() - 30);
      const { error } = await db.from('reservations').delete().lt('reservation_date', iso(d));
      if (error) return toast(error.message, 'err'); toast('გასუფთავდა'); return refresh();
    }
  }
});
view.addEventListener('input', e => {
  if (e.target.id === 'fQ') { RF.q = e.target.value; drawRes(); }
  if (e.target.id === 'mQ') { MF.q = e.target.value; drawProd(); }
});
view.addEventListener('change', async e => {
  const id = e.target.id;
  if (id === 'fDate') { RF.date = e.target.value; drawRes(); }
  if (id === 'fStatus') { RF.status = e.target.value; drawRes(); }
  if (id === 'mCat') { MF.cat = e.target.value; drawProd(); }
  if (id === 'vProd') { VF.prod = e.target.value; drawReviews(); }
  if (id === 'vRate') { VF.rate = e.target.value; drawReviews(); }
  if (id === 'tbDate') { TB.date = e.target.value; drawAdminMap(); }
  if (id === 'gUp') {
    const files = [...e.target.files]; if (!files.length) return;
    toast(`იტვირთება ${files.length} ფოტო...`);
    for (const f of files) {
      try { const url = await uploadImage(f, 'gallery'); const { error } = await db.from('gallery').insert({ image_url: url }); if (error) throw error; }
      catch (err) { toast('შეცდომა: ' + err.message, 'err'); }
    }
    toast('ფოტოები აიტვირთა'); refresh();
  }
});
view.addEventListener('submit', async e => {
  if (e.target.id !== 'setForm') return;
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.target));
  const rows = Object.entries(f).map(([key, value]) => ({ key, value }));
  const { error } = await db.from('settings').upsert(rows, { onConflict: 'key' });
  if (error) return toast(error.message, 'err'); toast('პარამეტრები შენახულია'); refresh();
});