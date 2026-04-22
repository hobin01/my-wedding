// ─────────────────────────────────────────────────────────────────────────────
// CONFIG → INVITE_DATA 어댑터
// config.js 의 원본 값을 섹션 컴포넌트가 바로 쓸 수 있는 파생 필드로 확장.
// 이 파일은 수정할 필요 없습니다. 내용 교체는 config.js 에서만 하세요.
// ─────────────────────────────────────────────────────────────────────────────
(function () {
  const CONFIG = window.CONFIG;
  if (!CONFIG) {
    console.error('[invitation] config.js 가 먼저 로드되어야 합니다.');
    return;
  }

  // ── 날짜 파생 ───────────────────────────────────────────────────────────
  // 시차 영향을 받지 않도록 ISO 문자열의 벽시계 성분(년·월·일·시·분)을 직접 파싱.
  // 예: '2026-11-07T13:30:00+09:00' → year=2026, month=11, day=7, hour=13, minute=30.
  // 뷰어의 로컬 타임존과 무관하게 결혼식 당일 한국 시간이 그대로 표시됩니다.
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(CONFIG.date.datetime);
  if (!isoMatch) {
    console.error('[invitation] config.date.datetime 은 ISO 8601 형식이어야 합니다. 예: 2026-11-07T13:30:00+09:00');
    return;
  }
  const year = +isoMatch[1];
  const monthIdx = +isoMatch[2] - 1;
  const day = +isoMatch[3];
  const hour24 = +isoMatch[4];
  const minute = +isoMatch[5];
  // 이 Date 는 "로컬 타임존의 벽시계 시간"으로 해석됩니다. 요일/D-Day 계산용.
  const dt = new Date(year, monthIdx, day, hour24, minute);
  const dow = dt.getDay();

  const WEEKDAYS_KO = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const WEEKDAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTHS_EN = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

  const hour12 = ((hour24 + 11) % 12) + 1;
  const ampm = hour24 < 12 ? '오전' : '오후';
  const ampmEn = hour24 < 12 ? 'AM' : 'PM';

  const pad2 = (n) => String(n).padStart(2, '0');

  const date = {
    raw: dt,
    year,
    month: monthIdx + 1,
    monthIdx,
    day,
    hour: hour24,
    minute,
    hour12,
    ampm,
    ampmEn,
    monthEn: MONTHS_EN[monthIdx],
    dayOfWeekKo: WEEKDAYS_KO[dow],
    dayOfWeekEn: WEEKDAYS_EN[dow],
    dayOfWeekEnShort: WEEKDAYS_EN[dow].slice(0, 3).toUpperCase(),
    firstDayOfMonth: new Date(year, monthIdx, 1).getDay(),
    daysInMonth: new Date(year, monthIdx + 1, 0).getDate(),
    // 표시용 문자열
    displayKo: `${year}년 ${monthIdx + 1}월 ${day}일 ${WEEKDAYS_KO[dow]} ${ampm} ${hour12}시${minute ? ' ' + minute + '분' : ''}`,
    displayDot: `${year}.${pad2(monthIdx + 1)}.${pad2(day)}`,
    displaySlash: `${year} · ${pad2(monthIdx + 1)} · ${pad2(day)} · ${WEEKDAYS_EN[dow].slice(0, 3).toUpperCase()}`,
    hourSpaced: `${hour12} : ${pad2(minute)} ${ampmEn}`,
    hourKo: `${ampm} ${hour12}시${minute ? ' ' + minute + '분' : ''}`,
    venueLineKo: `${ampm} ${hour12}시${minute ? ' ' + minute + '분' : ''} · ${CONFIG.venue.name}`,
  };

  // ── 부모 표시용 헬퍼 (구분자 " · " 유지) ────────────────────────────────
  const parentsLine = (p) => `${p.father} · ${p.mother}`;

  // ── INVITE_DATA 구성 ────────────────────────────────────────────────────
  window.INVITE_DATA = {
    meta: CONFIG.meta,
    groom: {
      ...CONFIG.groom,
      parentsLine: parentsLine(CONFIG.groom.parents),
    },
    bride: {
      ...CONFIG.bride,
      parentsLine: parentsLine(CONFIG.bride.parents),
    },
    date,
    venue: CONFIG.venue,
    accounts: CONFIG.accounts,
    invitation: CONFIG.invitation,
    quote: CONFIG.quote || null,
    transport: CONFIG.transport,
    notices: CONFIG.notices || [],
  };

  // ── 갤러리 자동 탐색 ────────────────────────────────────────────────────
  // CONFIG.gallery.files 가 지정되어 있으면 그대로 사용, 아니면 assets/gallery/ 아래
  // NN.{jpg,jpeg,png,webp} 파일을 01 부터 순서대로 탐색합니다.
  window.GALLERY_LIST = [];
  window.__galleryReady = false;

  async function discoverGallery() {
    const gc = CONFIG.gallery || {};
    const base = './assets/gallery/';

    if (Array.isArray(gc.files) && gc.files.length > 0) {
      return gc.files.map((f) => (f.startsWith('./') || f.startsWith('/') || f.includes('://')) ? f : base + f);
    }

    const max = gc.maxScan || 30;
    const exts = ['jpg', 'jpeg', 'png', 'webp'];

    const probeOne = (i) => new Promise((resolve) => {
      const num = pad2(i);
      let remaining = exts.length;
      let settled = false;
      exts.forEach((ext) => {
        const img = new Image();
        const path = `${base}${num}.${ext}`;
        img.onload = () => {
          if (!settled) { settled = true; resolve({ i, path }); }
        };
        img.onerror = () => {
          remaining -= 1;
          if (remaining === 0 && !settled) { settled = true; resolve(null); }
        };
        img.src = path;
      });
    });

    const found = [];
    const BATCH = 5;
    for (let start = 1; start <= max; start += BATCH) {
      const size = Math.min(BATCH, max - start + 1);
      const batch = await Promise.all(
        Array.from({ length: size }, (_, k) => probeOne(start + k))
      );
      const hits = batch.filter(Boolean);
      if (hits.length === 0) break;
      found.push(...hits);
    }
    return found.sort((a, b) => a.i - b.i).map((h) => h.path);
  }

  discoverGallery().then((list) => {
    window.GALLERY_LIST = list;
    window.__galleryReady = true;
    window.dispatchEvent(new CustomEvent('gallery-ready', { detail: list }));
  });
})();
