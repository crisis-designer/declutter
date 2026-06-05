아래 첨부한 디자인 시스템 명세서(MD)의 모든 규칙(shadcn/ui용 CSS Variables, 타이포그래피 스케일, 컴포넌트 여백 및 패딩)을 100% 준수해서, 미니멀리스트 비움 기록 앱 '디클러터(Declutter)'의 모바일 화면 인터랙티브 프로토타입을 React와 Tailwind CSS로 구현해 줘.

[구현 요청 사항]
1. 해상도: 모바일 웹뷰 환경(375px) 크기의 스마트폰 프레임 안에 앱 화면이 렌더링되도록 해줘.
2. 화면 구조 및 인터랙션:
   - 명세서 7번에 정의된 '하단 탭바'를 구현하고, 탭을 클릭하면 [화면 1: 메인 입력 화면]과 [화면 2: 비움 아카이브 리스트 화면]이 자연스럽게 전환되도록 해줘.
   - [화면 1]에는 기획대로 3개의 고정된 Input창이 있고, 각 입력창 옆에는 카테고리 배지 선택기(클릭 시 명세서 3번에 정의된 파스텔톤 컬러 배지들이 노출되거나 토글됨)를 배치해 줘.
   - 최하단 '오늘의 비움 완료하기' 버튼은 입력창에 글자가 없을 땐 Disabled 상태(연한 회색)였다가, 글자가 1개라도 입력되면 Enabled 상태(딥블랙 #111111)로 실시간으로 변하게 해줘.
   - 버튼을 누르면 입력 창의 내용이 [화면 2: 아카이브 리스트]로 실제로 추가되는 간단한 모킹(Mocking) 로직을 넣어줘.
3. 디자인 테마: 명세서 1, 2번에 적힌 흑백 중심의 극단적 미니멀리즘 감성을 그대로 살려줘.

[디자인 시스템 명세서]
Declutter 디자인 시스템 명세서
버전 1.0.0 · 작성일 2026-05-29
기준 환경 Mobile-first (iOS/Android WebView · 375px 기준)
폰트 Pretendard · 아이콘 Lucide Icons (SVG)
1. 브랜드 콘셉트
"덜어냄의 미학" — 군더더기 없는 흑백 모노톤 위에 숨 쉬는 여백. 물건을 버리는 행위처럼, 화면에서도 불필요한 것은 모두 걷어낸다.
무드: 극단적 미니멀리즘 (Radical Minimalism)
키워드: 절제, 고요, 가벼움, 성취
포인트 컬러: 딥블랙 #111111 — 단 하나의 색으로 무게감과 신뢰를 동시에 표현
2. CSS 변수 토큰 (globals.css)
Shadcn/ui 테마 규격에 맞춰 :root와 .dark 양쪽을 모두 정의합니다.

/* globals.css */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

@layer base {
  :root {
    /* ── Core ────────────────────────────────────── */
    --background:       249 249 249;   /* #F9F9F9 · 오프화이트 배경 */
    --foreground:        17  17  17;   /* #111111 · 메인 텍스트 */

    /* ── Surface ─────────────────────────────────── */
    --card:             255 255 255;   /* #FFFFFF · 카드 배경 */
    --card-foreground:   17  17  17;   /* #111111 · 카드 내 텍스트 */

    --popover:          255 255 255;   /* #FFFFFF · 팝업/바텀시트 배경 */
    --popover-foreground: 17  17  17;

    /* ── Brand Primary ───────────────────────────── */
    --primary:           17  17  17;   /* #111111 · 포인트 블랙 */
    --primary-foreground: 249 249 249; /* #F9F9F9 · primary 위 텍스트 */

    /* ── Secondary ───────────────────────────────── */
    --secondary:        242 242 247;   /* #F2F2F7 · 보조 Surface */
    --secondary-foreground: 17  17  17;

    /* ── State ───────────────────────────────────── */
    --muted:            142 142 147;   /* #8E8E93 · 비활성화/플레이스홀더 */
    --muted-foreground: 142 142 147;

    --destructive:      255  59  48;   /* #FF3B30 · 삭제/오류 (iOS Red) */
    --destructive-foreground: 255 255 255;

    --accent:           242 242 247;   /* #F2F2F7 · 호버/눌림 배경 */
    --accent-foreground: 17  17  17;

    /* ── Border & Input ──────────────────────────── */
    --border:           229 229 234;   /* #E5E5EA · 경계선 */
    --input:            229 229 234;   /* #E5E5EA · 입력창 테두리 */
    --ring:              17  17  17;   /* #111111 · 포커스 링 */

    /* ── Radius ──────────────────────────────────── */
    --radius:           0.75rem;       /* 12px · 기본 곡률 */
    --radius-sm:        0.5rem;        /* 8px  · Badge, Tag */
    --radius-lg:        1rem;          /* 16px · Card, Sheet */
    --radius-full:      9999px;        /* 완전 원형 (Pill) */
  }

  /* ── 다크 모드 ───────────────────────────────────── */
  .dark {
    --background:        17  17  17;
    --foreground:       249 249 249;
    --card:              28  28  30;
    --card-foreground:  249 249 249;
    --popover:           28  28  30;
    --popover-foreground: 249 249 249;
    --primary:          249 249 249;
    --primary-foreground: 17  17  17;
    --secondary:         44  44  46;
    --secondary-foreground: 249 249 249;
    --muted:            142 142 147;
    --muted-foreground: 142 142 147;
    --accent:            44  44  46;
    --accent-foreground: 249 249 249;
    --border:            58  58  60;
    --input:             58  58  60;
    --ring:             249 249 249;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: 'Pretendard Variable', Pretendard, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
Note (shadcn/ui 호환): shadcn/ui는 HSL 또는 R G B 공백 분리 정수를 기대합니다. 위 코드는 R G B 포맷을 사용하며, Tailwind config에서 rgb(var(--background)) 방식으로 참조됩니다.
3. 카테고리 컬러 팔레트
채도가 낮은 파스텔톤으로 구성하여, 흑백 기반 UI 위에서도 과하지 않게 카테고리를 구분합니다.
카테고리배경 (Background)텍스트 (Text)CSS 변수명#의류#E8EEF4 (연 스틸블루)#3A5A7C--cat-clothing#잡화#EEF0E8 (연 올리브)#5A6340--cat-goods#도서#F4EDE8 (연 샌드베이지)#7C5A3A--cat-book#가구#EDE8F4 (연 라벤더)#5A3A7C--cat-furniture#전자기기#E8F0EE (연 민트그레이)#3A6358--cat-electronics#기타#F0EFE8 (연 크림)#6E6452--cat-etc/* globals.css 추가 */
:root {
  /* 의류 */
  --cat-clothing-bg:   232 238 244;   /* #E8EEF4 */
  --cat-clothing-text:  58  90 124;   /* #3A5A7C */

  /* 잡화 */
  --cat-goods-bg:      238 240 232;   /* #EEF0E8 */
  --cat-goods-text:     90  99  64;   /* #5A6340 */

  /* 도서 */
  --cat-book-bg:       244 237 232;   /* #F4EDE8 */
  --cat-book-text:     124  90  58;   /* #7C5A3A */

  /* 가구 */
  --cat-furniture-bg:  237 232 244;   /* #EDE8F4 */
  --cat-furniture-text: 90  58 124;   /* #5A3A7C */

  /* 전자기기 */
  --cat-electronics-bg: 232 240 238;  /* #E8F0EE */
  --cat-electronics-text: 58  99  88; /* #3A6358 */

  /* 기타 */
  --cat-etc-bg:        240 239 232;   /* #F0EFE8 */
  --cat-etc-text:      110 100  82;   /* #6E6452 */
}
4. 타이포그래피 스케일
기준 폰트: Pretendard Variable
기준 해상도: 375px (모바일)
기본 행간 기준: 읽기 편안한 1.5~1.6 배율
4.1 스케일 테이블
토큰역할Size (rem)Size (px)Line-heightFont-weight사용 예시--text-display앱 타이틀 / 감성 문구1.75rem28px1.3 (36px)700빈 상태 메시지--text-heading-1섹션 헤더1.25rem20px1.4 (28px)700"지금까지 비운 기록"--text-heading-2날짜 소제목1rem16px1.4 (22px)600"2026년 5월 29일"--text-body-1기본 본문 / 입력값1rem16px1.5 (24px)400물건 이름 텍스트--text-body-2보조 본문0.9375rem15px1.5 (22px)400카드 상세 텍스트--text-label버튼 레이블1rem16px1 (16px)600CTA 버튼 문구--text-caption배지 / 보조 정보0.75rem12px1.4 (17px)500카테고리 배지--text-counter카운터 숫자0.8125rem13px1 (13px)500"0 / 3"/* globals.css 추가 */
:root {
  --text-display:      1.75rem;
  --text-heading-1:    1.25rem;
  --text-heading-2:    1rem;
  --text-body-1:       1rem;
  --text-body-2:       0.9375rem;
  --text-label:        1rem;
  --text-caption:      0.75rem;
  --text-counter:      0.8125rem;
}
4.2 Tailwind 타이포그래피 유틸리티 예시
// 헤더 날짜
<p className="text-[13px] font-medium tracking-tight text-[rgb(var(--muted))]">
  2026년 5월 29일, 오늘의 비움
</p>

// 아카이브 섹션 타이틀
<h2 className="text-[20px] font-bold leading-[1.4] text-[rgb(var(--foreground))]">
  지금까지 비운 기록
</h2>

// CTA 버튼 레이블
<span className="text-[16px] font-semibold leading-none tracking-tight">
  오늘의 비움 완료하기
</span>
5. 컴포넌트 상세 사양
5.1 Input (텍스트 입력창)
물건 이름을 입력하는 단일 행 텍스트 필드.
레이아웃
속성값높이 (Height)52px (터치 영역 최소 44px 이상 확보)가로 패딩 (Padding X)16px세로 패딩 (Padding Y)14pxBorder Radiusvar(--radius) → 12pxBorder Width1px상태별 토큰 매핑
상태backgroundbordertextplaceholderringDefault--card (#FFFFFF)--border (#E5E5EA)--foreground--muted—Focus--card--primary (#111111)--foreground--muted--ring 2px offsetFilled--card--border--foreground——Disabled--secondary (#F2F2F7)--border--muted--muted—Error#FFF5F5--destructive--foreground——// shadcn/ui Input 상태 예시 (Tailwind)
<input
  className={cn(
    // Base
    "h-[52px] w-full rounded-[var(--radius)] border border-[rgb(var(--border))]",
    "bg-[rgb(var(--card))] px-4 py-[14px]",
    "text-[16px] font-normal text-[rgb(var(--foreground))]",
    "placeholder:text-[rgb(var(--muted))]",
    "transition-all duration-150 ease-out outline-none",
    // Focus
    "focus:border-[rgb(var(--primary))] focus:ring-2 focus:ring-[rgb(var(--ring))]/20",
    // Disabled
    "disabled:bg-[rgb(var(--secondary))] disabled:text-[rgb(var(--muted))] disabled:cursor-not-allowed",
  )}
/>
5.2 Button (CTA 와이드 버튼)
화면 최하단에 고정되는 전폭(full-width) CTA 버튼.
레이아웃
속성값높이 (Height)56px (터치 최소 44px + 여유 12px)가로 패딩 (Padding X)24px세로 패딩 (Padding Y)0px (height 고정)너비 (Width)100% (화면 좌우 각 16px 마진 차감)Border Radiusvar(--radius) → 12px레이블 간격 (Icon ↔ Label Gap)8pxBottom Safe Areaenv(safe-area-inset-bottom) 추가상태별 토큰 매핑
상태backgroundtextborderopacity트리거 조건Disabled--muted (#8E8E93)#FFFFFFnone1입력값 전부 빈 값Enabled (Default)--primary (#111111)--primary-foregroundnone11개 이상 입력 시Pressed / Active#2C2C2E (다크그레이)--primary-foregroundnone0.9터치 다운Loading--primary--primary-foregroundnone0.7제출 처리 중// 상태별 Tailwind 예시
<button
  disabled={!hasInput}
  className={cn(
    // Base
    "w-full h-[56px] rounded-[var(--radius)]",
    "flex items-center justify-center gap-2",
    "text-[16px] font-semibold leading-none tracking-tight",
    "transition-all duration-200 ease-out select-none",
    // Enabled
    "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]",
    "active:opacity-90 active:scale-[0.99]",
    // Disabled
    "disabled:bg-[rgb(var(--muted))] disabled:cursor-not-allowed disabled:pointer-events-none",
  )}
>
  오늘의 비움 완료하기
</button>
Submit 애니메이션: 버튼 클릭 시 scale(0.97) → scale(1) 리바운드 + 입력창 페이드아웃 (opacity: 0, translateY: -4px, 200ms ease-out).
5.3 Badge (카테고리 태그)
카테고리를 표시하거나 선택하는 인라인 배지 컴포넌트.
레이아웃
속성값높이 (Height)28px가로 패딩 (Padding X)10px세로 패딩 (Padding Y)6pxBorder Radiusvar(--radius-sm) → 8px폰트12px / 500최소 터치 영역탭 선택기 내 각 배지: height: 44px 터치 히트슬롭 확장상태별 토큰 매핑
상태backgroundtext설명Default (미선택)--secondary (#F2F2F7)--muted (#8E8E93)아직 선택 전Selected카테고리별 --cat-*-bg카테고리별 --cat-*-text카테고리 토큰 사용Pressed--accent (#F2F2F7)--foreground터치 피드백// 카테고리 배지 예시
const CATEGORIES = [
  { id: 'clothing',    label: '#의류',    bg: 'var(--cat-clothing-bg)',    text: 'var(--cat-clothing-text)' },
  { id: 'goods',       label: '#잡화',    bg: 'var(--cat-goods-bg)',       text: 'var(--cat-goods-text)' },
  { id: 'book',        label: '#도서',    bg: 'var(--cat-book-bg)',        text: 'var(--cat-book-text)' },
  { id: 'furniture',   label: '#가구',    bg: 'var(--cat-furniture-bg)',   text: 'var(--cat-furniture-text)' },
  { id: 'electronics', label: '#전자기기', bg: 'var(--cat-electronics-bg)', text: 'var(--cat-electronics-text)' },
  { id: 'etc',         label: '#기타',    bg: 'var(--cat-etc-bg)',         text: 'var(--cat-etc-text)' },
];

<span
  style={
    selected
      ? { backgroundColor: `rgb(${cat.bg})`, color: `rgb(${cat.text})` }
      : {}
  }
  className={cn(
    "inline-flex items-center h-[28px] px-[10px] rounded-[var(--radius-sm)]",
    "text-[12px] font-medium whitespace-nowrap",
    "transition-all duration-100 active:scale-95",
    !selected && "bg-[rgb(var(--secondary))] text-[rgb(var(--muted))]"
  )}
>
  {cat.label}
</span>
5.4 Card (아카이브 카드)
아카이브 피드의 개별 물건 기록 카드.
레이아웃
속성값가로 패딩 (Padding X)16px세로 패딩 (Padding Y)16pxBorder Radiusvar(--radius-lg) → 16pxShadow0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)카드 간 간격 (Gap)10px내부 상단: 날짜 ↔ 배지justify-between + align-center날짜 → 물건명 간격 (Gap)6px물건명 → 배지 간격배지는 우측 정렬 or 물건명 하단 6px내부 요소 구성

┌─────────────────────────────────┐
│ [날짜 소제목 — text-heading-2]  │  ← 그룹 헤더 (카드 밖 or 카드 상단)
├─────────────────────────────────┤
│ padding: 16px                   │
│                                 │
│  [물건 이름 — text-body-1 Bold] │
│  gap: 6px                       │
│  [#카테고리 배지]               │
│                                 │
└─────────────────────────────────┘
상태별 토큰 매핑
상태backgroundbordershadowDefault--card (#FFFFFF)--border (1px)subtle shadow (위 참조)Pressed--accent (#F2F2F7)--bordernone// 아카이브 카드 예시
<div
  className={cn(
    "w-full rounded-[var(--radius-lg)]",
    "bg-[rgb(var(--card))] border border-[rgb(var(--border))]",
    "px-4 py-4",
    "shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]",
    "transition-colors duration-100 active:bg-[rgb(var(--accent))]"
  )}
>
  {/* 물건 이름 */}
  <p className="text-[16px] font-semibold leading-snug text-[rgb(var(--foreground))]">
    {item.name}
  </p>
  {/* 간격 6px */}
  <div className="mt-[6px]">
    <Badge category={item.category} selected />
  </div>
</div>
6. 스페이싱 시스템
4px 기반 그리드를 사용합니다.
토큰값사용 예시--space-14px아이콘 ↔ 텍스트 최소 간격--space-28px배지 내부 간격, 소항목 간격--space-312px입력 행 내부 요소 간격--space-416px화면 좌우 마진, 카드 패딩--space-520px섹션 헤더 하단 여백--space-624px섹션 간 여백--space-832px주요 섹션 구분--space-1040px화면 상단 safe area 여유7. 하단 탭바 (Bottom Navigation Bar) 사양
속성값높이56px + env(safe-area-inset-bottom)배경--card + backdrop-filter: blur(12px) (반투명 글래스 선택)상단 경계선1px solid rgb(var(--border))탭 간 Gapflex justify-around아이콘 크기24px아이콘 ↔ 레이블 Gap4px활성 탭 색상--primary (#111111) + font-weight: 700비활성 탭 색상--muted (#8E8E93) + font-weight: 400전환 애니메이션transition: color 150ms ease-out8. 피그마 로컬 스타일 등록 가이드
피그마 무료 플랜에서는 Variables(Dev 플랜 전용) 대신 Local Styles를 활용합니다.

8.1 컬러 스타일 등록 순서
Colors/
  Core/
    Background      → #F9F9F9
    Foreground      → #111111
    Card            → #FFFFFF
  Brand/
    Primary         → #111111
    Primary-FG      → #F9F9F9
  State/
    Muted           → #8E8E93
    Border          → #E5E5EA
    Destructive     → #FF3B30
  Category/
    Clothing-BG     → #E8EEF4
    Clothing-Text   → #3A5A7C
    Goods-BG        → #EEF0E8
    Goods-Text      → #5A6340
    Book-BG         → #F4EDE8
    Book-Text       → #7C5A3A
    Furniture-BG    → #EDE8F4
    Furniture-Text  → #5A3A7C
    Electronics-BG  → #E8F0EE
    Electronics-Text→ #3A6358
    Etc-BG          → #F0EFE8
    Etc-Text        → #6E6452
8.2 텍스트 스타일 등록 순서
Typography/
  Display         → Pretendard 28px / Bold / LH 1.3
  Heading-1       → Pretendard 20px / Bold / LH 1.4
  Heading-2       → Pretendard 16px / SemiBold / LH 1.4
  Body-1          → Pretendard 16px / Regular / LH 1.5
  Body-2          → Pretendard 15px / Regular / LH 1.5
  Label           → Pretendard 16px / SemiBold / LH 1.0
  Caption         → Pretendard 12px / Medium / LH 1.4
  Counter         → Pretendard 13px / Medium / LH 1.0
9. 변경 이력
버전날짜변경 내용1.0.02026-05-29초안 작성 — 컬러, 타이포그래피, 4개 컴포넌트 사양 정의 9. 변경 이력
버전    날짜          변경 내용
1.0.0  2026-05-29   초안 작성 — 컬러, 타이포그래피, 4개 컴포넌트 사양 정의
1.1.0  2026-05-29   [v0 프로토타입 검증 반영] 
                    - 키워드 매칭 기반 카테고리 자동 태깅 규칙 추가
                    - 아카이브 내 인앱 데이터 수정(바텀시트) 및 삭제(iOS Red 토큰) 기능 추가
                    - 모바일 뷰 넘침 방지를 위한 카테고리 드롭다운 상단 노출(Drop-up) 및 레이어 리셋 규칙 정의
