"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { CategorySelector, CategoryId, CATEGORIES, detectCategoryFromText } from "./category-badge"

interface InputRowProps {
  index: number
  value: string
  category: CategoryId
  onValueChange: (value: string) => void
  onCategoryChange: (category: CategoryId) => void
  placeholder?: string
}

export function InputRow({
  index,
  value,
  category,
  onValueChange,
  onCategoryChange,
  placeholder = "비운 물건을 입력하세요",
}: InputRowProps) {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const [isManualOverride, setIsManualOverride] = useState(false)
  const prevValueRef = useRef(value)

  // Close selector when clicking outside
  useEffect(() => {
    if (!isSelectorOpen) return
    
    const handleClickOutside = () => setIsSelectorOpen(false)
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isSelectorOpen])

  // 키워드 기반 카테고리 자동 추천
  useEffect(() => {
    // 수동 오버라이드 상태면 자동 추천 스킵
    if (isManualOverride) return
    
    // 값이 변경되었을 때만 실행
    if (prevValueRef.current === value) return
    prevValueRef.current = value

    const detectedCategory = detectCategoryFromText(value)
    if (detectedCategory && detectedCategory !== category) {
      onCategoryChange(detectedCategory)
    }
  }, [value, category, isManualOverride, onCategoryChange])

  // 수동 카테고리 변경 핸들러
  const handleManualCategoryChange = (newCategory: CategoryId) => {
    setIsManualOverride(true)
    onCategoryChange(newCategory)
  }

  // 입력값 변경 핸들러
  const handleValueChange = (newValue: string) => {
    // 입력값이 비워지면 수동 오버라이드 해제
    if (newValue.trim() === "") {
      setIsManualOverride(false)
    }
    onValueChange(newValue)
  }

  return (
    <div className={cn("flex items-center gap-3 relative", isSelectorOpen && "z-50")}>
      {/* Counter */}
      <span className="text-[13px] font-medium text-muted w-[20px] text-center shrink-0">
        {index}
      </span>

      {/* Input Field */}
      <div className="flex-1 relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleValueChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-[52px] w-full rounded-[12px] border border-border",
            "bg-card px-4 py-[14px] pr-[110px]",
            "text-[16px] font-normal text-foreground",
            "placeholder:text-muted",
            "transition-all duration-150 outline-none",
            "focus:border-primary focus:ring-2 focus:ring-ring/20"
          )}
        />

        {/* Category Badge Selector (inside input) */}
        <div 
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={(e) => e.stopPropagation()}
        >
          <CategorySelector
            selectedCategory={category}
            onSelect={handleManualCategoryChange}
            isOpen={isSelectorOpen}
            onToggle={() => setIsSelectorOpen(!isSelectorOpen)}
          />
        </div>
      </div>
    </div>
  )
}
