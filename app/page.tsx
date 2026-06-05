"use client"

import { useState } from "react"
import { MainInputScreen } from "@/components/declutter/main-input-screen"
import { ArchiveScreen } from "@/components/declutter/archive-screen"
import { BottomTabBar } from "@/components/declutter/bottom-tab-bar"
import { PhoneFrame } from "@/components/declutter/phone-frame"
import { EditBottomSheet } from "@/components/declutter/edit-bottom-sheet"
import { CategoryId } from "@/components/declutter/category-badge"

export interface DeclutterItem {
  id: string
  name: string
  category: string
  date: string
}

export default function DeclutterApp() {
  const [activeTab, setActiveTab] = useState<"input" | "archive">("input")
  const [items, setItems] = useState<DeclutterItem[]>([
    // 샘플 데이터
    { id: "1", name: "안 입는 청바지", category: "clothing", date: "2026-05-28" },
    { id: "2", name: "오래된 충전 케이블", category: "electronics", date: "2026-05-28" },
    { id: "3", name: "읽은 책 3권", category: "book", date: "2026-05-27" },
  ])

  // 수정 바텀시트 상태
  const [editingItem, setEditingItem] = useState<DeclutterItem | null>(null)
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)

  const handleAddItems = (newItems: Omit<DeclutterItem, "id" | "date">[]) => {
    const today = new Date().toISOString().split("T")[0]
    const itemsToAdd = newItems.map((item, index) => ({
      ...item,
      id: `${Date.now()}-${index}`,
      date: today,
    }))
    setItems((prev) => [...itemsToAdd, ...prev])
    setActiveTab("archive")
  }

  // 아카이브 카드 클릭 시 수정 바텀시트 열기
  const handleItemClick = (item: DeclutterItem) => {
    setEditingItem(item)
    setIsEditSheetOpen(true)
  }

  // 수정 저장
  const handleSaveEdit = (id: string, name: string, category: CategoryId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, name, category } : item
      )
    )
  }

  // 삭제
  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // 바텀시트 닫기
  const handleCloseEditSheet = () => {
    setIsEditSheetOpen(false)
    setEditingItem(null)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#E5E5EA]">
      <PhoneFrame>
        <div className="relative h-full flex flex-col bg-background">
          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden">
            {activeTab === "input" ? (
              <MainInputScreen onSubmit={handleAddItems} />
            ) : (
              <ArchiveScreen items={items} onItemClick={handleItemClick} />
            )}
          </div>

          {/* Bottom Tab Bar */}
          <BottomTabBar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Edit Bottom Sheet */}
          <EditBottomSheet
            item={editingItem}
            isOpen={isEditSheetOpen}
            onClose={handleCloseEditSheet}
            onSave={handleSaveEdit}
            onDelete={handleDelete}
          />
        </div>
      </PhoneFrame>
    </div>
  )
}
