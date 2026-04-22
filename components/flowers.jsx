// 꽃 & 장식용 SVG 일러스트 — 섬세한 라인 + 은은한 채색 (백자 청화 팔레트)
// 모든 꽃은 viewBox 안에서 중앙 정렬. 밝은 톤 (흰색, 연노랑, 연분홍) + 청화 포인트.

// 매화 — 작은 꽃잎 5장, 중앙 점
function FlowerPlum({ size = 28, fill = '#ffffff', stroke = '#2E4A7B', accent = '#F5D76E', opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ opacity }}>
      <g transform="translate(20 20)">
        {[0, 72, 144, 216, 288].map((r, i) => (
          <ellipse key={i} cx="0" cy="-9" rx="5.5" ry="7"
            fill={fill} stroke={stroke} strokeWidth="0.7"
            transform={`rotate(${r})`} />
        ))}
        <circle r="2.2" fill={accent} />
        {[0, 72, 144, 216, 288].map((r, i) => (
          <line key={i} x1="0" y1="0" x2="0" y2="-4"
            stroke={stroke} strokeWidth="0.5"
            transform={`rotate(${r})`} />
        ))}
      </g>
    </svg>
  );
}

// 작은 청화 꽃 — 더 추상적, 라인 드로잉
function FlowerBlueLine({ size = 24, stroke = '#2E4A7B', opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ opacity }}>
      <g transform="translate(20 20)" fill="none" stroke={stroke} strokeWidth="0.8" strokeLinecap="round">
        {[0, 60, 120, 180, 240, 300].map((r, i) => (
          <path key={i} d="M0 0 Q-3 -6 0 -10 Q3 -6 0 0" transform={`rotate(${r})`} />
        ))}
        <circle r="1.5" fill={stroke} />
      </g>
    </svg>
  );
}

// 벚꽃 느낌 — 연분홍 5잎
function FlowerCherry({ size = 26, opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ opacity }}>
      <g transform="translate(20 20)">
        {[0, 72, 144, 216, 288].map((r, i) => (
          <path key={i}
            d="M0 -4 Q-4 -7 -3 -11 Q0 -13 3 -11 Q4 -7 0 -4 Z"
            fill="#FCE8EC" stroke="#D9A7B3" strokeWidth="0.4"
            transform={`rotate(${r})`} />
        ))}
        <circle r="1.5" fill="#F5D76E" />
      </g>
    </svg>
  );
}

// 작은 들꽃 — 연노랑
function FlowerYellow({ size = 22, opacity = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ opacity }}>
      <g transform="translate(20 20)">
        {[0, 60, 120, 180, 240, 300].map((r, i) => (
          <ellipse key={i} cx="0" cy="-8" rx="3" ry="5"
            fill="#FAF3D9" stroke="#E0C56E" strokeWidth="0.4"
            transform={`rotate(${r})`} />
        ))}
        <circle r="2" fill="#E0C56E" />
      </g>
    </svg>
  );
}

// 잎사귀 — 작은 가지
function LeafSprig({ size = 40, stroke = '#6B8E7F', opacity = 1, rotate = 0 }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 40 48" style={{ opacity, transform: `rotate(${rotate}deg)` }}>
      <g fill="none" stroke={stroke} strokeWidth="0.7" strokeLinecap="round">
        <path d="M20 46 Q20 30 22 14 Q23 6 22 2" />
        <path d="M22 38 Q28 36 32 32" />
        <ellipse cx="32" cy="31" rx="3" ry="1.5" transform="rotate(-30 32 31)" fill={stroke} fillOpacity="0.15" />
        <path d="M21 28 Q14 27 10 22" />
        <ellipse cx="10" cy="22" rx="3" ry="1.5" transform="rotate(30 10 22)" fill={stroke} fillOpacity="0.15" />
        <path d="M22 18 Q28 16 31 12" />
        <ellipse cx="31" cy="11" rx="2.5" ry="1.2" transform="rotate(-30 31 11)" fill={stroke} fillOpacity="0.15" />
      </g>
    </svg>
  );
}

// 꽃다발 — 여러 꽃이 흩뿌려진 레이아웃 (절대위치)
// variant: 'full' (아이보리+청화+핑크+노랑), 'blue' (청화 위주), 'white' (순백)
function FlowerScatter({ width = 335, height = 180, variant = 'full', density = 1, style = {} }) {
  // 미리 정해진 좌표로 자연스럽게 흩뿌림 (랜덤 X — 결정론적)
  const items = [
    { x: 0.08, y: 0.15, kind: 'leaf', size: 54, rotate: -20, o: 0.5 },
    { x: 0.22, y: 0.35, kind: 'plum', size: 26, o: 0.9 },
    { x: 0.35, y: 0.12, kind: 'cherry', size: 22, o: 0.8 },
    { x: 0.48, y: 0.55, kind: 'yellow', size: 20, o: 0.85 },
    { x: 0.62, y: 0.28, kind: 'blueline', size: 24, o: 0.9 },
    { x: 0.75, y: 0.5, kind: 'plum', size: 22, o: 0.75 },
    { x: 0.88, y: 0.2, kind: 'cherry', size: 18, o: 0.7 },
    { x: 0.15, y: 0.7, kind: 'leaf', size: 40, rotate: 30, o: 0.4 },
    { x: 0.4, y: 0.8, kind: 'yellow', size: 16, o: 0.7 },
    { x: 0.56, y: 0.82, kind: 'blueline', size: 20, o: 0.85 },
    { x: 0.82, y: 0.75, kind: 'plum', size: 20, o: 0.75 },
    { x: 0.92, y: 0.55, kind: 'leaf', size: 36, rotate: -10, o: 0.4 },
    { x: 0.05, y: 0.45, kind: 'cherry', size: 16, o: 0.7 },
    { x: 0.3, y: 0.6, kind: 'blueline', size: 18, o: 0.75 },
    { x: 0.68, y: 0.08, kind: 'yellow', size: 14, o: 0.6 },
  ];

  const filtered = variant === 'blue'
    ? items.map(i => (i.kind === 'cherry' || i.kind === 'yellow') ? { ...i, kind: 'blueline', o: i.o * 0.8 } : i)
    : variant === 'white'
      ? items.map(i => (i.kind === 'blueline' || i.kind === 'yellow' || i.kind === 'cherry') ? { ...i, kind: 'plum', o: i.o * 0.5 } : i)
      : items;

  const active = filtered.slice(0, Math.floor(filtered.length * density));

  const render = (it) => {
    const p = { size: it.size, opacity: it.o };
    if (it.kind === 'plum') return <FlowerPlum {...p} />;
    if (it.kind === 'cherry') return <FlowerCherry {...p} />;
    if (it.kind === 'yellow') return <FlowerYellow {...p} />;
    if (it.kind === 'blueline') return <FlowerBlueLine {...p} />;
    if (it.kind === 'leaf') return <LeafSprig {...p} rotate={it.rotate} />;
    return null;
  };

  return (
    <div style={{ position: 'relative', width, height, ...style }}>
      {active.map((it, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: it.x * width - it.size / 2,
          top: it.y * height - it.size / 2,
          transform: it.rotate ? `rotate(${it.rotate}deg)` : undefined,
        }}>{render(it)}</div>
      ))}
    </div>
  );
}

// 얇은 장식 프레임 — 모서리 장식
function CornerOrnament({ size = 40, stroke = '#2E4A7B', opacity = 0.5, flipX = false, flipY = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{
      opacity,
      transform: `${flipX ? 'scaleX(-1)' : ''} ${flipY ? 'scaleY(-1)' : ''}`,
    }}>
      <g fill="none" stroke={stroke} strokeWidth="0.7" strokeLinecap="round">
        <path d="M2 20 Q2 2 20 2" />
        <circle cx="8" cy="8" r="1.5" fill={stroke} fillOpacity="0.3" />
        <path d="M8 14 Q5 14 5 11" />
        <path d="M14 8 Q14 5 11 5" />
      </g>
    </svg>
  );
}

// 얇은 세로 장식선
function VerticalOrnament({ height = 60, stroke = '#2E4A7B', opacity = 0.4 }) {
  return (
    <svg width="12" height={height} viewBox={`0 0 12 ${height}`} style={{ opacity }}>
      <line x1="6" y1="0" x2="6" y2={height} stroke={stroke} strokeWidth="0.5" />
      <circle cx="6" cy={height * 0.5} r="2" fill="none" stroke={stroke} strokeWidth="0.5" />
      <circle cx="6" cy={height * 0.5} r="0.8" fill={stroke} />
    </svg>
  );
}

Object.assign(window, {
  FlowerPlum, FlowerBlueLine, FlowerCherry, FlowerYellow, LeafSprig,
  FlowerScatter, CornerOrnament, VerticalOrnament,
});
