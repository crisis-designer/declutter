"use client"

import { PenLine, Archive } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomTabBarProps {
  activeTab: "input" | "archive"
  onTabChange: (tab: "input" | "archive") => void
}

export function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
  return (
    <div className="h-[56px] bg-card/80 backdrop-blur-[12px] border-t border-border flex items-center justify-around pb-safe">
      <button
        onClick={() => onTabChange("input")}
        className={cn(
          "flex flex-col items-center gap-1 py-2 px-6 transition-colors duration-150",
          activeTab === "input"
            ? "text-primary"
            : "text-muted"
        )}
      >
        <PenLine className="w-6 h-6" strokeWidth={activeTab === "input" ? 2.5 : 2} />
        <span className={cn(
          "text-[11px]",
          activeTab === "input" ? "font-bold" : "font-normal"
        )}>
          기록하기
        </span>
      </button>
      
      <button
        onClick={() => onTabChange("archive")}
        className={cn(
          "flex flex-col items-center gap-1 py-2 px-6 transition-colors duration-150",
          activeTab === "archive"
            ? "text-primary"
            : "text-muted"
        )}
      >
        <Archive className="w-6 h-6" strokeWidth={activeTab === "archive" ? 2.5 : 2} />
        <span className={cn(
          "text-[11px]",
          activeTab === "archive" ? "font-bold" : "font-normal"
        )}>
          아카이브
        </span>
      </button>
    </div>
  )
}
