"use client"

import { cn } from "@/lib/utils"
import { CategoryBadge, CategoryId } from "./category-badge"
import type { DeclutterItem } from "@/app/page"

interface ArchiveScreenProps {
  items: DeclutterItem[]
  onItemClick: (item: DeclutterItem) => void
}

// 날짜별로 아이템 그룹화
function groupItemsByDate(items: DeclutterItem[]) {
  const groups: Record<string, DeclutterItem[]> = {}
  
  items.forEach((item) => {
    if (!groups[item.date]) {
      groups[item.date] = []
    }
    groups[item.date].push(item)
  })

  // 날짜 내림차순 정렬
  return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
}

// 날짜 포맷팅
function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const isToday = dateStr === today.toISOString().split("T")[0]
  const isYesterday = dateStr === yesterday.toISOString().split("T")[0]

  if (isToday) return "오늘"
  if (isYesterday) return "어제"

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}

export function ArchiveScreen({ items, onItemClick }: ArchiveScreenProps) {
  const groupedItems = groupItemsByDate(items)
  const totalCount = items.length

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-5">
        <h1 className="text-[20px] font-bold leading-[1.4] text-foreground">
          지금까지 비운 기록
        </h1>
        <p className="text-[13px] font-medium text-muted mt-1">
          총 {totalCount}개의 물건을 비웠어요
        </p>
      </div>

      {/* Archive List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {groupedItems.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-6">
            {groupedItems.map(([date, dateItems]) => (
              <div key={date}>
                {/* Date Header */}
                <p className="text-[16px] font-semibold leading-[1.4] text-foreground mb-3">
                  {formatDate(date)}
                </p>

                {/* Items */}
                <div className="space-y-[10px]">
                  {dateItems.map((item) => (
                    <ArchiveCard 
                      key={item.id} 
                      item={item} 
                      onClick={() => onItemClick(item)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      {/* Minimal Icon */}
      <div className="w-[64px] h-[64px] rounded-full bg-secondary flex items-center justify-center mb-5">
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-muted"
        >
          <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z" />
          <path d="M9.5 9.5L14.5 14.5M14.5 9.5L9.5 14.5" />
        </svg>
      </div>
      
      <p className="text-[22px] font-bold leading-[1.3] text-foreground mb-2">
        첫 번째 비움을
        <br />
        시작해보세요!
      </p>
      <p className="text-[14px] text-muted leading-relaxed">
        오늘 하나씩 물건을 비우면
        <br />
        여기에 기록이 쌓여요
      </p>
    </div>
  )
}

interface ArchiveCardProps {
  item: DeclutterItem
  onClick: () => void
}

function ArchiveCard({ item, onClick }: ArchiveCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-[16px] text-left",
        "bg-card border border-border",
        "px-4 py-4",
        "shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]",
        "transition-all duration-100",
        "active:bg-accent active:scale-[0.99]"
      )}
    >
      {/* 물건 이름 */}
      <p className="text-[16px] font-semibold leading-snug text-foreground">
        {item.name}
      </p>
      {/* 카테고리 배지 */}
      <div className="mt-[6px]">
        <CategoryBadge categoryId={item.category as CategoryId} selected size="sm" />
      </div>
    </button>
  )
}
