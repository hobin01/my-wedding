// ──────────────────────────────────────────────────────────────────────
// 청첩장 테마 — 화원 (花園) 단일 테마
// 섹션/컴포넌트에서 이 `theme` 객체를 참조합니다. 색 변경 시 여기만 수정하세요.
// ──────────────────────────────────────────────────────────────────────
const THEME = {
  name: '화원 花園',
  bg: '#FBF6EE',         // 메인 배경 — 따뜻한 아이보리
  bgAccent: '#F5EFE4',   // 섹션 번갈아가며 쓸 보조 배경
  card: '#FFFDF8',       // 카드/입력창 배경
  text: '#2B2620',       // 본문 텍스트
  textSoft: '#5F564B',   // 설명 텍스트
  textMuted: '#A09789',  // 보조 라벨
  line: '#E8DFD0',       // 라인 · 테두리
  lineSoft: '#F0E8DA',   // 얕은 라인
  accent: '#2E4A7B',     // 청화 블루 — 포인트 컬러
  accentSoft: '#A98E6B', // 보조 포인트
  flowerVariant: 'full',
  flowerDensity: 1,
};

// ──────────────────────────────────────────────────────────────────────
// 페이드인 — IntersectionObserver 기반 잔잔한 등장
// ──────────────────────────────────────────────────────────────────────
function useFadeIn(threshold = 0.15) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity 900ms cubic-bezier(.2,.7,.3,1) ${delay}ms, transform 900ms cubic-bezier(.2,.7,.3,1) ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 섹션 타이틀 — 영문 kicker + 국문 헤더 + 장식선
// ──────────────────────────────────────────────────────────────────────
function SectionTitle({ en, ko, align = 'center' }) {
  return (
    <FadeIn style={{ textAlign: align, marginBottom: 28 }}>
      <div style={{
        fontFamily: '"Cormorant Garamond", "Noto Serif KR", serif',
        fontSize: 13, letterSpacing: 4, textTransform: 'uppercase',
        color: THEME.accent, fontStyle: 'italic', fontWeight: 400,
        marginBottom: 10,
      }}>{en}</div>
      <div style={{
        fontFamily: '"Noto Serif KR", serif',
        fontSize: 17, letterSpacing: 6, color: THEME.text,
        fontWeight: 400, marginBottom: 14,
      }}>{ko}</div>
      <div style={{ display: 'flex', justifyContent: align === 'center' ? 'center' : 'flex-start', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 20, height: 1, background: THEME.accent, opacity: 0.4 }} />
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: THEME.accent, opacity: 0.5 }} />
        <div style={{ width: 20, height: 1, background: THEME.accent, opacity: 0.4 }} />
      </div>
    </FadeIn>
  );
}

// ──────────────────────────────────────────────────────────────────────
// 사진 플레이스홀더 — 실제 이미지로 교체 전까지 사용
// 실제 배포 시 <img src="..." /> 로 바꾸는 것을 권장 (HANDOFF.md 참조)
// ──────────────────────────────────────────────────────────────────────
function PhotoPlaceholder({ tone, label, width, height, style = {}, rounded = false }) {
  return (
    <div style={{
      width, height, background: tone,
      borderRadius: rounded ? '50%' : 0,
      position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '3px 3px', mixBlendMode: 'overlay',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 14px)',
      }} />
      {label && (
        <div style={{
          position: 'absolute', bottom: 8, left: 10,
          fontFamily: '"JetBrains Mono", "SF Mono", monospace',
          fontSize: 9, letterSpacing: 0.5,
          color: 'rgba(255,255,255,0.75)',
          textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        }}>{label}</div>
      )}
    </div>
  );
}

// 실제 이미지 컴포넌트 — src 가 없거나 로드 실패 시 PhotoPlaceholder 로 자동 폴백.
// object-fit: cover 로 원본 비율과 관계없이 지정한 width/height 영역을 꽉 채웁니다.
function Photo({ src, alt, width, height, style = {}, rounded = false, tone, label, eager = false }) {
  const [failed, setFailed] = React.useState(false);
  const fallbackTone = tone || 'linear-gradient(160deg, #ece4d2 0%, #cfbfa0 60%, #9a8568 100%)';
  if (!src || failed) {
    return (
      <PhotoPlaceholder tone={fallbackTone} label={label} width={width} height={height}
        style={{ borderRadius: rounded ? '50%' : (style.borderRadius ?? 0), ...style }} rounded={rounded} />
    );
  }
  return (
    <img src={src} alt={alt || ''}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      style={{
        width, height, objectFit: 'cover',
        borderRadius: rounded ? '50%' : 0,
        display: 'block',
        ...style,
      }}
    />
  );
}

Object.assign(window, { THEME, useFadeIn, FadeIn, SectionTitle, PhotoPlaceholder, Photo });
