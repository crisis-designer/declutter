# Declutter 디자인 시스템 명세서

**버전** 1.0.0 · **작성일** 2026-05-29
**기준 환경** Mobile-first (iOS/Android WebView · 375px 기준)
**폰트** Pretendard · **아이콘** Lucide Icons (SVG)

---

## 1. 브랜드 콘셉트

> **"덜어냄의 미학"** — 군더더기 없는 흑백 모노톤 위에 숨 쉬는 여백. 물건을 버리는 행위처럼, 화면에서도 불필요한 것은 모두 걷어낸다.

- **무드**: 극단적 미니멀리즘 (Radical Minimalism)
- **키워드**: 절제, 고요, 가벼움, 성취
- **포인트 컬러**: 딥블랙 `#111111` — 단 하나의 색으로 무게감과 신뢰를 동시에 표현

---

## 2. CSS 변수 토큰 (globals.css)

Shadcn/ui 테마 규격에 맞춰 `:root`와 `.dark` 양쪽을 모두 정의합니다.

```css
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
```

> **Note (shadcn/ui 호환)**: shadcn/ui는 HSL 또는 `R G B` 공백 분리 정수를 기대합니다. 위 코드는 `R G B` 포맷을 사용하며, Tailwind config에서 `rgb(var(--background))` 방식으로 참조됩니다.

---

## 3. 카테고리 컬러 팔레트

채도가 낮은 파스텔톤으로 구성하여, 흑백 기반 UI 위에서도 과하지 않게 카테고리를 구분합니다.

| 카테고리 | 배경 (Background) | 텍스트 (Text) | CSS 변수명 |
|:---:|:---:|:---:|:---|
| `#의류` | `#E8EEF4` (연 스틸블루) | `#3A5A7C` | `--cat-clothing` |
| `#잡화` | `#EEF0E8` (연 올리브) | `#5A6340` | `--cat-goods` |
| `#도서` | `#F4EDE8` (연 샌드베이지) | `#7C5A3A` | `--cat-book` |
| `#가구` | `#EDE8F4` (연 라벤더) | `#5A3A7C` | `--cat-furniture` |
| `#전자기기` | `#E8F0EE` (연 민트그레이) | `#3A6358` | `--cat-electronics` |
| `#기타` | `#F0EFE8` (연 크림) | `#6E6452` | `--cat-etc` |

```css
/* globals.css 추가 */
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
```

---

## 4. 타이포그래피 스케일

**기준 폰트**: Pretendard Variable
**기준 해상도**: 375px (모바일)
**기본 행간 기준**: 읽기 편안한 1.5~1.6 배율

### 4.1 스케일 테이블

| 토큰 | 역할 | Size (rem) | Size (px) | Line-height | Font-weight | 사용 예시 |
|:---|:---|:---:|:---:|:---:|:---:|:---|
| `--text-display` | 앱 타이틀 / 감성 문구 | `1.75rem` | `28px` | `1.3` | `700` | 빈 상태 메시지 |
| `--text-heading-1` | 섹션 헤더 | `1.25rem` | `20px` | `1.4` | `700` | "지금까지 비운 기록" |
| `--text-heading-2` | 날짜 소제목 | `1rem` | `16px` | `1.4` | `600` | "2026년 5월 29일" |
| `--text-body-1` | 기본 본문 / 입력값 | `1rem` | `16px` | `1.5` | `400` | 물건 이름 텍스트 |
| `--text-body-2` | 보조 본문 | `0.9375rem` | `15px` | `1.5` | `400` | 카드 상세 텍스트 |
| `--text-label` | 버튼 레이블 | `1rem` | `16px` | `1` | `600` | CTA 버튼 문구 |
| `--text-caption` | 배지 / 보조 정보 | `0.75rem` | `12px` | `1.4` | `500` | 카테고리 배지 |
| `--text-counter` | 카운터 숫자 | `0.8125rem` | `13px` | `1` | `500` | "0 / 3" |

```css
/* globals.css 추가 */
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
```

### 4.2 Tailwind 타이포그래피 유틸리티 예시

```tsx
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
```

---

## 5. 컴포넌트 상세 사양

### 5.1 Input (텍스트 입력창)

물건 이름을 입력하는 단일 행 텍스트 필드.

**레이아웃**

| 속성 | 값 |
|:---|:---|
| 높이 (Height) | `52px` |
| 가로 패딩 (Padding X) | `16px` |
| 세로 패딩 (Padding Y) | `14px` |
| Border Radius | `var(--radius)` → `12px` |
| Border Width | `1px` |

**상태별 토큰 매핑**

| 상태 | `background` | `border` | `text` | `placeholder` | `ring` |
|:---|:---|:---|:---|:---|:---|
| **Default** | `--card` (`#FFFFFF`) | `--border` (`#E5E5EA`) | `--foreground` | `--muted` | — |
| **Focus** | `--card` | `--primary` (`#111111`) | `--foreground` | `--muted` | `--ring` 2px offset |
| **Filled** | `--card` | `--border` | `--foreground` | — | — |
| **Disabled** | `--secondary` (`#F2F2F7`) | `--border` | `--muted` | `--muted` | — |
| **Error** | `#FFF5F5` | `--destructive` | `--foreground` | — | — |

```tsx
<input
  className={cn(
    "h-[52px] w-full rounded-[var(--radius)] border border-[rgb(var(--border))]",
    "bg-[rgb(var(--card))] px-4 py-[14px]",
    "text-[16px] font-normal text-[rgb(var(--foreground))]",
    "placeholder:text-[rgb(var(--muted))]",
    "transition-all duration-150 ease-out outline-none",
    "focus:border-[rgb(var(--primary))] focus:ring-2 focus:ring-[rgb(var(--ring))]/20",
    "disabled:bg-[rgb(var(--secondary))] disabled:text-[rgb(var(--muted))] disabled:cursor-not-allowed",
  )}
/>
```

---

### 5.2 Button (CTA 와이드 버튼)

화면 최하단에 고정되는 전폭(full-width) CTA 버튼.

**레이아웃**

| 속성 | 값 |
|:---|:---|
| 높이 (Height) | `56px` |
| 가로 패딩 (Padding X) | `24px` |
| 세로 패딩 (Padding Y) | `0px` (height 고정) |
| 너비 (Width) | `100%` (좌우 각 `16px` 마진 차감) |
| Border Radius | `var(--radius)` → `12px` |
| 레이블 간격 (Icon ↔ Label Gap) | `8px` |
| Bottom Safe Area | `env(safe-area-inset-bottom)` 추가 |

**상태별 토큰 매핑**

| 상태 | `background` | `text` | `opacity` | 트리거 조건 |
|:---|:---|:---|:---|:---|
| **Disabled** | `--muted` (`#8E8E93`) | `#FFFFFF` | `1` | 입력값 전부 빈 값 |
| **Enabled** | `--primary` (`#111111`) | `--primary-foreground` | `1` | 1개 이상 입력 시 |
| **Pressed** | `#2C2C2E` | `--primary-foreground` | `0.9` | 터치 다운 |
| **Loading** | `--primary` | `--primary-foreground` | `0.7` | 제출 처리 중 |

```tsx
<button
  disabled={!hasInput}
  className={cn(
    "w-full h-[56px] rounded-[var(--radius)]",
    "flex items-center justify-center gap-2",
    "text-[16px] font-semibold leading-none tracking-tight",
    "transition-all duration-200 ease-out select-none",
    "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]",
    "active:opacity-90 active:scale-[0.99]",
    "disabled:bg-[rgb(var(--muted))] disabled:cursor-not-allowed disabled:pointer-events-none",
  )}
>
  오늘의 비움 완료하기
</button>
```

> **Submit 애니메이션**: 버튼 클릭 시 `scale(0.97) → scale(1)` 리바운드 + 입력창 페이드아웃 (`opacity: 0, translateY: -4px`, 200ms ease-out).

---

### 5.3 Badge (카테고리 태그)

카테고리를 표시하거나 선택하는 인라인 배지 컴포넌트.

**레이아웃**

| 속성 | 값 |
|:---|:---|
| 높이 (Height) | `28px` |
| 가로 패딩 (Padding X) | `10px` |
| 세로 패딩 (Padding Y) | `6px` |
| Border Radius | `var(--radius-sm)` → `8px` |
| 폰트 | `12px / 500` |
| 최소 터치 영역 | `height: 44px` 터치 히트슬롭 확장 |

**상태별 토큰 매핑**

| 상태 | `background` | `text` | 설명 |
|:---|:---|:---|:---|
| **Default (미선택)** | `--secondary` (`#F2F2F7`) | `--muted` (`#8E8E93`) | 아직 선택 전 |
| **Selected** | 카테고리별 `--cat-*-bg` | 카테고리별 `--cat-*-text` | 카테고리 토큰 사용 |
| **Pressed** | `--accent` (`#F2F2F7`) | `--foreground` | 터치 피드백 |

```tsx
const CATEGORIES = [
  { id: 'clothing',    label: '#의류',     bg: 'var(--cat-clothing-bg)',    text: 'var(--cat-clothing-text)' },
  { id: 'goods',       label: '#잡화',     bg: 'var(--cat-goods-bg)',       text: 'var(--cat-goods-text)' },
  { id: 'book',        label: '#도서',     bg: 'var(--cat-book-bg)',        text: 'var(--cat-book-text)' },
  { id: 'furniture',   label: '#가구',     bg: 'var(--cat-furniture-bg)',   text: 'var(--cat-furniture-text)' },
  { id: 'electronics', label: '#전자기기', bg: 'var(--cat-electronics-bg)', text: 'var(--cat-electronics-text)' },
  { id: 'etc',         label: '#기타',     bg: 'var(--cat-etc-bg)',         text: 'var(--cat-etc-text)' },
];
```

---

### 5.4 Card (아카이브 카드)

아카이브 피드의 개별 물건 기록 카드.

**레이아웃**

| 속성 | 값 |
|:---|:---|
| 가로 패딩 (Padding X) | `16px` |
| 세로 패딩 (Padding Y) | `16px` |
| Border Radius | `var(--radius-lg)` → `16px` |
| Shadow | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` |
| 카드 간 간격 (Gap) | `10px` |

**내부 요소 구성**

```
┌─────────────────────────────────┐
│ [날짜 소제목 — text-heading-2]  │  ← 그룹 헤더
├─────────────────────────────────┤
│ padding: 16px                   │
│  [물건 이름 — text-body-1 Bold] │
│  gap: 6px                       │
│  [#카테고리 배지]               │
└─────────────────────────────────┘
```

**상태별 토큰 매핑**

| 상태 | `background` | `border` | `shadow` |
|:---|:---|:---|:---|
| **Default** | `--card` (`#FFFFFF`) | `--border` (`1px`) | subtle shadow |
| **Pressed** | `--accent` (`#F2F2F7`) | `--border` | none |

---

## 6. 스페이싱 시스템

4px 기반 그리드를 사용합니다.

| 토큰 | 값 | 사용 예시 |
|:---|:---:|:---|
| `--space-1` | `4px` | 아이콘 ↔ 텍스트 최소 간격 |
| `--space-2` | `8px` | 배지 내부 간격, 소항목 간격 |
| `--space-3` | `12px` | 입력 행 내부 요소 간격 |
| `--space-4` | `16px` | 화면 좌우 마진, 카드 패딩 |
| `--space-5` | `20px` | 섹션 헤더 하단 여백 |
| `--space-6` | `24px` | 섹션 간 여백 |
| `--space-8` | `32px` | 주요 섹션 구분 |
| `--space-10` | `40px` | 화면 상단 safe area 여유 |

---

## 7. 하단 탭바 (Bottom Navigation Bar) 사양

| 속성 | 값 |
|:---|:---|
| 높이 | `56px` + `env(safe-area-inset-bottom)` |
| 배경 | `--card` + `backdrop-filter: blur(12px)` |
| 상단 경계선 | `1px solid rgb(var(--border))` |
| 탭 간 Gap | `flex justify-around` |
| 아이콘 크기 | `24px` |
| 아이콘 ↔ 레이블 Gap | `4px` |
| 활성 탭 색상 | `--primary` (`#111111`) + `font-weight: 700` |
| 비활성 탭 색상 | `--muted` (`#8E8E93`) + `font-weight: 400` |
| 전환 애니메이션 | `transition: color 150ms ease-out` |

---

## 8. 피그마 로컬 스타일 등록 가이드

피그마 무료 플랜에서는 Variables(Dev 플랜 전용) 대신 **Local Styles**를 활용합니다.

### 8.1 컬러 스타일 등록 순서

```
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
```

### 8.2 텍스트 스타일 등록 순서

```
Typography/
  Display         → Pretendard 28px / Bold / LH 1.3
  Heading-1       → Pretendard 20px / Bold / LH 1.4
  Heading-2       → Pretendard 16px / SemiBold / LH 1.4
  Body-1          → Pretendard 16px / Regular / LH 1.5
  Body-2          → Pretendard 15px / Regular / LH 1.5
  Label           → Pretendard 16px / SemiBold / LH 1.0
  Caption         → Pretendard 12px / Medium / LH 1.4
  Counter         → Pretendard 13px / Medium / LH 1.0
```

---

## 9. 변경 이력

| 버전 | 날짜 | 변경 내용 |
|:---|:---|:---|
| 1.0.0 | 2026-05-29 | 초안 작성 — 컬러, 타이포그래피, 4개 컴포넌트 사양 정의 |
| 1.1.0 | 2026-05-29 | [v0 프로토타입 검증 반영] 키워드 매칭 기반 카테고리 자동 태깅 규칙 추가, 아카이브 내 인앱 데이터 수정(바텀시트) 및 삭제(iOS Red 토큰) 기능 추가, 모바일 뷰 넘침 방지를 위한 카테고리 드롭다운 상단 노출(Drop-up) 및 레이어 리셋 규칙 정의 |
