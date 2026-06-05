"use client"

import { cn } from "@/lib/utils"

export const CATEGORIES = [
  { id: "clothing", label: "#의류", bgVar: "--cat-clothing-bg", textVar: "--cat-clothing-text" },
  { id: "goods", label: "#잡화", bgVar: "--cat-goods-bg", textVar: "--cat-goods-text" },
  { id: "book", label: "#도서", bgVar: "--cat-book-bg", textVar: "--cat-book-text" },
  { id: "furniture", label: "#가구", bgVar: "--cat-furniture-bg", textVar: "--cat-furniture-text" },
  { id: "electronics", label: "#전자기기", bgVar: "--cat-electronics-bg", textVar: "--cat-electronics-text" },
  { id: "etc", label: "#기타", bgVar: "--cat-etc-bg", textVar: "--cat-etc-text" },
] as const

export type CategoryId = typeof CATEGORIES[number]["id"]

// 키워드 기반 카테고리 자동 매칭 룰
export const CATEGORY_KEYWORDS: Record<Exclude<CategoryId, "etc">, string[]> = {
  clothing: ["청바지", "티셔츠", "셔츠", "옷", "패딩", "양말", "신발", "자켓"],
  goods: ["가방", "지갑", "우산", "안경", "시계", "벨트", "모자"],
  book: ["책", "소설", "교재", "잡지", "만화책", "서적", "노트"],
  furniture: ["의자", "책상", "침대", "소파", "서랍장", "테이블", "거울"],
  electronics: ["이어폰", "폰", "마우스", "키보드", "모니터", "충전기", "노트북", "케이블", "담배"],
}

// 입력 텍스트에서 카테고리 자동 추천
export function detectCategoryFromText(text: string): CategoryId | null {
  const lowerText = text.toLowerCase()
  
  for (const [categoryId, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return categoryId as CategoryId
      }
    }
  }
  
  return null
}

interface CategoryBadgeProps {
  categoryId: CategoryId
  selected?: boolean
  onClick?: () => void
  size?: "sm" | "md"
}

export function CategoryBadge({ categoryId, selected = false, onClick, size = "md" }: CategoryBadgeProps) {
  const category = CATEGORIES.find((c) => c.id === categoryId)
  if (!category) return null

  const isClickable = !!onClick

  return (
    <span
      onClick={onClick}
      style={
        selected
          ? {
              backgroundColor: `var(${category.bgVar})`,
              color: `var(${category.textVar})`,
            }
          : undefined
      }
      className={cn(
        "inline-flex items-center whitespace-nowrap transition-all duration-100",
        size === "md" ? "h-[28px] px-[10px] rounded-[8px] text-[12px] font-medium" : "h-[24px] px-[8px] rounded-[6px] text-[11px] font-medium",
        !selected && "bg-secondary text-muted",
        isClickable && "cursor-pointer active:scale-95"
      )}
    >
      {category.label}
    </span>
  )
}

interface CategorySelectorProps {
  selectedCategory: CategoryId
  onSelect: (category: CategoryId) => void
  isOpen: boolean
  onToggle: () => void
  dropUp?: boolean
}

export function CategorySelector({ selectedCategory, onSelect, isOpen, onToggle, dropUp = false }: CategorySelectorProps) {
  return (
    <div className="relative">
      {/* Selected Badge (Toggle Button) */}
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center"
      >
        <CategoryBadge categoryId={selectedCategory} selected />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div 
          className={cn(
            "absolute right-0 z-[100] bg-card border border-border rounded-[12px] p-2 shadow-lg min-w-[140px]",
            dropUp ? "bottom-full mb-2" : "top-full mt-2"
          )}
        >
          <div className="flex flex-col gap-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelect(cat.id)
                  onToggle()
                }}
                className={cn(
                  "flex items-center justify-start px-2 py-2 rounded-[8px] transition-colors",
                  selectedCategory === cat.id ? "bg-accent" : "hover:bg-accent/50"
                )}
              >
                <CategoryBadge categoryId={cat.id} selected={selectedCategory === cat.id} size="sm" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
