

const SUPABASE_URL = 'https://saokjorjaqcmoixkwowp.supabase.co';
const SUPABASE_KEY = 'sb_publishable_o0SFKA-q6IuYeiTHNfiHQQ_6rfLutGl';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const PHONE_DISPLAY = '551 700 700';
const PHONE_LINK = '+995551700700';
const SOCIALS = {
  tiktok: 'https://www.tiktok.com/@newspacerustavi',
  instagram: 'https://www.instagram.com/newspacerustavi',
  facebook: 'https://www.facebook.com/Newspacerustavi'
};
const COORDS = { lat: 41.5762377, lng: 44.9930384 };
const ADDRESS = 'New Space Rustavi, Rustavi, Georgia, 3700';
const EMAILJS = { publicKey: '', serviceId: '', templateId: '' };   // Gmail-ის შეტყობინებისთვის (არასავალდებულო)

/* ====== მაგიდები (საიტი და ადმინი ერთსა და იმავეს იყენებს) ====== */
const TIMES = Array.from({ length: 11 }, (_, i) => String(12 + i).padStart(2, '0') + ':00');
const TABLES = [
  { id: 1, seats: 4, shape: 'round', x: 110, y: 90 },
  { id: 2, seats: 4, shape: 'round', x: 110, y: 235 },
  { id: 3, seats: 6, shape: 'rect',  x: 125, y: 385 },
  { id: 4, seats: 4, shape: 'round', x: 790, y: 90 },
  { id: 5, seats: 4, shape: 'round', x: 790, y: 235 },
  { id: 6, seats: 6, shape: 'rect',  x: 775, y: 385 },
  { id: 7, seats: 2, shape: 'round', x: 330, y: 270 },
  { id: 8, seats: 2, shape: 'round', x: 450, y: 270 },
  { id: 9, seats: 2, shape: 'round', x: 570, y: 270 },
  { id: 10, seats: 4, shape: 'round', x: 310, y: 395 },
  { id: 11, seats: 4, shape: 'round', x: 450, y: 395 },
  { id: 12, seats: 4, shape: 'round', x: 590, y: 395 },
  { id: 13, seats: 2, shape: 'round', x: 90,  y: 492 },
  { id: 14, seats: 4, shape: 'round', x: 215, y: 492 },
  { id: 15, seats: 8, shape: 'rect',  x: 450, y: 492 },   // VIP
  { id: 16, seats: 4, shape: 'round', x: 685, y: 492 },
  { id: 17, seats: 2, shape: 'round', x: 810, y: 492 }
];

function tableHTML(tb, st, title = '') {
  const rect = tb.shape === 'rect';
  const W = rect ? 60 + tb.seats * 14 : 40 + tb.seats * 7;
  const H = rect ? 54 : W;
  let chairs = '';
  if (rect) {
    const k = Math.ceil(tb.seats / 2);
    for (let i = 0; i < tb.seats; i++) {
      const top = i < k, n = top ? k : tb.seats - k, idx = top ? i : i - k;
      chairs += `<i class="chair" style="left:${W * (idx + .5) / n - 7}px;top:${top ? -18 : H + 4}px"></i>`;
    }
  } else {
    for (let i = 0; i < tb.seats; i++) {
      const a = 2 * Math.PI * i / tb.seats - Math.PI / 2;
      chairs += `<i class="chair" style="left:${W / 2 + Math.cos(a) * (W / 2 + 10) - 7}px;top:${H / 2 + Math.sin(a) * (H / 2 + 10) - 7}px"></i>`;
    }
  }
  return `<div class="tbl ${st} ${rect ? 'rect' : ''} ${tb.seats >= 8 ? 'vip' : ''}" data-id="${tb.id}"
    style="left:${tb.x}px;top:${tb.y}px;width:${W}px;height:${H}px" title="${title}">${chairs}<span class="top">${tb.id}</span></div>`;
}

function stageDecor(L) {
  const plants = [[24, 160], [876, 160], [24, 300], [876, 300], [450, 218]]
    .map(p => `<i class="plant" style="left:${p[0]}px;top:${p[1]}px"></i>`).join('');
  const lamps = [[230, 62], [670, 62], [230, 340], [670, 340]]
    .map(p => `<i class="lamp" style="left:${p[0]}px;top:${p[1]}px"></i>`).join('');
  return `<div class="pool">${L.pool}</div>${plants}${lamps}
    <span class="zone" style="left:24px;top:14px">${L.terrace}</span>
    <span class="zone" style="right:24px;top:14px">${L.terrace}</span>
    <span class="zone" style="left:50%;top:327px;transform:translateX(-50%)">${L.hall}</span>`;
}