// ──────────────────────────────────────────────────────────────────────
// 청첩장 섹션 — Part A (Cover / Invitation / Profile / Parents / DateTime / Calendar)
// 표시되는 모든 값은 window.INVITE_DATA (config.js 에서 파생) 를 참조합니다.
// 하드코딩된 문자열은 없습니다 — 수정은 config.js 에서.
// ──────────────────────────────────────────────────────────────────────

const _pad2 = (n) => String(n).padStart(2, '0');
const _assetPath = (filename) => `./assets/${filename}`;

// 01. Cover — 표지
function CoverSection() {
  const d = window.INVITE_DATA;
  const hero = d.meta.heroImage;
  return (
    <section style={{
      minHeight: 680,
      padding: hero ? '0 0 60px' : '80px 28px 60px',
      background: THEME.bg, position: 'relative', overflow: 'hidden',
      textAlign: 'center',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {hero ? (
        <div style={{ position: 'relative', width: '100%', height: 360, overflow: 'hidden' }}>
          <Photo src={`./assets/${hero}`} width="100%" height="100%" alt="" eager={true} />
          {/* 하단으로 갈수록 배경과 자연스럽게 이어지도록 그라디언트 오버레이 */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `linear-gradient(to bottom, rgba(251,246,238,0) 55%, ${THEME.bg} 100%)`,
          }} />
        </div>
      ) : (
        <div style={{ position: 'absolute', top: 40, left: 0, right: 0, height: 120, pointerEvents: 'none' }}>
          <FlowerScatter width={375} height={120} variant={THEME.flowerVariant} density={THEME.flowerDensity * 0.8} />
        </div>
      )}

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        marginTop: hero ? 24 : 60,
        padding: hero ? '0 28px' : 0,
      }}>
        <FadeIn>
          <div style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 14, letterSpacing: 8, color: THEME.accent, fontStyle: 'italic',
            marginBottom: 24, textTransform: 'uppercase',
          }}>The Wedding Invitation</div>
        </FadeIn>

        <FadeIn delay={400}>
          <div style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 44, lineHeight: 1.15, color: THEME.text,
            fontWeight: 300, letterSpacing: 1,
          }}>
            <div style={{ fontStyle: 'italic' }}>{d.groom.nameEn.first}</div>
            <div style={{
              fontSize: 16, margin: '10px 0', letterSpacing: 4,
              color: THEME.accent, fontStyle: 'italic',
            }}>&</div>
            <div style={{ fontStyle: 'italic' }}>{d.bride.nameEn.first}</div>
          </div>
        </FadeIn>

        <FadeIn delay={600} style={{ marginTop: 36 }}>
          <div style={{
            width: 1, height: 40, background: THEME.accent, opacity: 0.4,
            margin: '0 auto 18px',
          }} />
          <div style={{
            fontFamily: '"Noto Serif KR", serif',
            fontSize: 14, letterSpacing: 3, color: THEME.textSoft,
          }}>{d.date.displaySlash}</div>
          <div style={{
            fontFamily: '"Noto Sans KR", sans-serif',
            fontSize: 12, letterSpacing: 2, color: THEME.textMuted,
            fontWeight: 300, marginTop: 8,
          }}>{d.date.venueLineKo}</div>
        </FadeIn>
      </div>

      <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, height: 100, pointerEvents: 'none' }}>
        <FlowerScatter width={375} height={100} variant={THEME.flowerVariant} density={THEME.flowerDensity * 0.6} />
      </div>
    </section>
  );
}

// 02. Invitation — 사랑 인용구 + 초대의 글
function InvitationSection() {
  const d = window.INVITE_DATA;
  const [gf, gm] = [d.groom.parents.father, d.groom.parents.mother];
  const [bf, bm] = [d.bride.parents.father, d.bride.parents.mother];
  const quote = d.quote && d.quote.text ? d.quote : null;
  return (
    <section style={{ padding: '80px 28px 60px', background: THEME.bg, textAlign: 'center' }}>
      <SectionTitle en="Invitation" ko="초 대 합 니 다" />

      {quote && (
        <FadeIn delay={80} style={{ marginTop: 8, marginBottom: 32 }}>
          <div style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 28, lineHeight: 1.2, color: THEME.accent,
            fontStyle: 'italic', opacity: 0.6, marginBottom: 14,
          }}>“</div>
          <div style={{
            fontFamily: '"Noto Serif KR", serif',
            fontSize: 14, lineHeight: 2, letterSpacing: 1,
            color: THEME.text, whiteSpace: 'pre-line', fontWeight: 300,
            fontStyle: 'italic',
          }}>{quote.text}</div>
          {quote.author && (
            <div style={{
              fontFamily: '"Cormorant Garamond", "Noto Serif KR", serif',
              fontSize: 11, letterSpacing: 2, color: THEME.textMuted,
              marginTop: 12, fontStyle: 'italic',
            }}>— {quote.author}</div>
          )}
          <div style={{
            width: 40, height: 1, background: THEME.line,
            margin: '24px auto 0',
          }} />
        </FadeIn>
      )}

      <FadeIn delay={100} style={{ marginTop: quote ? 0 : 24 }}>
        <div style={{
          fontFamily: '"Noto Serif KR", serif',
          fontSize: 15, lineHeight: 2.2, letterSpacing: 0.5,
          color: THEME.textSoft, whiteSpace: 'pre-line', fontWeight: 300,
        }}>{d.invitation}</div>
      </FadeIn>

      <FadeIn delay={300} style={{ marginTop: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 30, height: 1, background: THEME.line }} />
        <div style={{
          fontFamily: '"Noto Serif KR", serif',
          fontSize: 13, lineHeight: 2, color: THEME.text, letterSpacing: 1,
        }}>
          <div>
            {gf} <span style={{ color: THEME.textMuted, fontSize: 11 }}>· </span>{gm}
            <span style={{ color: THEME.textMuted, fontSize: 11, marginLeft: 8 }}>의 {d.groom.roleKo}</span>
            <span style={{ color: THEME.accent, fontWeight: 500, marginLeft: 4 }}>{d.groom.name}</span>
          </div>
          <div>
            {bf} <span style={{ color: THEME.textMuted, fontSize: 11 }}>· </span>{bm}
            <span style={{ color: THEME.textMuted, fontSize: 11, marginLeft: 8 }}>의 {d.bride.roleKo}</span>
            <span style={{ color: THEME.accent, fontWeight: 500, marginLeft: 4 }}>{d.bride.name}</span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// 03. Profile — 신랑 신부 소개
function ProfileSection() {
  const d = window.INVITE_DATA;
  const GROOM_TONE = 'linear-gradient(160deg, #e8e0d0 0%, #c9b89a 60%, #8e7a5e 100%)';
  const BRIDE_TONE = 'linear-gradient(160deg, #f0e5e5 0%, #d9c0c0 50%, #a47c7c 100%)';

  const Person = ({ role, name, nameEn, tone, phone, photo, delay }) => (
    <FadeIn delay={delay} style={{ textAlign: 'center', flex: 1 }}>
      <Photo src={photo ? _assetPath(photo) : null}
        tone={tone} label="PORTRAIT"
        width={128} height={160}
        style={{ margin: '0 auto 20px', borderRadius: 2 }} />
      <div style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 11, letterSpacing: 3, color: THEME.accent, fontStyle: 'italic',
        marginBottom: 6,
      }}>{role}</div>
      <div style={{
        fontFamily: '"Noto Serif KR", serif',
        fontSize: 20, color: THEME.text, letterSpacing: 4,
        marginBottom: 6, fontWeight: 400,
      }}>{name}</div>
      <div style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 11, letterSpacing: 2, color: THEME.textMuted, fontStyle: 'italic',
      }}>{nameEn}</div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14 }}>
        <a href={`tel:${phone.replace(/-/g, '')}`} style={{
          padding: '6px 10px', background: 'transparent',
          border: `1px solid ${THEME.line}`, borderRadius: 20,
          fontFamily: 'inherit', fontSize: 10, color: THEME.textSoft,
          textDecoration: 'none', letterSpacing: 0.5,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 1.5h2l1 2.5-1.5 1a6 6 0 003 3l1-1.5 2.5 1v2a1 1 0 01-1 1A8 8 0 012 2.5a1 1 0 011-1z"/></svg>
          전화
        </a>
        <a href={`sms:${phone.replace(/-/g, '')}`} style={{
          padding: '6px 10px', background: 'transparent',
          border: `1px solid ${THEME.line}`, borderRadius: 20,
          fontFamily: 'inherit', fontSize: 10, color: THEME.textSoft,
          textDecoration: 'none', letterSpacing: 0.5,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 3l5 3.5L11 3M1 3v6a1 1 0 001 1h8a1 1 0 001-1V3M1 3a1 1 0 011-1h8a1 1 0 011 1"/></svg>
          문자
        </a>
      </div>
    </FadeIn>
  );

  return (
    <section style={{ padding: '60px 28px 60px', background: THEME.bgAccent }}>
      <SectionTitle en="Bride & Groom" ko="신 랑 · 신 부" />

      <div style={{ display: 'flex', gap: 16, marginTop: 32, alignItems: 'flex-start' }}>
        <Person role="GROOM" name={d.groom.name} nameEn={d.groom.nameEn.full}
          tone={GROOM_TONE} phone={d.groom.phone} photo={d.groom.photo} delay={100} />
        <div style={{ alignSelf: 'center', marginTop: 60 }}>
          <FlowerBlueLine size={28} stroke={THEME.accent} />
        </div>
        <Person role="BRIDE" name={d.bride.name} nameEn={d.bride.nameEn.full}
          tone={BRIDE_TONE} phone={d.bride.phone} photo={d.bride.photo} delay={200} />
      </div>
    </section>
  );
}

// 04. Parents / Family
function ParentsSection() {
  const d = window.INVITE_DATA;

  // 전화/문자 아이콘 버튼 (부모 연락처) — phone 이 없으면 렌더하지 않음
  const ContactDots = ({ phone }) => {
    if (!phone) return null;
    const tel = phone.replace(/-/g, '');
    const dotStyle = {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 20, height: 20, borderRadius: '50%',
      border: `1px solid ${THEME.line}`,
      color: THEME.textSoft, textDecoration: 'none', marginLeft: 4,
    };
    return (
      <span style={{ display: 'inline-flex', marginLeft: 8, verticalAlign: 'middle' }}>
        <a href={`tel:${tel}`} aria-label="전화" style={dotStyle}>
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 1.5h2l1 2.5-1.5 1a6 6 0 003 3l1-1.5 2.5 1v2a1 1 0 01-1 1A8 8 0 012 2.5a1 1 0 011-1z"/></svg>
        </a>
        <a href={`sms:${tel}`} aria-label="문자" style={dotStyle}>
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 3l5 3.5L11 3M1 3v6a1 1 0 001 1h8a1 1 0 001-1V3M1 3a1 1 0 011-1h8a1 1 0 011 1"/></svg>
        </a>
      </span>
    );
  };

  const Side = ({ title, parents, child, childLabel, delay }) => (
    <FadeIn delay={delay} style={{ textAlign: 'center', flex: 1 }}>
      <div style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 11, letterSpacing: 3, color: THEME.accent, fontStyle: 'italic',
        marginBottom: 14, textTransform: 'uppercase',
      }}>{title}</div>
      <div style={{
        fontFamily: '"Noto Serif KR", serif',
        fontSize: 14, lineHeight: 2, color: THEME.text, letterSpacing: 1,
      }}>
        <div>{parents.father}<ContactDots phone={parents.fatherPhone} /></div>
        <div>{parents.mother}<ContactDots phone={parents.motherPhone} /></div>
      </div>
      <div style={{ width: 20, height: 1, background: THEME.line, margin: '14px auto' }} />
      <div style={{ fontFamily: '"Noto Sans KR", sans-serif', fontSize: 11, color: THEME.textMuted, marginBottom: 4 }}>{childLabel}</div>
      <div style={{ fontFamily: '"Noto Serif KR", serif', fontSize: 16, color: THEME.text, letterSpacing: 3 }}>{child}</div>
    </FadeIn>
  );

  return (
    <section style={{ padding: '60px 28px 60px', background: THEME.bg }}>
      <SectionTitle en="Family" ko="양 가 부 모" />
      <div style={{ display: 'flex', gap: 16, marginTop: 36, alignItems: 'stretch' }}>
        <Side title="Groom's Family" parents={d.groom.parents} child={d.groom.name} childLabel={d.groom.roleKo} delay={100} />
        <div style={{ width: 1, background: THEME.lineSoft }} />
        <Side title="Bride's Family" parents={d.bride.parents} child={d.bride.name} childLabel={d.bride.roleKo} delay={200} />
      </div>
    </section>
  );
}

// 05. DateTime + Venue summary
function DateTimeSection() {
  const d = window.INVITE_DATA;
  return (
    <section style={{ padding: '70px 28px 60px', background: THEME.bgAccent, textAlign: 'center', position: 'relative' }}>
      <SectionTitle en="When & Where" ko="일 시 · 장 소" />

      <FadeIn delay={100} style={{ marginTop: 32 }}>
        <div style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 40, fontStyle: 'italic', color: THEME.accent,
          fontWeight: 300, letterSpacing: 2, lineHeight: 1,
        }}>
          <span style={{ fontSize: 26, opacity: 0.6 }}>{d.date.year}.</span>{_pad2(d.date.month)}.{_pad2(d.date.day)}
        </div>
        <div style={{
          fontFamily: '"Noto Serif KR", serif',
          fontSize: 13, letterSpacing: 4, color: THEME.text, marginTop: 10,
        }}>{d.date.dayOfWeekKo} · {d.date.dayOfWeekEn.toUpperCase()}</div>
      </FadeIn>

      <FadeIn delay={200} style={{ marginTop: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 20, height: 1, background: THEME.line }} />
          <div style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 18, fontStyle: 'italic', color: THEME.text, letterSpacing: 1,
          }}>{d.date.hourSpaced}</div>
          <div style={{ width: 20, height: 1, background: THEME.line }} />
        </div>
        <div style={{
          fontFamily: '"Noto Sans KR", sans-serif',
          fontSize: 12, color: THEME.textMuted, marginTop: 6,
          fontWeight: 300, letterSpacing: 1,
        }}>{d.date.hourKo}</div>
      </FadeIn>

      <FadeIn delay={300} style={{ marginTop: 36, padding: '20px 0', borderTop: `1px solid ${THEME.lineSoft}`, borderBottom: `1px solid ${THEME.lineSoft}` }}>
        <div style={{ fontFamily: '"Noto Serif KR", serif', fontSize: 17, color: THEME.text, letterSpacing: 2, marginBottom: 6 }}>{d.venue.name}</div>
        <div style={{ fontFamily: '"Noto Sans KR", sans-serif', fontSize: 12, color: THEME.textSoft, letterSpacing: 0.5, fontWeight: 300 }}>{d.venue.floor} · {d.venue.hall}</div>
        <div style={{ fontFamily: '"Noto Sans KR", sans-serif', fontSize: 11, color: THEME.textMuted, marginTop: 6, fontWeight: 300 }}>{d.venue.address}</div>
      </FadeIn>
    </section>
  );
}

// 06. Calendar + D-Day
function CalendarSection() {
  const d = window.INVITE_DATA;
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const { firstDayOfMonth, daysInMonth, day, year, monthEn, raw } = d.date;

  const today = new Date();
  // 날짜 비교는 자정 기준으로 정규화 (D-Day 1 차이 방지)
  const normalize = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate());
  const dday = Math.round((normalize(raw) - normalize(today)) / (1000 * 60 * 60 * 24));

  const cells = [];
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(i);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <section style={{ padding: '60px 28px 60px', background: THEME.bg }}>
      <SectionTitle en="Calendar" ko="캘 린 더" />

      <FadeIn delay={100}>
        <div style={{
          marginTop: 30, padding: '24px 18px 20px',
          background: THEME.card, border: `1px solid ${THEME.lineSoft}`,
        }}>
          <div style={{ textAlign: 'center', marginBottom: 18 }}>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 13, letterSpacing: 4, color: THEME.accent, fontStyle: 'italic' }}>{monthEn}</div>
            <div style={{ fontFamily: '"Noto Serif KR", serif', fontSize: 22, color: THEME.text, letterSpacing: 2, marginTop: 2 }}>{year}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 8 }}>
            {weekdays.map((w, i) => (
              <div key={w} style={{
                textAlign: 'center', padding: '6px 0',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 10, letterSpacing: 1, fontStyle: 'italic',
                color: i === 0 ? '#c77070' : i === 6 ? THEME.accent : THEME.textMuted,
              }}>{w}</div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {cells.map((n, i) => {
              const isTarget = n === day;
              const col = i % 7;
              const textColor = !n ? 'transparent'
                : isTarget ? '#fff'
                : col === 0 ? '#c77070'
                : col === 6 ? THEME.accent
                : THEME.text;
              return (
                <div key={i} style={{
                  aspectRatio: '1/1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 14, fontStyle: isTarget ? 'normal' : 'italic',
                  color: textColor, position: 'relative',
                }}>
                  {isTarget && (
                    <div style={{
                      position: 'absolute', inset: 3,
                      background: THEME.accent, borderRadius: '50%',
                    }} />
                  )}
                  <span style={{ position: 'relative', zIndex: 1, fontWeight: isTarget ? 500 : 300 }}>{n || ''}</span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${THEME.lineSoft}`, textAlign: 'center' }}>
            <div style={{ fontFamily: '"Noto Sans KR", sans-serif', fontSize: 12, color: THEME.textSoft, fontWeight: 300 }}>
              {d.groom.name}, {d.bride.name}의 결혼식이<br/>
              <span style={{ color: THEME.accent, fontFamily: '"Cormorant Garamond", serif', fontSize: 15, fontStyle: 'italic', fontWeight: 500, letterSpacing: 1 }}>
                {dday > 0 ? `${dday} days` : dday === 0 ? 'Today' : `${Math.abs(dday)} days ago`}
              </span>
              {dday > 0 ? ' 남았습니다' : dday === 0 ? ' 입니다' : ' 지났습니다'}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

Object.assign(window, { CoverSection, InvitationSection, ProfileSection, ParentsSection, DateTimeSection, CalendarSection });
