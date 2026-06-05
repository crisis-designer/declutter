"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { CategorySelector, CategoryId, CATEGORIES } from "./category-badge"
import type { DeclutterItem } from "@/app/page"

interface EditBottomSheetProps {
  item: DeclutterItem | null
  isOpen: boolean
  onClose: () => void
  onSave: (id: string, name: string, category: CategoryId) => void
  onDelete: (id: string) => void
}

export function EditBottomSheet({ item, isOpen, onClose, onSave, onDelete }: EditBottomSheetProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState<CategoryId>("etc")
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)

  // 아이템이 변경되면 상태 동기화
  useEffect(() => {
    if (item) {
      setName(item.name)
      setCategory(item.category as CategoryId)
    }
  }, [item])

  // 바텀시트가 닫힐 때 드롭다운 상태 리셋
  useEffect(() => {
    if (!isOpen) {
      setIsSelectorOpen(false)
    }
  }, [isOpen])

  // ESC 키로 닫기
  useEffect(() => {
    if (!isOpen) return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const handleSave = () => {
    if (!item || name.trim() === "") return
    onSave(item.id, name.trim(), category)
    onClose()
  }

  const handleDelete = () => {
    if (!item) return
    onDelete(item.id)
    onClose()
  }

  if (!isOpen || !item) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 z-40 transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 z-50",
          "bg-card rounded-t-[16px]",
          "shadow-[0_-4px_20px_rgba(0,0,0,0.1)]",
          "transform transition-transform duration-300 ease-out",
          "overflow-visible",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-[36px] h-[4px] rounded-full bg-border" />
        </div>

        {/* Content */}
        <div className="px-5 pb-8">
          {/* Title */}
          <h2 className="text-[18px] font-bold text-foreground mb-5">
            기록 수정하기
          </h2>

          {/* Input Field */}
          <div className={cn("relative mb-4 overflow-visible", isSelectorOpen && "z-[100]")}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="물건 이름을 입력하세요"
              className={cn(
                "h-[52px] w-full rounded-[12px] border border-border",
                "bg-background px-4 py-[14px] pr-[110px]",
                "text-[16px] font-normal text-foreground",
                "placeholder:text-muted",
                "transition-all duration-150 outline-none",
                "focus:border-primary focus:ring-2 focus:ring-ring/20"
              )}
            />

            {/* Category Badge Selector */}
            <div 
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={(e) => e.stopPropagation()}
            >
              <CategorySelector
                selectedCategory={category}
                onSelect={setCategory}
                isOpen={isSelectorOpen}
                onToggle={() => setIsSelectorOpen(!isSelectorOpen)}
                dropUp
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            disabled={name.trim() === ""}
            onClick={handleSave}
            className={cn(
              "w-full h-[52px] rounded-[12px]",
              "flex items-center justify-center",
              "text-[16px] font-semibold leading-none",
              "transition-all duration-200 ease-out",
              name.trim() !== ""
                ? "bg-primary text-primary-foreground active:opacity-90 active:scale-[0.99]"
                : "bg-muted text-white cursor-not-allowed"
            )}
          >
            수정 완료
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className={cn(
              "w-full mt-3 py-3",
              "text-[14px] font-medium",
              "text-destructive",
              "transition-opacity duration-150",
              "active:opacity-70"
            )}
          >
            이 기록 삭제하기
          </button>
        </div>
      </div>
    </>
  )
}
