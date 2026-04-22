# 모바일 청첩장 템플릿 — 화원(花園) 테마

**빌드 도구 없이 GitHub Pages 로 바로 배포** 할 수 있고, 서버도 필요 없습니다.

✨ 이 템플릿은 Claude Opus 4.7, Claude Design 의 도움을 받아 기획·구현되었습니다.

---

## 목차

- [한눈에 보기](#한눈에-보기)
- [빠른 시작](#빠른-시작)
- [프로젝트 구조](#프로젝트-구조)
- [config.js 수정 가이드](#configjs-수정-가이드)
- [사진 교체 가이드](#사진-교체-가이드)
- [카카오 연동 (공유 + 지도)](#카카오-연동-공유--지도)
- [로컬에서 미리보기](#로컬에서-미리보기)
- [GitHub Pages 배포](#github-pages-배포)
- [커스터마이징](#커스터마이징)
- [정적 페이지의 한계](#정적-페이지의-한계)
- [라이선스](#라이선스)
- [크레딧](#크레딧)

---

## 한눈에 보기

기본으로 포함된 섹션 12개입니다 (순서는 `index.html` 에서 자유롭게 바꿀 수 있어요).

| # | 섹션 | 내용 |
|---|---|---|
| 1 | Cover 표지 | 대표 사진 + 영문 이름 + 날짜 + 장소 한 줄 |
| 2 | Invitation 초대글 | 사랑 인용구 + 인사말 + 양가 부모·자녀 관계 한 줄 |
| 3 | Bride & Groom 프로필 | 신랑·신부 사진·이름 + 전화/문자 버튼 |
| 4 | Family 양가 부모 | 양가 부모 성함 + 부모님 연락처 버튼 |
| 5 | When & Where | 날짜·요일·시간 + 장소 이름·주소 |
| 6 | Calendar | 해당 월 달력 + 결혼식 날 표시 + D-Day 자동 계산 |
| 7 | Gallery | 자동 탐색 + 라이트박스 + "사진 더 보기" 토글 |
| 8 | Directions | 인터랙티브 카카오맵 + 네이버/카카오 앱 딥링크 + 지하철/버스/주차 |
| 9 | Notice 안내사항 | 식사·주차·화환·드레스 코드 등 자유 배열 |
| 10 | With Heart 계좌 | 신랑측·신부측 토글 + 복사 버튼 (하이픈 자동 제거) |
| 11 | Share | 카카오톡 공유 (대표 이미지 포함) + 링크 복사 |
| 12 | Footer | Thank you |

---

## 빠른 시작

**개발 경험이 없어도** 따라올 수 있도록 단계별로 풀어쓴 절차입니다.

### 1️⃣ 레포를 내 컴퓨터에 가져오기

GitHub 화면 오른쪽 위 **Fork** 버튼 → 내 계정으로 복사, 그리고 내 컴퓨터에 다운로드.
(Git 을 안 써본 경우 **Code → Download ZIP** 으로 바로 zip 받아서 압축 풀어도 됩니다.)

### 2️⃣ `config.js` 열어서 내 정보로 수정

메모장·VS Code 등 아무 텍스트 에디터로 `config.js` 열기. 이름·날짜·장소·인사말·계좌 전부 이 파일 하나에 모여 있습니다. [자세한 필드 설명은 아래](#configjs-수정-가이드).

### 3️⃣ 사진 교체

`assets/` 폴더에 있는 4장(`hero.jpg`, `groom.jpg`, `bride.jpg`, `og.jpg`)과 `assets/gallery/` 의 `01.jpg`~`12.jpg` 를 **본인 사진으로 파일명 그대로 덮어쓰기**. 장수는 자유.

### 4️⃣ 로컬에서 확인

프로젝트 폴더에서 터미널 열고:

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000/` 열어서 확인. (`index.html` 을 직접 더블클릭하면 **안 보여요** — 아래 [로컬 미리보기](#로컬에서-미리보기) 설명 참고)

### 5️⃣ GitHub Pages 로 배포

GitHub 에 push 하고 **Settings → Pages → Deploy from a branch → main / root → Save**. 1~2분 뒤 `https://내계정.github.io` 에서 실제 웹 주소로 접속 가능. 자세한 절차는 [배포 섹션](#github-pages-배포).

---

## 프로젝트 구조

```
wedding-mobile-invitation/
├── index.html              # 진입점 (보통 수정 X)
├── config.js               # ⭐ 개인 정보·설정 — 여기만 수정하면 됨
├── .nojekyll               # GitHub Pages 용 (삭제 X)
├── .gitignore              # git 에서 제외할 파일 목록
├── LICENSE                 # MIT 라이선스
├── README.md               # 이 파일
│
├── assets/                 # 이미지 에셋
│   ├── hero.jpg            # 표지 대표 사진
│   ├── groom.jpg           # 신랑 프로필 사진
│   ├── bride.jpg           # 신부 프로필 사진
│   ├── og.jpg              # 카카오톡/SNS 공유 썸네일
│   └── gallery/            # 갤러리 사진들
│       ├── 01.jpg
│       ├── 02.jpg
│       └── ...
│
└── components/             # UI 컴포넌트 (디자인 손볼 때만)
    ├── data.jsx            # config.js → 내부 데이터 어댑터
    ├── theme.jsx           # 색/타이포 테마 + 재사용 컴포넌트
    ├── flowers.jsx         # 꽃 SVG 일러스트
    ├── sections-a.jsx      # Cover/Invitation/Profile/Parents/DateTime/Calendar
    └── sections-b.jsx      # Gallery/Map/Notice/Accounts/Share/Footer
```

**실사용자가 건드리는 파일은 단 세 가지**:
- `index.html` → 소셜 크롤러용 메타데이터 (카카오톡 링크 썸네일 기능)
- `config.js` → 텍스트 정보 전부
- `assets/` 폴더의 이미지 → 사진 전부

나머지는 그대로 둬도 됩니다.

---

## `index.html` 수정 가이드

아래 값 중 `title`, `content` 을 적합한 값으로 변경하세요. 

config.js 에 설정하는 값과 일치하는 것을 권장합니다.

```html
<!-- 정적 메타 (소셜 크롤러용) — config.js 의 meta 섹션과 값을 맞춰주세요 -->
<title>AAA · BBB의 결혼식에 초대합니다</title>
<meta name="description" content="YYYY년 MM월 DD일 X요일 오후 X시 XX분 · 그랜드 인터컨티넨탈 서울">
<meta property="og:type" content="website">
<meta property="og:title" content="AAA · BBB의 결혼식에 초대합니다">
<meta property="og:description" content="YYYY년 MM월 DD일 X요일 오후 X시 XX분 · 그랜드 인터컨티넨탈 서울">
<meta property="og:image" content="./assets/og.jpg">
<meta property="og:url" content="https://YOURNAME.github.io/">
```

---

## `config.js` 수정 가이드

파일 맨 위 `window.CONFIG = { ... }` 중괄호 안을 수정합니다. (설정값은 임의의 인물 및 정보) 

각 항목 예시와 함께:

### 📄 meta — 페이지 제목·공유 정보

```js
meta: {
  title: '이도현 · 한지우의 결혼식에 초대합니다',
  description: '2026년 11월 7일 토요일 오후 1시 30분 · 그랜드 인터컨티넨탈 서울',
  siteUrl: 'https://YOURNAME.github.io/wedding-invitation/',  // 배포 URL (끝에 / 포함)
  ogImage: 'og.jpg',          // assets/ 안의 파일명
  favicon: 'favicon.png',     // 탭 아이콘
  heroImage: 'hero.jpg',      // 표지 대표 사진 (null 이면 텍스트만 나옴)
  kakaoAppKey: 'DUMMY_KAKAO_JS_KEY',  // 카카오 JS 키 (발급 방법은 아래 참고)
}
```

### 📖 quote — 사랑 인용구 (선택)

```js
quote: {
  text: '사랑은 서로를 마주 보는 것이 아니라\n함께 같은 방향을 바라보는 것이다.',
  author: '생텍쥐페리, 《인간의 대지》',
}
```

`text` 를 빈 문자열로 두면 인용구 자체가 숨겨집니다.

### 👰🤵 groom / bride — 신랑·신부

```js
groom: {
  name: '이도현',                              // 한글 이름
  nameEn: { first: 'Do Hyun', full: 'LEE DO HYUN' },
  roleKo: '장남',                              // 장남·차남·장녀·차녀 등
  parents: {
    father: '이정우',  mother: '박수진',
    fatherRole: '아버지',  motherRole: '어머니',
    fatherPhone: '010-1111-2222',              // 빈 문자열이면 버튼 숨김
    motherPhone: '010-3333-4444',
  },
  phone: '010-1234-5678',                      // 본인 전화 (tel:/sms:)
  photo: 'groom.jpg',                          // assets/ 안의 파일명
}
```

`bride` 도 구조 동일. 한글 이름·부모님 성함·휴대폰 번호 바꾸면 끝.

### 📅 date — 결혼식 일시

```js
date: {
  datetime: '2026-11-07T13:30:00+09:00',       // ISO 8601 형식 하나로 통일
}
```

이 한 줄만 수정하면 **캘린더 월/일/요일/첫 요일/총 일수·D-Day·시간 표시** 모두 자동 계산됩니다. 뷰어의 시간대와 관계없이 한국 시간 기준으로 고정됨.

### 🏛 venue — 예식 장소

```js
venue: {
  name: '그랜드 인터컨티넨탈 서울',
  hall: '그랜드볼룸',  floor: '지하 2층',
  address: '서울특별시 강남구 테헤란로 521',
  addressDetail: '삼성역 5번 출구 도보 3분',
  phone: '02-555-5656',
  lat: 37.5087, lng: 127.0632,                 // 지도 중심·마커 좌표
}
```

위도/경도는 [카카오맵](https://map.kakao.com/)에서 장소 클릭 → 주소 옆 "공유" → URL 의 좌표로 확인 가능.

### 💌 invitation — 인사말

```js
invitation: `서로가 마주 보며 다져온 사랑을
이제 함께 한 곳을 바라보며
걸어갈 수 있는 큰 울타리로 키우고자 합니다.

오랜 기다림 끝에 맺어지는 귀한 걸음에
부디 오셔서 축복해 주시면 감사하겠습니다.`
```

백틱(`` ` ``) 안에서 줄바꿈 그대로 반영됩니다.

### 🚇 transport — 오시는 길 교통편

```js
transport: [
  { label: '지하철', icon: 'M', detail: '2호선 삼성역 5번 출구 도보 3분' },
  { label: '버스',   icon: 'B', detail: '간선 146, 360 / 지선 2413 · 코엑스 하차' },
  { label: '자가용', icon: 'P', detail: '호텔 발레파킹 가능 (연회 당일 무료)' },
]
```

항목을 자유롭게 추가·삭제·수정할 수 있습니다. `icon` 은 원 안에 표시될 한 글자.

### 📌 notices — 하객 안내사항

```js
notices: [
  { icon: '🍽', title: '식사 안내',   detail: '예식 종료 후 ...' },
  { icon: '🅿', title: '주차 안내',   detail: '호텔 지하 주차장 3시간 무료' },
  { icon: '💐', title: '화환 안내',   detail: '양가 합의 하에 화환은 정중히 사양합니다.' },
  { icon: '👗', title: '드레스 코드', detail: '편한 복장으로 오세요.' },
]
```

빈 배열(`[]`) 이면 섹션 자체가 숨겨집니다. 필요한 항목만 남기세요.

### 💰 accounts — 마음 전하실 곳

```js
accounts: {
  note: '참석이 어려우신 분들을 위해\n계좌번호를 안내드립니다',
  groom: [
    { name: '이도현',       bank: '국민은행',   number: '123-456-789012' },
    { name: '이정우 (父)',  bank: '신한은행',   number: '110-234-567890' },
    { name: '박수진 (母)',  bank: '하나은행',   number: '234-567890-123' },
  ],
  bride: [ /* 동일한 구조 */ ],
}
```

`(父)`, `(母)` 처럼 이름 뒤에 라벨을 붙여도 되고, 하이픈은 복사 시 자동 제거됩니다.

### 🖼 gallery — 갤러리 설정

```js
gallery: {
  files: null,         // null = assets/gallery/ 자동 탐색, 배열이면 그 목록만 사용
  maxScan: 30,         // 자동 탐색 최대 장수
}
```

보통 `null` 로 두고, `assets/gallery/` 에 `01.jpg`, `02.jpg`, ... 순서로 파일만 넣으면 알아서 인식합니다. 번호에 구멍이 나면 거기서 탐색이 멈춰요.

---

## 사진 교체 가이드

### 4장의 대표 사진 (`assets/` 폴더)

| 파일 | 어디에 쓰이나 | 권장 해상도 | 권장 용량 |
|---|---|---|---|
| `hero.jpg` | 표지 대표 사진 | 960 × 1200 (세로 긴 비율) | ≤400KB |
| `groom.jpg` | 신랑 프로필 | 480 × 600 | ≤200KB |
| `bride.jpg` | 신부 프로필 | 480 × 600 | ≤200KB |
| `og.jpg` | 카카오톡/페북 공유 썸네일 | 1200 × 630 | ≤300KB |

**교체 방법**: 같은 파일명으로 덮어쓰기. 코드 수정 필요 없음.
크기·비율이 권장과 다르더라도 CSS 가 자동으로 자르고 채워서 표시합니다 (`object-fit: cover`). 권장값을 지키면 로딩이 빨라지는 정도.

> 기본으로 들어있는 사진에는 "MAIN PHOTO · Replace /assets/hero.jpg" 처럼 **교체 위치가 큼지막하게 적혀 있습니다**. 배포 전 놓치지 않게 해주는 장치입니다.

### 갤러리 사진 (`assets/gallery/` 폴더)

- 파일명: **두 자리 숫자 + 확장자**, 01 부터 순서대로 (`01.jpg`, `02.jpg`, `03.png`...)
- 지원 포맷: `.jpg`, `.jpeg`, `.png`, `.webp`
- 장수 제한 없음 (기본 30장 까지 자동 탐색, `config.gallery.maxScan` 로 조절)
- **번호에 구멍이 생기면 거기서 멈춤** (예: 01, 02, 04 가 있으면 03 없어서 01, 02 만 뜸)

**레이아웃 자동 구성**:
- 1장 → 큰 사진 하나
- 2~5장 → 큰 사진 + 가로 스크롤 띠
- 6장 이상 → 큰 사진 + 띠 4장 + 2열 그리드
- 8장 이상이면 **"사진 더 보기"** 토글 버튼이 자동으로 나타남 (클릭하면 나머지 펼쳐짐)

---

## 카카오 연동 (공유 + 지도)

카카오톡 공유 썸네일과 인터랙티브 지도는 **하나의 JavaScript 키** 로 둘 다 활성화됩니다.

기본값(`DUMMY_KAKAO_JS_KEY`)은 실제 키가 아니므로:
- 카카오톡 공유 버튼 → 링크 복사로 폴백
- 지도 → 장식용 SVG 이미지로 폴백

실키를 발급받아야 진짜 동작합니다.

### 🔑 JS 키 발급 (전 과정 ~5분)

1. [developers.kakao.com](https://developers.kakao.com) 접속해서 카카오 계정으로 로그인
2. 상단 메뉴바 **앱** 클릭 및 **앱 생성** 진행
3. 생성된 앱 클릭 → 왼쪽 메뉴 **앱** → **플랫폼 키** → **JavaScript 키** 생성 및 복사
4. **JavaScript 키** 클릭 후 아래 도메인 등록 (개별 키 생성 권장):
   - `http://localhost:8000` (로컬 테스트용, **포트까지 정확히** 일치해야 함)
   - `https://YOURNAME.github.io` (실제 배포 도메인, 경로 없이)
   - 위 2개 도메인에서 사용할 JS key는 서로 다른 것 사용을 권장하며, github public repository에는 `localhost`에 사용한 app key는 올리지 않음을 권장합니다.
5. 왼쪽 메뉴 → **카카오맵** → 카카오맵 사용 설정 ON
6. `config.js` 의 `meta.kakaoAppKey` 값을 복사한 키로 교체
7. 저장 후 브라우저 새로고침 → 실제 지도 뜸 + 공유 썸네일 동작

- JS 키는 public github repository로 노출되어도 괜찮습니다. [카카오 지도 api key 노출 문의](https://devtalk.kakao.com/t/api-key/138195)

### ⚠️ 공유 썸네일이 안 뜰 때

카카오톡 공유 미리보기는 **HTTPS 절대 URL + 등록된 도메인** 이어야만 뜹니다. 따라서:

- ❌ 로컬(`localhost`, `file://`)에서는 썸네일 미리보기 안 뜸 → 정상
- ✅ **실제 배포 후** 실기기 카카오톡에서 확인해야 함
- 캐시가 남아 있으면 [카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing) 에서 "초기화" 눌러야 갱신됨

---

## 로컬에서 미리보기

### Python 로컬 서버 실행

```bash
cd wedding-mobile-invitation   # 프로젝트 폴더로 이동
python3 -m http.server 8000
```

`http://localhost:8000/` 접속.

또는 npx 등 기타 방식으로 로컬 서버 실행 및 안내되는 URL 로 접속.

---

## GitHub Pages 배포

### 준비

- GitHub 계정
- 수정 완료된 프로젝트 (config.js · 사진들 전부 본인 것으로)

### 절차

1. **GitHub 에 github.io repo 생성** (Public 추천)
   - 이름 형식: `USERNAME.github.io`
   - [github pages 만들기](https://docs.github.com/ko/pages/quickstart)

2. **프로젝트를 repo 에 올리기**
  - 사용자 이름 `YOURNAME` 가정
  - `YOURNAME.github.io` repository 만들기 (public)

   ```bash
   git clone https://github.com/hb4258/wedding-mobile-invitation.git
   mkdir -p YOURNAME.github.io
   cp -r wedding-mobile-invitation YOURNAME.github.io
   cd YOURNAME.github.io
   rm -rf .git
   # index.html, config.js 수정 등 필요한 작업 수행
   git remote add origin https://github.com/YOURNAME/YOURNAME.github.io.git
   git add .
   git commit -m "my-wedding-mobile-invitation"
   git push -u origin
   ```

3. **Pages 활성화**

   repo 페이지 → **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)** → **Save**

4. **1~2분 후** `https://YOURNAME.github.io` 접속

5. **`config.js` 의 `meta.siteUrl`** 을 이 실제 URL 로 수정 → 다시 `git commit && git push`
   (카카오 공유 썸네일이 제대로 된 URL 로 생성되게 하기 위함)

### 검수 체크리스트

- [ ] 모든 이름·날짜·장소·계좌·연락처가 실제 값으로 교체됨
- [ ] `hero.jpg`, `groom.jpg`, `bride.jpg`, `og.jpg` 본인 사진으로 교체
- [ ] 갤러리 사진들 본인 것으로 교체
- [ ] `config.js` 의 `meta.siteUrl` 을 실제 배포 URL 로
- [ ] 카카오 JS 키 입력 + 도메인 등록 완료
- [ ] 실기기(아이폰 + 갤럭시)에서 열어 레이아웃 확인
- [ ] 카카오톡 "나에게 보내기" 로 링크 공유 → 썸네일 + 제목 뜨는지 확인
- [ ] 지도 앱 버튼 실기기에서 테스트 (카카오맵/네이버지도 앱 실행 여부)
- [ ] 계좌번호 복사 버튼 실기기 테스트

---

## 커스터마이징

디자인을 직접 손보고 싶을 때.

### 🎨 색 팔레트 바꾸기

`components/theme.jsx` 의 `THEME` 객체 수정:

```js
const THEME = {
  bg: '#FBF6EE',          // 메인 배경 (아이보리)
  bgAccent: '#F5EFE4',    // 섹션 배경 교차용
  card: '#FFFDF8',        // 카드/입력창 배경
  text: '#2B2620',        // 본문 텍스트 (먹선)
  textSoft: '#5F564B',    // 설명 텍스트
  textMuted: '#A09789',   // 보조 라벨
  line: '#E8DFD0',        // 테두리
  lineSoft: '#F0E8DA',    // 얕은 테두리
  accent: '#2E4A7B',      // 포인트 컬러 (청화 블루)
  accentSoft: '#A98E6B',  // 보조 포인트
  // ...
};
```

### 🔤 폰트 바꾸기

`index.html` 의 Google Fonts URL 교체 + 각 컴포넌트 `fontFamily` 수정.

### 📐 섹션 순서 바꾸기 / 제거

`index.html` 의 `<Invitation>` 함수 안에서 컴포넌트 재배치:

```jsx
<CoverSection />
<InvitationSection />
<ProfileSection />
{/* 여기서 마음대로 순서 바꾸거나 삭제 */}
```

---

## 라이선스

[MIT License](./LICENSE). 자유롭게 사용·수정·재배포 가능. 개인 청첩장은 물론
다른 프로젝트에도 활용하셔도 됩니다. 단 저작권 표기는 유지해주세요.
