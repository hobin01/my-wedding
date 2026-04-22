// ──────────────────────────────────────────────────────────────────────
// 청첩장 섹션 — Part B (Gallery / Map / Accounts / Share / Footer)
// 모든 표시 값은 window.INVITE_DATA (config.js 에서 파생) 를 참조합니다.
// ──────────────────────────────────────────────────────────────────────

// 07. Gallery — 라이트박스 (assets/gallery/ 자동 탐색 결과 사용)
// 기본 7장(Hero 1 + Strip 4 + Grid 2) 까지 표시하고, 초과분은 "사진 더 보기" 토글로 확장.
// 라이트박스는 확장 여부와 무관하게 전체 사진을 순회합니다.
const GALLERY_VISIBLE_LIMIT = 7;

function GallerySection() {
  const [photos, setPhotos] = React.useState(window.GALLERY_LIST || []);
  const [lightbox, setLightbox] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    if (window.__galleryReady) {
      setPhotos(window.GALLERY_LIST || []);
      return;
    }
    const onReady = (e) => setPhotos((e && e.detail) || window.GALLERY_LIST || []);
    window.addEventListener('gallery-ready', onReady);
    return () => window.removeEventListener('gallery-ready', onReady);
  }, []);

  // 사진이 없으면 섹션 자체를 숨깁니다 (템플릿 초기 상태 대응)
  if (!photos || photos.length === 0) return null;

  const hasMore = photos.length > GALLERY_VISIBLE_LIMIT;
  const visibleCount = hasMore && !expanded ? GALLERY_VISIBLE_LIMIT : photos.length;

  const hero = photos[0];
  const strip = photos.slice(1, Math.min(5, visibleCount));   // 최대 4장
  const grid = photos.slice(5, visibleCount);                  // 나머지 (기본 2, 확장시 N-5)
  const hiddenCount = photos.length - GALLERY_VISIBLE_LIMIT;

  return (
    <section style={{ padding: '70px 0 60px', background: THEME.bgAccent }}>
      <div style={{ padding: '0 28px' }}>
        <SectionTitle en="Gallery" ko="갤 러 리" />
      </div>

      <FadeIn delay={100}>
        <div style={{ padding: '30px 28px 0', position: 'relative' }}>
          <Photo src={hero} width="100%" height={280} alt="Gallery hero" />
          <div onClick={() => setLightbox(0)}
            style={{ position: 'absolute', inset: '30px 28px 0', cursor: 'pointer' }} />
        </div>
      </FadeIn>

      {strip.length > 0 && (
        <FadeIn delay={200}>
          <div style={{
            marginTop: 10, display: 'flex', gap: 6,
            overflowX: 'auto', padding: '0 28px',
            scrollSnapType: 'x mandatory',
          }}>
            {strip.map((src, i) => (
              <div key={i} onClick={() => setLightbox(i + 1)}
                style={{ flexShrink: 0, cursor: 'pointer', scrollSnapAlign: 'start' }}>
                <Photo src={src} width={138} height={180} alt={`Gallery ${i + 2}`} />
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {grid.length > 0 && (
        <FadeIn delay={300}>
          <div style={{
            marginTop: 10, padding: '0 28px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6,
          }}>
            {grid.map((src, i) => (
              <div key={i} onClick={() => setLightbox(i + 5)} style={{ cursor: 'pointer' }}>
                <Photo src={src} width="100%" height={140} alt={`Gallery ${i + 6}`} />
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      {hasMore && (
        <FadeIn delay={350}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, padding: '0 28px' }}>
            <button onClick={() => setExpanded((v) => !v)} style={{
              padding: '10px 22px', background: 'transparent',
              border: `1px solid ${THEME.line}`, borderRadius: 0,
              fontFamily: '"Noto Sans KR", sans-serif',
              fontSize: 11, color: THEME.textSoft, letterSpacing: 2, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span>{expanded ? '접기' : `사진 더 보기 +${hiddenCount}`}</span>
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none" stroke={THEME.accent} strokeWidth="1.5"
                style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
                <path d="M2 3.5L5 6.5 8 3.5"/>
              </svg>
            </button>
          </div>
        </FadeIn>
      )}

      {lightbox !== null && (
        <Lightbox photos={photos} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />
      )}
    </section>
  );
}

function Lightbox({ photos, index, onClose, onChange }) {
  const go = (delta) => onChange((index + delta + photos.length) % photos.length);
  React.useEffect(() => {
    const k = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(15,18,25,0.92)',
      zIndex: 100, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '85%', maxWidth: 320, aspectRatio: '3/4', position: 'relative' }}>
        <Photo src={photos[index]} width="100%" height="100%" alt={`Photo ${index + 1}`} eager={true} />
      </div>
      <div style={{
        marginTop: 20, fontFamily: '"Cormorant Garamond", serif',
        fontSize: 13, letterSpacing: 3, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic',
      }}>{String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</div>
      <div style={{ position: 'absolute', top: 16, right: 20, cursor: 'pointer' }} onClick={onClose}>
        <svg width="22" height="22" viewBox="0 0 22 22" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" fill="none" strokeLinecap="round"><path d="M3 3l16 16M19 3L3 19"/></svg>
      </div>
      <div onClick={(e) => { e.stopPropagation(); go(-1); }} style={{ position: 'absolute', top: '50%', left: 10, cursor: 'pointer', padding: 10 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round"><path d="M13 3l-7 7 7 7"/></svg>
      </div>
      <div onClick={(e) => { e.stopPropagation(); go(1); }} style={{ position: 'absolute', top: '50%', right: 10, cursor: 'pointer', padding: 10 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round"><path d="M7 3l7 7-7 7"/></svg>
      </div>
    </div>
  );
}

// 08. Map — 카카오맵 JS SDK 임베드 + 앱 딥링크
// kakao.maps 전역이 로드되어 있으면 실제 인터랙티브 지도(드래그/줌) 로 표시합니다.
// 로드 실패/키 미설정 시엔 기존 SVG 장식 이미지로 폴백.
function MapFallbackSVG() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 335 200" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
      <g stroke="#D8DDE5" strokeWidth="1" fill="none">
        <path d="M0 40 L335 60" /><path d="M0 100 L335 90" /><path d="M0 160 L335 150" />
        <path d="M80 0 L100 200" /><path d="M200 0 L190 200" /><path d="M280 0 L285 200" />
      </g>
      <g stroke="#C8D0DC" strokeWidth="2.5" fill="none">
        <path d="M0 120 Q167 110 335 125" />
      </g>
      <g fill="#E5E9F0">
        <rect x="25" y="10" width="45" height="25"/>
        <rect x="110" y="15" width="75" height="40"/>
        <rect x="210" y="5" width="60" height="50"/>
        <rect x="20" y="70" width="55" height="20"/>
        <rect x="220" y="70" width="55" height="15"/>
        <rect x="15" y="130" width="70" height="25"/>
        <rect x="115" y="135" width="65" height="55"/>
        <rect x="210" y="160" width="60" height="30"/>
      </g>
    </svg>
  );
}

// 앱 스킴 먼저 시도 후 웹 URL 로 폴백.
// 앱이 설치되어 있으면 탭이 background 로 가면서 폴백이 취소됩니다.
function openMapApp(scheme, webUrl) {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isMobile = /Android|iPhone|iPad|iPod/i.test(ua);
  if (!isMobile || !scheme) {
    window.open(webUrl, '_blank', 'noopener');
    return;
  }
  const fallback = setTimeout(() => {
    if (!document.hidden) window.location.href = webUrl;
  }, 1500);
  const onVis = () => { if (document.hidden) clearTimeout(fallback); };
  document.addEventListener('visibilitychange', onVis, { once: true });
  window.location.href = scheme;
}

function MapSection() {
  const d = window.INVITE_DATA;
  const { lat, lng, name, address } = d.venue;
  const mapRef = React.useRef(null);
  // 'pending' : SDK 로드 대기중 / 'map' : 인터랙티브 렌더 / 'fallback' : SVG
  const [mode, setMode] = React.useState('pending');

  React.useEffect(() => {
    let disposed = false;
    const init = () => {
      if (!window.kakao || !window.kakao.maps) return false;
      window.kakao.maps.load(() => {
        if (disposed || !mapRef.current) return;
        const center = new window.kakao.maps.LatLng(lat, lng);
        const map = new window.kakao.maps.Map(mapRef.current, { center, level: 3 });
        new window.kakao.maps.Marker({ position: center, map });
        setMode('map');
      });
      return true;
    };
    if (init()) return;
    // SDK 아직 미로드 — 짧게 폴링
    const iv = setInterval(() => { if (init()) clearInterval(iv); }, 300);
    const to = setTimeout(() => {
      clearInterval(iv);
      setMode((m) => (m === 'pending' ? 'fallback' : m));
    }, 3000);
    return () => { disposed = true; clearInterval(iv); clearTimeout(to); };
  }, [lat, lng]);

  const encName = encodeURIComponent(name);
  // 네이버 지도 URL Scheme 공식 규격:
  // nmap://place?lat=..&lng=..&name=..&appname={호출한 앱/웹 식별자}
  // appname 은 필수 파라미터이며, 웹에서는 관례적으로 현재 호스트명을 사용합니다.
  const appName = (typeof window !== 'undefined' && window.location.hostname) || 'wedding.invitation';
  const openNaver = () => openMapApp(
    `nmap://place?lat=${lat}&lng=${lng}&name=${encName}&appname=${encodeURIComponent(appName)}`,
    `https://map.naver.com/v5/search/${encName}`
  );
  const openKakao = () => openMapApp(
    `kakaomap://look?p=${lat},${lng}`,
    `https://map.kakao.com/link/map/${encName},${lat},${lng}`
  );
  const openKakaoRoute = () => openMapApp(
    `kakaomap://route?ep=${lat},${lng}&by=PUBLICTRANSIT`,
    `https://map.kakao.com/link/to/${encName},${lat},${lng}`
  );

  const btnStyle = {
    flex: 1, padding: '10px 8px', background: THEME.card,
    border: `1px solid ${THEME.line}`, borderRadius: 2,
    fontFamily: '"Noto Sans KR", sans-serif', fontSize: 11,
    color: THEME.textSoft, letterSpacing: 0.5, cursor: 'pointer',
  };

  return (
    <section style={{ padding: '70px 28px 60px', background: THEME.bg }}>
      <SectionTitle en="Directions" ko="오 시 는 길" />

      <FadeIn delay={100} style={{ marginTop: 30 }}>
        <div style={{
          width: '100%', height: 240, position: 'relative',
          background: '#EEF1F5', border: `1px solid ${THEME.lineSoft}`, overflow: 'hidden',
        }}>
          {/* 카카오맵 컨테이너 — SDK 로드되면 여기에 지도 그려짐 */}
          <div ref={mapRef} style={{
            position: 'absolute', inset: 0,
            opacity: mode === 'map' ? 1 : 0, transition: 'opacity .3s',
          }} />
          {mode !== 'map' && (
            <React.Fragment>
              <MapFallbackSVG />
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -100%)' }}>
                <svg width="30" height="38" viewBox="0 0 30 38">
                  <path d="M15 1 C7 1 2 6 2 14 C2 22 15 36 15 36 S28 22 28 14 C28 6 23 1 15 1 Z"
                    fill={THEME.accent} stroke="#fff" strokeWidth="1.5"/>
                  <circle cx="15" cy="14" r="4" fill="#fff"/>
                </svg>
              </div>
              {mode === 'fallback' && (
                <div style={{
                  position: 'absolute', bottom: 8, right: 10,
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                  color: THEME.textMuted, letterSpacing: 0.5,
                }}>map: static</div>
              )}
            </React.Fragment>
          )}
        </div>

        <div style={{ marginTop: 16, fontFamily: '"Noto Serif KR", serif', fontSize: 15, color: THEME.text, letterSpacing: 1, textAlign: 'center' }}>{name}</div>
        <div style={{ fontFamily: '"Noto Sans KR", sans-serif', fontSize: 12, color: THEME.textSoft, textAlign: 'center', marginTop: 4, fontWeight: 300 }}>{address}</div>

        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button onClick={openNaver} style={btnStyle}>네이버 지도</button>
          <button onClick={openKakao} style={btnStyle}>카카오맵</button>
          <button onClick={openKakaoRoute} style={{ ...btnStyle, background: THEME.accent, color: '#fff', border: 'none' }}>길찾기</button>
        </div>
      </FadeIn>

      {d.transport && d.transport.length > 0 && (
        <FadeIn delay={200} style={{ marginTop: 32 }}>
          {d.transport.map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 14, padding: '14px 4px',
              borderBottom: i < d.transport.length - 1 ? `1px solid ${THEME.lineSoft}` : 'none',
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                border: `1px solid ${THEME.accent}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 13, color: THEME.accent, fontStyle: 'italic', flexShrink: 0,
              }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Noto Sans KR", sans-serif', fontSize: 13, color: THEME.text, fontWeight: 500, marginBottom: 3 }}>{item.label}</div>
                <div style={{ fontFamily: '"Noto Sans KR", sans-serif', fontSize: 12, color: THEME.textSoft, lineHeight: 1.6, fontWeight: 300 }}>{item.detail}</div>
              </div>
            </div>
          ))}
        </FadeIn>
      )}
    </section>
  );
}

// 08.5 Notice — 하객 안내 (식사/주차/화환/드레스 코드 등)
function NoticeSection() {
  const d = window.INVITE_DATA;
  const notices = d.notices || [];
  if (notices.length === 0) return null;

  return (
    <section style={{ padding: '60px 28px 60px', background: THEME.bgAccent }}>
      <SectionTitle en="Notice" ko="안 내 사 항" />
      <FadeIn delay={100} style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {notices.map((item, i) => (
          <div key={i} style={{
            display: 'flex', gap: 14, padding: '16px 14px',
            background: THEME.card,
            borderBottom: i < notices.length - 1 ? `1px solid ${THEME.lineSoft}` : 'none',
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: 32, height: 32, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, lineHeight: 1,
            }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: '"Noto Serif KR", serif', fontSize: 13,
                color: THEME.text, fontWeight: 500, letterSpacing: 1, marginBottom: 4,
              }}>{item.title}</div>
              <div style={{
                fontFamily: '"Noto Sans KR", sans-serif', fontSize: 12,
                color: THEME.textSoft, lineHeight: 1.7, fontWeight: 300,
                whiteSpace: 'pre-line',
              }}>{item.detail}</div>
            </div>
          </div>
        ))}
      </FadeIn>
    </section>
  );
}

// 09. Accounts — 계좌번호 복사
function AccountsSection() {
  const d = window.INVITE_DATA;
  const [open, setOpen] = React.useState(null);
  const [copied, setCopied] = React.useState('');
  const note = (d.accounts && d.accounts.note) || '';

  const copy = async (num, label) => {
    try { await navigator.clipboard.writeText(num.replace(/-/g, '')); } catch {}
    setCopied(label);
    setTimeout(() => setCopied(''), 1400);
  };

  const Toggle = ({ id, label }) => (
    <button onClick={() => setOpen(open === id ? null : id)}
      style={{
        width: '100%', padding: '16px 20px', background: THEME.card,
        border: `1px solid ${THEME.line}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: '"Noto Serif KR", serif',
        fontSize: 14, color: THEME.text, letterSpacing: 2, cursor: 'pointer',
      }}>
      <span>{label}</span>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={THEME.accent} strokeWidth="1.5"
        style={{ transform: open === id ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
        <path d="M2 3.5L5 6.5 8 3.5"/>
      </svg>
    </button>
  );

  const AccountRow = ({ a, side }) => (
    <div style={{
      padding: '14px 18px', borderBottom: `1px solid ${THEME.lineSoft}`,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: '"Noto Sans KR", sans-serif', fontSize: 11, color: THEME.textMuted, letterSpacing: 0.5, marginBottom: 2 }}>{a.bank} · {a.name}</div>
        <div style={{ fontFamily: '"Cormorant Garamond", "SF Mono", monospace', fontSize: 14, color: THEME.text, letterSpacing: 1 }}>{a.number}</div>
      </div>
      <button onClick={() => copy(a.number, `${side}-${a.name}`)}
        style={{
          padding: '6px 12px', background: 'transparent',
          border: `1px solid ${THEME.line}`, borderRadius: 0,
          fontFamily: '"Noto Sans KR", sans-serif', fontSize: 10,
          color: THEME.textSoft, cursor: 'pointer', letterSpacing: 1,
        }}>{copied === `${side}-${a.name}` ? '복사됨' : '복사'}</button>
    </div>
  );

  return (
    <section style={{ padding: '70px 28px 60px', background: THEME.bgAccent }}>
      <SectionTitle en="With Heart" ko="마 음 전 하 실 곳" />

      {note && (
        <FadeIn delay={100} style={{ marginTop: 20 }}>
          <div style={{
            textAlign: 'center', fontFamily: '"Noto Serif KR", serif',
            fontSize: 12, color: THEME.textSoft, lineHeight: 2,
            fontWeight: 300, letterSpacing: 0.5, marginBottom: 28,
            whiteSpace: 'pre-line',
          }}>{note}</div>
        </FadeIn>
      )}

      <FadeIn delay={200} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <Toggle id="groom" label="신랑 측 계좌번호" />
          {open === 'groom' && (
            <div style={{ background: THEME.card, border: `1px solid ${THEME.line}`, borderTop: 'none' }}>
              {d.accounts.groom.map((a, i) => <AccountRow key={i} a={a} side="groom" />)}
            </div>
          )}
        </div>
        <div>
          <Toggle id="bride" label="신부 측 계좌번호" />
          {open === 'bride' && (
            <div style={{ background: THEME.card, border: `1px solid ${THEME.line}`, borderTop: 'none' }}>
              {d.accounts.bride.map((a, i) => <AccountRow key={i} a={a} side="bride" />)}
            </div>
          )}
        </div>
      </FadeIn>
    </section>
  );
}

// 10. Share — 카카오 공유 + 링크 복사
// imageUrl 과 link 는 절대 URL 이어야 합니다 (카카오 공유 썸네일 요건).
// config.meta.siteUrl 이 설정되어 있으면 그 값, 아니면 현재 페이지 URL 기준으로 계산합니다.
function ShareSection() {
  const d = window.INVITE_DATA;
  const meta = d.meta;
  const [linkCopied, setLinkCopied] = React.useState(false);

  const isPlaceholder = !meta.siteUrl || meta.siteUrl.includes('YOURNAME');
  const currentDir = `${window.location.origin}${window.location.pathname.replace(/[^/]*$/, '')}`;
  const baseUrl = isPlaceholder ? currentDir : meta.siteUrl;
  const pageUrl = isPlaceholder ? window.location.href : meta.siteUrl;
  const imageUrl = new URL(`assets/${meta.ogImage}`, baseUrl).href;

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(pageUrl); } catch {}
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 1400);
  };

  const shareKakao = () => {
    if (window.Kakao && window.Kakao.Share && window.Kakao.isInitialized && window.Kakao.isInitialized()) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: meta.title,
          description: `${d.date.displayKo}\n${d.venue.name}`,
          imageUrl,
          link: { mobileWebUrl: pageUrl, webUrl: pageUrl },
        },
        buttons: [{
          title: '청첩장 보기',
          link: { mobileWebUrl: pageUrl, webUrl: pageUrl },
        }],
      });
    } else {
      copyLink();
      alert('카카오톡 공유가 설정되어 있지 않습니다. 링크가 복사되었습니다.');
    }
  };

  return (
    <section style={{ padding: '50px 28px 40px', background: THEME.bgAccent }}>
      <FadeIn>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={shareKakao} style={{
            flex: 1, padding: '14px', background: '#FEE500',
            border: 'none', borderRadius: 0,
            fontFamily: '"Noto Sans KR", sans-serif',
            fontSize: 12, color: '#3A2D00', letterSpacing: 1, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 2C4.13 2 1 4.47 1 7.5c0 1.94 1.29 3.64 3.23 4.6L3.5 14.5l2.6-1.73c.62.12 1.25.18 1.9.18 3.87 0 7-2.47 7-5.5S11.87 2 8 2z"/>
            </svg>
            카카오톡 공유하기
          </button>
          <button onClick={copyLink} style={{
            padding: '14px 16px', background: THEME.card,
            border: `1px solid ${THEME.line}`, borderRadius: 0,
            fontFamily: '"Noto Sans KR", sans-serif',
            fontSize: 12, color: THEME.textSoft, letterSpacing: 1, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M5.5 8.5L8.5 5.5M4 9.5l-1 1a2.1 2.1 0 01-3-3l2.5-2.5a2.1 2.1 0 013 0M10 4.5l1-1a2.1 2.1 0 013 3l-2.5 2.5a2.1 2.1 0 01-3 0"/></svg>
            {linkCopied ? '복사됨' : '링크복사'}
          </button>
        </div>
      </FadeIn>
    </section>
  );
}

// 11. Footer
function FooterSection() {
  return (
    <section style={{ padding: '50px 28px 80px', background: THEME.bg, textAlign: 'center', position: 'relative' }}>
      <FadeIn>
        <FlowerScatter width={335} height={80} variant={THEME.flowerVariant} density={THEME.flowerDensity * 0.5} style={{ margin: '0 auto 24px' }} />
      </FadeIn>
      <FadeIn delay={100}>
        <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 12, letterSpacing: 4, color: THEME.accent, fontStyle: 'italic', marginBottom: 10 }}>THANK YOU</div>
        <div style={{ fontFamily: '"Noto Serif KR", serif', fontSize: 13, color: THEME.textSoft, lineHeight: 2, fontWeight: 300 }}>
          함께해 주시는 모든 분들께<br/>진심으로 감사드립니다
        </div>
      </FadeIn>
    </section>
  );
}

Object.assign(window, { GallerySection, MapSection, NoticeSection, AccountsSection, ShareSection, FooterSection });
