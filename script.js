/* =====================================================
   1. თარგმანები
===================================================== */
const T = {
ka: {
  nav_home:'მთავარი', nav_menu:'მენიუ', nav_about:'ჩვენ შესახებ', nav_gallery:'გალერეა', nav_contact:'კონტაქტი', nav_reserve:'დაჯავშნა',
  open:'ღიაა', closed:'დაკეტილია',
  hero_eyebrow:'გემო, რომელიც გაერთიანებს',
  hero_title:'MAKE ROOM FOR <span>GOOD</span> MOMENTS.',
  hero_sub:'კარგი გემო, თბილი გარემო და დაუვიწყარი საღამოები New Space-ში.',
  hero_cta_menu:'მენიუს ნახვა', hero_cta_res:'მაგიდის დაჯავშნა',
  q_date:'თარიღი', q_time:'დრო', q_guests:'სტუმრები', q_go:'მაგიდების ნახვა',
  pop_title:'პოპულარული კერძები', pop_all:'მთელი მენიუ →',
  about_title:'შენი ადგილი <span>კარგი მომენტებისთვის.</span>',
  about_text:'შეიკრიბე მეგობრებთან, აღმოაჩინე საყვარელი გემოები და შექმენი ახალი მოგონებები. გელოდებით ყოველდღე.',
  kitchen_title:'შექმნილია გასაზიარებლად.',
  kitchen_text:'წვნიანი ბურგერები, არომატული პიცა, ქართული ხაჭაპური და დესერტები.',
  gallery_title:'გალერეა', guest_title:'სტუმრების შეფასებები', on_dish:'კერძზე',
  cta_title:'დაჯავშნე მაგიდა დღესვე', cta_text:'აირჩიე შენი საყვარელი ადგილი აუზთან ან დარბაზში.',
  menu_title:'მენიუ', menu_sub:'დააჭირე კერძს, რომ ნახო ფოტო, აღწერა და შეფასებები',
  search_ph:'მოძებნე კერძი...', sort_def:'დალაგება', sort_pa:'ფასი: ზრდადი', sort_pd:'ფასი: კლებადი', sort_rate:'რეიტინგი', sort_name:'სახელი',
  all:'ყველა', cat_burgers:'ბურგერები', cat_pizza:'პიცები', cat_khachapuri:'ხაჭაპურები', cat_desserts:'დესერტები', cat_snacks:'სნექები', cat_drinks:'სასმელები', cat_cocktails:'კოქტეილები',
  nothing:'ვერაფერი მოიძებნა', soldout:'ამოიწურა', low:'დარჩა {n}', popular:'⭐ პოპულარული',
  reviews:'შეფასებები', no_reviews:'ჯერ შეფასება არ არის', write_review:'დაწერე შეფასება',
  your_name:'შენი სახელი', your_comment:'დაწერე შეფასება...', send:'შეფასების დამატება', pick_stars:'აირჩიე ვარსკვლავები',
  res_title:'მაგიდის დაჯავშნა', res_sub:'აირჩიე თარიღი, დრო და მაგიდა რუკაზე',
  step1:'თარიღი და დრო', step2:'აირჩიე მაგიდა', step3:'შენი მონაცემები',
  free:'თავისუფალი', busy:'დაკავებული', selected:'არჩეული', table:'მაგიდა', seats:'ადგილი', pool:'აუზი', terrace:'ტერასა', hall:'დარბაზი', vip:'VIP',
  counter:'{a} თავისუფალია · {b} დაკავებული',
  first_name:'სახელი', last_name:'გვარი', phone:'ტელეფონი', email_opt:'ელფოსტა (არასავალდებულო)',
  guests:'სტუმრების რაოდენობა', comment:'კომენტარი', reserve_btn:'დაჯავშნა',
  pick_table:'ჯერ აირჩიე მაგიდა რუკაზე', too_many:'ამ მაგიდაზე მაქსიმუმ {n} ადამიანია, აირჩიე უფრო დიდი',
  res_taken:'ეს მაგიდა ახლახან დაიკავეს, აირჩიე სხვა', res_err:'შეცდომა, სცადე თავიდან', bad_phone:'შეიყვანე სწორი ტელეფონის ნომერი',
  ok_title:'დაჯავშნა მიღებულია!', ok_text:'დასადასტურებლად დაგიკავშირდებით.', close:'დახურვა',
  contact_title:'კონტაქტი', contact_sub:'მოხარულები ვიქნებით გიხილოთ New Space-ში.',
  address:'მისამართი', route:'მარშრუტის ნახვა ↗', phone:'ტელეფონი', hours:'სამუშაო საათები', rights:'ყველა უფლება დაცულია'
},
en: {
  nav_home:'Home', nav_menu:'Menu', nav_about:'About', nav_gallery:'Gallery', nav_contact:'Contact', nav_reserve:'Reserve',
  open:'Open', closed:'Closed',
  hero_eyebrow:'Taste that brings people together',
  hero_title:'MAKE ROOM FOR <span>GOOD</span> MOMENTS.',
  hero_sub:'Great food, a warm atmosphere and unforgettable evenings at New Space.',
  hero_cta_menu:'View menu', hero_cta_res:'Reserve a table',
  q_date:'Date', q_time:'Time', q_guests:'Guests', q_go:'See tables',
  pop_title:'Popular dishes', pop_all:'Full menu →',
  about_title:'Your place for <span>good moments.</span>',
  about_text:'Gather with friends, discover your favourite flavours and make new memories. We are open every day.',
  kitchen_title:'Made for sharing.',
  kitchen_text:'Juicy burgers, aromatic pizza, Georgian khachapuri and desserts.',
  gallery_title:'Gallery', guest_title:'Guest reviews', on_dish:'on',
  cta_title:'Reserve your table today', cta_text:'Pick your favourite spot by the pool or in the hall.',
  menu_title:'Menu', menu_sub:'Tap a dish to see the photo, description and reviews',
  search_ph:'Search a dish...', sort_def:'Sort', sort_pa:'Price: low to high', sort_pd:'Price: high to low', sort_rate:'Rating', sort_name:'Name',
  all:'All', cat_burgers:'Burgers', cat_pizza:'Pizza', cat_khachapuri:'Khachapuri', cat_desserts:'Desserts', cat_snacks:'Snacks', cat_drinks:'Drinks', cat_cocktails:'Cocktails',
  nothing:'Nothing found', soldout:'Sold out', low:'Only {n} left', popular:'⭐ Popular',
  reviews:'Reviews', no_reviews:'No reviews yet', write_review:'Write a review',
  your_name:'Your name', your_comment:'Write a review...', send:'Add review', pick_stars:'Please choose stars',
  res_title:'Table reservation', res_sub:'Pick a date, time and a table on the map',
  step1:'Date and time', step2:'Choose a table', step3:'Your details',
  free:'Free', busy:'Taken', selected:'Selected', table:'Table', seats:'seats', pool:'POOL', terrace:'Terrace', hall:'Hall', vip:'VIP',
  counter:'{a} free · {b} taken',
  first_name:'First name', last_name:'Last name', phone:'Phone', email_opt:'Email (optional)',
  guests:'Number of guests', comment:'Comment', reserve_btn:'Reserve',
  pick_table:'Please pick a table on the map first', too_many:'This table seats up to {n}, pick a bigger one',
  res_taken:'This table was just taken, pick another', res_err:'Something went wrong, try again', bad_phone:'Enter a valid phone number',
  ok_title:'Reservation received!', ok_text:'We will contact you to confirm.', close:'Close',
  contact_title:'Contact', contact_sub:'We would love to see you at New Space.',
  address:'Address', route:'Get directions ↗', phone:'Phone', hours:'Opening hours', rights:'All rights reserved'
},
ru: {
  nav_home:'Главная', nav_menu:'Меню', nav_about:'О нас', nav_gallery:'Галерея', nav_contact:'Контакты', nav_reserve:'Бронь',
  open:'Открыто', closed:'Закрыто',
  hero_eyebrow:'Вкус, который объединяет',
  hero_title:'ВРЕМЯ ДЛЯ <span>ХОРОШИХ</span> МОМЕНТОВ.',
  hero_sub:'Отличная кухня, тёплая атмосфера и незабываемые вечера в New Space.',
  hero_cta_menu:'Смотреть меню', hero_cta_res:'Забронировать стол',
  q_date:'Дата', q_time:'Время', q_guests:'Гости', q_go:'Выбрать стол',
  pop_title:'Популярные блюда', pop_all:'Всё меню →',
  about_title:'Твоё место для <span>хороших моментов.</span>',
  about_text:'Собирайтесь с друзьями, открывайте любимые вкусы и создавайте новые воспоминания. Ждём вас каждый день.',
  kitchen_title:'Создано, чтобы делиться.',
  kitchen_text:'Сочные бургеры, ароматная пицца, грузинский хачапури и десерты.',
  gallery_title:'Галерея', guest_title:'Отзывы гостей', on_dish:'о блюде',
  cta_title:'Забронируйте стол сегодня', cta_text:'Выберите любимое место у бассейна или в зале.',
  menu_title:'Меню', menu_sub:'Нажмите на блюдо, чтобы увидеть фото, описание и отзывы',
  search_ph:'Найти блюдо...', sort_def:'Сортировка', sort_pa:'Цена: по возрастанию', sort_pd:'Цена: по убыванию', sort_rate:'Рейтинг', sort_name:'Название',
  all:'Все', cat_burgers:'Бургеры', cat_pizza:'Пицца', cat_khachapuri:'Хачапури', cat_desserts:'Десерты', cat_snacks:'Снеки', cat_drinks:'Напитки', cat_cocktails:'Коктейли',
  nothing:'Ничего не найдено', soldout:'Закончилось', low:'Осталось {n}', popular:'⭐ Популярное',
  reviews:'Отзывы', no_reviews:'Отзывов пока нет', write_review:'Написать отзыв',
  your_name:'Ваше имя', your_comment:'Напишите отзыв...', send:'Добавить отзыв', pick_stars:'Выберите звёзды',
  res_title:'Бронирование стола', res_sub:'Выберите дату, время и стол на схеме',
  step1:'Дата и время', step2:'Выберите стол', step3:'Ваши данные',
  free:'Свободен', busy:'Занят', selected:'Выбран', table:'Стол', seats:'мест', pool:'БАССЕЙН', terrace:'Терраса', hall:'Зал', vip:'VIP',
  counter:'{a} свободно · {b} занято',
  first_name:'Имя', last_name:'Фамилия', phone:'Телефон', email_opt:'Эл. почта (необязательно)',
  guests:'Количество гостей', comment:'Комментарий', reserve_btn:'Забронировать',
  pick_table:'Сначала выберите стол на схеме', too_many:'За этим столом максимум {n} чел., выберите побольше',
  res_taken:'Этот стол только что заняли, выберите другой', res_err:'Ошибка, попробуйте ещё раз', bad_phone:'Введите корректный номер телефона',
  ok_title:'Бронь принята!', ok_text:'Мы свяжемся с вами для подтверждения.', close:'Закрыть',
  contact_title:'Контакты', contact_sub:'Будем рады видеть вас в New Space.',
  address:'Адрес', route:'Построить маршрут ↗', phone:'Телефон', hours:'Часы работы', rights:'Все права защищены'
}
};

/* =====================================================
   2. დამხმარე ფუნქციები
===================================================== */
const LANGS = [['ka', 'GE'], ['en', 'EN'], ['ru', 'RU']];
const CATS = [['burgers', '🍔'], ['pizza', '🍕'], ['khachapuri', '🧀'], ['desserts', '🍰'], ['snacks', '🍟'], ['drinks', '🥤'], ['cocktails', '🍹']];
let lang = localStorage.getItem('ns_lang') || 'ka';
let S = {};   // პარამეტრები ბაზიდან

const $ = (s, r = document) => r.querySelector(s);
const qa = (s, r = document) => [...r.querySelectorAll(s)];
const tr = (k, v = {}) => { let s = (T[lang] && T[lang][k]) || T.en[k] || k; for (const x in v) s = s.replace('{' + x + '}', v[x]); return s; };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pick = (o, f) => o[`${f}_${lang}`] || o[`${f}_en`] || o[`${f}_ka`] || '';
const stars = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));
const isoDate = d => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);

function setTheme(t) {
  document.documentElement.dataset.theme = t; localStorage.setItem('ns_theme', t);
  const b = $('#themeBtn'); if (b) b.textContent = t === 'dark' ? '☀️' : '🌙';
}
function isOpen() {
  const [oh, om] = (S.open_time || '12:00').split(':').map(Number), [ch, cm] = (S.close_time || '00:00').split(':').map(Number);
  const n = new Date(), now = n.getHours() * 60 + n.getMinutes(), o = oh * 60 + om, c = ch * 60 + cm;
  return c <= o ? (now >= o || now < c) : (now >= o && now < c);
}
function updateOpen() { const p = $('#openPill'); if (!p) return; const o = isOpen(); p.textContent = tr(o ? 'open' : 'closed'); p.className = 'pill ' + (o ? 'ok' : 'no'); }
function applyI18n() {
  document.documentElement.lang = lang;
  qa('[data-i18n]').forEach(e => e.textContent = tr(e.dataset.i18n));
  qa('[data-i18n-html]').forEach(e => e.innerHTML = tr(e.dataset.i18nHtml));
  qa('[data-i18n-ph]').forEach(e => e.placeholder = tr(e.dataset.i18nPh));
  const s = $('#langSel'); if (s) s.value = lang;
  $('#route').textContent = tr('route'); updateOpen();
}
function setLang(l) { lang = l; localStorage.setItem('ns_lang', l); applyI18n(); document.dispatchEvent(new Event('langchange')); }

function openModal(html, cls = '') {
  closeModal();
  const m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="modal-box ${cls}"><button class="x" aria-label="close">×</button>${html}</div>`;
  m.addEventListener('click', e => { if (e.target === m || e.target.classList.contains('x')) closeModal(); });
  document.body.appendChild(m); document.body.style.overflow = 'hidden';
  return m;
}
function closeModal() { $('.modal')?.remove(); document.body.style.overflow = ''; }
document.addEventListener('keydown', e => e.key === 'Escape' && closeModal());

/* =====================================================
   3. ჩატვირთვა, ჰედერი, ფუტერი
===================================================== */
const NAV = [['home', 'nav_home'], ['menu', 'nav_menu'], ['about', 'nav_about'], ['gallery', 'nav_gallery'], ['contact', 'nav_contact']];

function initLayout() {
  if (!sessionStorage.getItem('ns_loaded')) {
    document.body.insertAdjacentHTML('afterbegin', `
    <div id="loader"><div class="loader-inner">
      <div class="logo-circle"><img src="logo.jpg" alt="New Space"></div>
      <svg class="cutlery" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <g class="fork"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/></g>
        <g class="knife"><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></g>
      </svg>
      <div class="bar"><span></span></div>
    </div></div>`);
    const hide = () => setTimeout(() => {
      $('#loader')?.classList.add('hide'); setTimeout(() => $('#loader')?.remove(), 800);
      sessionStorage.setItem('ns_loaded', '1');
    }, 2300);
    document.readyState === 'complete' ? hide() : addEventListener('load', hide);
  }

  $('#header').outerHTML = `
  <div id="banner" class="banner" hidden></div>
  <header><div class="container nav">
    <a href="#home" class="brand"><img src="logo.jpg" alt="New Space"><div><b>NEW SPACE</b><small>RUSTAVI · EST. 2023</small></div></a>
    <nav class="links" id="links">${NAV.map(n => `<a href="#${n[0]}" data-page="${n[0]}" data-i18n="${n[1]}"></a>`).join('')}</nav>
    <div class="tools">
      <span id="openPill" class="pill"></span>
      <select id="langSel">${LANGS.map(l => `<option value="${l[0]}">${l[1]}</option>`).join('')}</select>
      <button class="icon" id="themeBtn" aria-label="theme"></button>
      <a href="#reservation" class="btn sm" data-i18n="nav_reserve"></a>
      <button class="icon burger" id="burger" aria-label="menu">☰</button>
    </div>
  </div></header>`;

  $('#footer').outerHTML = `
  <footer><div class="container foot">
    <div><strong>NEW SPACE</strong><p>© ${new Date().getFullYear()} · <span data-i18n="rights"></span></p></div>
    <div class="soc">
      <a href="tel:${PHONE_LINK}">📞 ${PHONE_DISPLAY}</a>
      <a href="${SOCIALS.instagram}" target="_blank" rel="noopener">Instagram</a>
      <a href="${SOCIALS.facebook}" target="_blank" rel="noopener">Facebook</a>
      <a href="${SOCIALS.tiktok}" target="_blank" rel="noopener">TikTok</a>
    </div>
  </div></footer>
  <a class="fab" href="tel:${PHONE_LINK}" aria-label="call">📞</a>`;

  $('#langSel').onchange = e => setLang(e.target.value);
  $('#themeBtn').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  $('#burger').onclick = () => $('#links').classList.toggle('open');
  setTheme(localStorage.getItem('ns_theme') || 'dark');
}

/* =====================================================
   4. გვერდების გადართვა
===================================================== */
const VIEWS = ['home', 'menu', 'reservation', 'contact'];
function route() {
  const h = location.hash.slice(1) || 'home';
  let view = h, anchor = null;
  if (h === 'about' || h === 'gallery') { view = 'home'; anchor = h; }
  if (!VIEWS.includes(view)) view = 'home';
  qa('.view').forEach(v => v.hidden = v.id !== 'v-' + view);
  qa('.links a').forEach(a => a.classList.toggle('active', a.dataset.page === h));
  $('#links').classList.remove('open'); closeModal();
  if (anchor) setTimeout(() => $('#' + anchor)?.scrollIntoView({ behavior: 'smooth' }), 60); else scrollTo(0, 0);
  if (view === 'reservation') { fit(); renderTimes(); loadBusy(); }
  observe();
}
addEventListener('hashchange', route);

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 });
function observe() { qa('.reveal:not(.in)').forEach(el => io.observe(el)); }

/* =====================================================
   5. პარამეტრები და გალერეა
===================================================== */
async function loadSettings() {
  const { data } = await db.from('settings').select('*');
  S = {}; (data || []).forEach(r => S[r.key] = r.value);
  const b = $('#banner'); if (S.announcement) { b.textContent = S.announcement; b.hidden = false; } else b.hidden = true;
  $('#hoursVal').textContent = `${S.open_time || '12:00'} – ${S.close_time || '00:00'}`;
  updateOpen();
}
async function loadGallery() {
  const { data } = await db.from('gallery').select('*').order('id', { ascending: false });
  const list = data && data.length ? data.map(x => x.image_url) : ['pool', 'food1', 'cottage', 'night', 'dessert', 'bar'].map(s => `https://picsum.photos/seed/ns-${s}/900/${s.length % 2 ? 700 : 1000}`);
  $('#galleryBox').innerHTML = list.map(u => `<img loading="lazy" src="${esc(u)}" alt="">`).join('');
}
$('#galleryBox').onclick = e => { if (e.target.tagName === 'IMG') openModal(`<img class="big" src="${e.target.src}" alt="">`, 'wide'); };

/* =====================================================
   6. მენიუ + შეფასებები
===================================================== */
let products = [], reviews = {}, cat = 'all', q = '', loaded = false;
const grid = $('#grid'), chips = $('#chips');

async function loadMenu() {
  const [p, r] = await Promise.all([
    db.from('products').select('*').order('id'),
    db.from('reviews').select('*').order('created_at', { ascending: false })
  ]);
  if (p.error) { grid.innerHTML = `<p class="empty">${esc(p.error.message)}</p>`; return; }
  products = p.data; reviews = {};
  (r.data || []).forEach(x => (reviews[x.product_id] ??= []).push(x));
  loaded = true; renderMenu(); renderHome();
}
const avg = id => { const a = reviews[id] || []; return a.length ? a.reduce((s, x) => s + x.rating, 0) / a.length : 0; };

function card(p, i = 0) {
  const n = (reviews[p.id] || []).length;
  const status = p.stock <= 0 ? `<span class="badge">${tr('soldout')}</span>` : p.stock <= 3 ? `<span class="badge low">${tr('low', { n: p.stock })}</span>` : '';
  return `<div class="card ${p.stock <= 0 ? 'soldout' : ''}" data-id="${p.id}" style="animation-delay:${i * 60}ms">
    <div class="ph">${status}${p.popular ? `<span class="badge pop">${tr('popular')}</span>` : ''}
      <img loading="lazy" src="${esc(p.image_url)}" alt="${esc(pick(p, 'name'))}"></div>
    <div class="body"><h3>${esc(pick(p, 'name'))}</h3><p class="desc">${esc(pick(p, 'description'))}</p>
      <div class="foot"><span class="price">${p.price} ₾</span><span class="stars">${stars(avg(p.id))} <small>(${n})</small></span></div></div></div>`;
}
function sortList(l) {
  switch ($('#sort').value) {
    case 'pa': return l.sort((a, b) => a.price - b.price);
    case 'pd': return l.sort((a, b) => b.price - a.price);
    case 'rate': return l.sort((a, b) => avg(b.id) - avg(a.id));
    case 'name': return l.sort((a, b) => pick(a, 'name').localeCompare(pick(b, 'name')));
    default: return l;
  }
}
function renderMenu() {
  chips.innerHTML = [['all', '✦'], ...CATS].map(([c, e]) => `<button class="chip ${c === cat ? 'on' : ''}" data-c="${c}">${e} ${tr(c === 'all' ? 'all' : 'cat_' + c)}</button>`).join('');
  if (!loaded) { grid.innerHTML = '<div class="card sk"><div class="sk-img"></div><div class="sk-l"></div><div class="sk-l s"></div></div>'.repeat(6); return; }
  const s = q.trim().toLowerCase();
  const list = sortList(products.filter(p => (cat === 'all' || p.category === cat) &&
    (!s || [p.name_ka, p.name_en, p.name_ru, p.description_ka, p.description_en, p.description_ru].join(' ').toLowerCase().includes(s))));
  grid.innerHTML = list.length ? list.map(card).join('') : `<p class="empty">${tr('nothing')}</p>`;
}
chips.onclick = e => { const b = e.target.closest('.chip'); if (b) { cat = b.dataset.c; renderMenu(); } };
$('#q').oninput = e => { q = e.target.value; renderMenu(); };
$('#sort').onchange = renderMenu;
grid.onclick = $('#popGrid').onclick = e => { const c = e.target.closest('.card'); if (c) openProduct(+c.dataset.id); };

function openProduct(id) {
  const p = products.find(x => x.id === id), rv = reviews[id] || [];
  const emoji = (CATS.find(c => c[0] === p.category) || [, ''])[1];
  const m = openModal(`
    <div class="pm">
      <div class="pm-img"><img src="${esc(p.image_url)}" alt=""></div>
      <div class="pm-info">
        <div class="tags">${p.stock <= 0 ? `<span class="tag">${tr('soldout')}</span>` : p.stock <= 3 ? `<span class="tag low">${tr('low', { n: p.stock })}</span>` : ''}${p.popular ? `<span class="tag pop">${tr('popular')}</span>` : ''}</div>
        <div class="eyebrow">NEW SPACE MENU</div>
        <h2>${esc(pick(p, 'name'))}</h2>
        <div style="color:var(--muted)">${emoji} ${tr('cat_' + p.category)}</div>
        <p style="color:var(--muted)">${esc(pick(p, 'description'))}</p>
        <div class="price" style="font-size:2rem">${p.price} ₾</div>
        <hr>
        <h3>${tr('reviews')} <span class="stars">${stars(avg(id))} <small>(${rv.length})</small></span></h3>
        <div class="rv-list">${rv.length ? rv.map(x => `<div class="rv"><b>${esc(x.name)}</b><span class="stars">${stars(x.rating)}</span><div>${esc(x.comment || '')}</div></div>`).join('') : `<small style="color:var(--muted)">${tr('no_reviews')}</small>`}</div>
        <form id="rvForm">
          <div class="pick">${[1, 2, 3, 4, 5].map(i => `<span data-v="${i}">★</span>`).join('')}</div>
          <input id="rn" maxlength="60" required placeholder="${tr('your_name')}">
          <textarea id="rc" maxlength="500" placeholder="${tr('your_comment')}"></textarea>
          <button class="btn">${tr('send')}</button>
        </form>
      </div>
    </div>`, 'wide');
  let rate = 0;
  qa('.pick span', m).forEach(s => s.onclick = () => { rate = +s.dataset.v; qa('.pick span', m).forEach(x => x.classList.toggle('on', +x.dataset.v <= rate)); });
  $('#rvForm', m).onsubmit = async e => {
    e.preventDefault();
    if (!rate) return alert(tr('pick_stars'));
    const { error } = await db.from('reviews').insert({ product_id: id, name: $('#rn', m).value.trim(), rating: rate, comment: $('#rc', m).value.trim() });
    if (error) return alert(error.message);
    await loadMenu(); openProduct(id);
  };
}

/* =====================================================
   7. მთავარი გვერდის დინამიკური ნაწილები
===================================================== */
function renderHome() {
  const pop = products.filter(p => p.popular).slice(0, 4);
  $('#popGrid').innerHTML = (pop.length ? pop : products.slice(0, 4)).map(card).join('');
  const all = Object.values(reviews).flat().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6);
  $('#guestSec').hidden = !all.length;
  $('#guestGrid').innerHTML = all.map(r => {
    const p = products.find(x => x.id === r.product_id);
    return `<div class="guest"><span class="stars">${stars(r.rating)}</span><p>${esc(r.comment || '')}</p><b>${esc(r.name)}</b><br><small>${tr('on_dish')}: ${esc(p ? pick(p, 'name') : '')}</small></div>`;
  }).join('');
  observe();
}

const qd = $('#qd'), qt = $('#qt');
qd.min = qd.value = isoDate(new Date());
TIMES.forEach(t => qt.add(new Option(t, t))); qt.value = '19:00';
$('#quick').onsubmit = e => {
  e.preventDefault();
  $('#rd').value = qd.value; rtVal = qt.value; $('#gs').value = $('#qg').value; sel = null;
  location.hash === '#reservation' ? route() : (location.hash = '#reservation');
};

/* =====================================================
   8. მაგიდის დაჯავშნა (3D რუკა)
===================================================== */
const rd = $('#rd'), stage = $('#stage'), box = $('#box');
let busy = new Set(), sel = null, rtVal = '19:00';
rd.min = rd.value = isoDate(new Date());

function renderTimes() {
  const today = rd.value === isoDate(new Date()), h = new Date().getHours();
  const past = t => today && parseInt(t) <= h;
  if (past(rtVal)) rtVal = TIMES.find(t => !past(t)) || rtVal;
  $('#times').innerHTML = TIMES.map(t => `<button type="button" class="time ${t === rtVal ? 'on' : ''}" data-t="${t}" ${past(t) ? 'disabled' : ''}>${t}</button>`).join('');
}
$('#times').onclick = e => { const b = e.target.closest('.time'); if (!b || b.disabled) return; rtVal = b.dataset.t; sel = null; renderTimes(); loadBusy(); };
rd.onchange = () => { sel = null; renderTimes(); loadBusy(); };

function drawTables() {
  stage.innerHTML = stageDecor({ pool: tr('pool'), terrace: tr('terrace'), hall: tr('hall') }) +
    TABLES.map(tb => tableHTML(tb, busy.has(tb.id) ? 'busy' : sel === tb.id ? 'sel' : 'free')).join('');
  const tb = TABLES.find(x => x.id === sel);
  $('#selInfo').textContent = tb ? `${tr('table')} ${tb.id} · ${tb.seats} ${tr('seats')}${tb.seats >= 8 ? ' · ' + tr('vip') : ''}` : '';
  const b = TABLES.filter(t => busy.has(t.id)).length;
  $('#counter').textContent = tr('counter', { a: TABLES.length - b, b });
}
function fit() {
  const s = Math.min(1, ($('#wrap').clientWidth - 8) / 900);
  box.style.width = 900 * s + 'px'; box.style.height = 560 * s + 'px'; stage.style.transform = `scale(${s})`;
}
async function loadBusy() {
  const { data, error } = await db.from('busy_tables').select('table_id').eq('reservation_date', rd.value).eq('reservation_time', rtVal);
  busy = new Set(error ? [] : data.map(x => x.table_id));
  if (busy.has(sel)) sel = null;
  drawTables();
}
stage.onclick = e => {
  const el = e.target.closest('.tbl'); if (!el || el.classList.contains('busy')) return;
  sel = +el.dataset.id; drawTables();
};
stage.addEventListener('mousemove', e => {
  const el = e.target.closest('.tbl'), tip = $('#tip');
  if (!el) return (tip.hidden = true);
  const tb = TABLES.find(x => x.id === +el.dataset.id), isBusy = busy.has(tb.id);
  tip.hidden = false;
  tip.innerHTML = `<b>${tr('table')} ${tb.id}</b> · ${tb.seats} ${tr('seats')}${tb.seats >= 8 ? ' · ' + tr('vip') : ''}<br>${isBusy ? '🔴 ' + tr('busy') : '🟢 ' + tr('free')}`;
  tip.style.left = e.clientX + 16 + 'px'; tip.style.top = e.clientY + 16 + 'px';
});
stage.addEventListener('mouseleave', () => $('#tip').hidden = true);
$('#viewBtn').onclick = e => { const on = box.classList.toggle('d3'); e.target.classList.toggle('on', on); e.target.textContent = on ? '3D' : '2D'; };
addEventListener('resize', fit);

const msg = text => { const m = $('#msg'); m.className = 'msg err'; m.textContent = text; };

$('#resForm').onsubmit = async e => {
  e.preventDefault();
  const tb = TABLES.find(x => x.id === sel);
  if (!tb) return msg(tr('pick_table'));
  const guests = parseInt($('#gs').value, 10);
  if (guests > tb.seats) return msg(tr('too_many', { n: tb.seats }));
  const phone = $('#ph').value.replace(/[\s\-()]/g, '');
  if (!/^\+?\d{9,15}$/.test(phone)) return msg(tr('bad_phone'));

  const row = {
    table_id: sel, reservation_date: rd.value, reservation_time: rtVal,
    first_name: $('#fn').value.trim(), last_name: $('#ln').value.trim(),
    phone, email: $('#em').value.trim() || null, guests, comment: $('#cm').value.trim() || null
  };
  $('#submit').disabled = true;
  const { error } = await db.from('reservations').insert(row);
  $('#submit').disabled = false;
  if (error) {
    if (error.code === '23505' || /row-level/i.test(error.message)) { msg(tr('res_taken')); sel = null; loadBusy(); }
    else msg(tr('res_err'));
    return;
  }
  try {
    if (typeof emailjs !== 'undefined' && EMAILJS.publicKey) emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, {
      table: row.table_id, date: row.reservation_date, time: row.reservation_time, name: row.first_name + ' ' + row.last_name,
      phone: row.phone, email: row.email || '-', guests: row.guests, comment: row.comment || '-'
    }, { publicKey: EMAILJS.publicKey });
  } catch (err) { console.warn(err); }

  $('#msg').className = 'msg';
  openModal(`<div class="ok-box"><div class="ok-ic">✓</div><h2>${tr('ok_title')}</h2><p style="color:var(--muted)">${tr('ok_text')}</p>
    <div class="ok-sum"><b>${tr('table')} ${row.table_id}</b><span>${row.reservation_date} · ${row.reservation_time}</span><span>${esc(row.first_name)} ${esc(row.last_name)} · ${row.guests}</span></div>
    <button class="btn" onclick="closeModal()">${tr('close')}</button></div>`);
  $('#resForm').reset(); sel = null; loadBusy();
};

/* =====================================================
   9. კონტაქტი
===================================================== */
$('#addr').textContent = ADDRESS;
$('#route').href = `https://www.google.com/maps/dir/?api=1&destination=${COORDS.lat},${COORDS.lng}`;
$('#tel').textContent = PHONE_DISPLAY;
$('#tel').href = 'tel:' + PHONE_LINK;   // დაჭერისას ზარი იწყება
$('#socials').innerHTML = `
  <a href="${SOCIALS.facebook}" target="_blank" rel="noopener">Facebook ↗</a>
  <a href="${SOCIALS.instagram}" target="_blank" rel="noopener">Instagram ↗</a>
  <a href="${SOCIALS.tiktok}" target="_blank" rel="noopener">TikTok ↗</a>`;
$('#map').src = `https://www.google.com/maps?q=${COORDS.lat},${COORDS.lng}&z=16&output=embed`;

/* =====================================================
   სტარტი
===================================================== */
document.addEventListener('langchange', () => { closeModal(); renderMenu(); renderHome(); drawTables(); });
initLayout(); applyI18n(); renderMenu(); drawTables(); route();
loadSettings(); loadMenu(); loadGallery();
setInterval(updateOpen, 60000);