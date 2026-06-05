"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { InputRow } from "./input-row"
import { CategoryId } from "./category-badge"

interface InputData {
  value: string
  category: CategoryId
}

interface MainInputScreenProps {
  onSubmit: (items: { name: string; category: string }[]) => void
}

export function MainInputScreen({ onSubmit }: MainInputScreenProps) {
  const [inputs, setInputs] = useState<InputData[]>([
    { value: "", category: "clothing" },
    { value: "", category: "goods" },
    { value: "", category: "etc" },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const hasAnyInput = inputs.some((input) => input.value.trim() !== "")
  const filledCount = inputs.filter((input) => input.value.trim() !== "").length

  const handleValueChange = (index: number, value: string) => {
    setInputs((prev) =>
      prev.map((input, i) => (i === index ? { ...input, value } : input))
    )
  }

  const handleCategoryChange = (index: number, category: CategoryId) => {
    setInputs((prev) =>
      prev.map((input, i) => (i === index ? { ...input, category } : input))
    )
  }

  const handleSubmit = async () => {
    if (!hasAnyInput || isSubmitting) return

    setIsSubmitting(true)

    // 애니메이션 딜레이
    await new Promise((resolve) => setTimeout(resolve, 300))

    const itemsToSubmit = inputs
      .filter((input) => input.value.trim() !== "")
      .map((input) => ({
        name: input.value.trim(),
        category: input.category,
      }))

    onSubmit(itemsToSubmit)

    // 입력창 초기화
    setInputs([
      { value: "", category: "clothing" },
      { value: "", category: "goods" },
      { value: "", category: "etc" },
    ])
    setIsSubmitting(false)
  }

  // 현재 날짜 포맷
  const today = new Date()
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일, 오늘의 비움`

  return (
    <div className="h-full flex flex-col px-4">
      {/* Header */}
      <div className="pt-6 pb-8">
        <p className="text-[13px] font-medium tracking-tight text-muted mb-2">
          {formattedDate}
        </p>
        <h1 className="text-[28px] font-bold leading-[1.3] text-foreground">
          오늘 무엇을
          <br />
          비우셨나요?
        </h1>
      </div>

      {/* Input Fields */}
      <div className="flex-1 space-y-3">
        {inputs.map((input, index) => (
          <div
            key={index}
            className={cn(
              "transition-all duration-200",
              isSubmitting && input.value.trim() !== "" && "opacity-0 -translate-y-1"
            )}
          >
            <InputRow
              index={index + 1}
              value={input.value}
              category={input.category}
              onValueChange={(value) => handleValueChange(index, value)}
              onCategoryChange={(category) => handleCategoryChange(index, category)}
              placeholder={
                index === 0
                  ? "예: 안 입는 청바지"
                  : index === 1
                  ? "예: 고장난 이어폰"
                  : "예: 오래된 책 3권"
              }
            />
          </div>
        ))}

        {/* Counter */}
        <div className="flex justify-end pt-2">
          <span className="text-[13px] font-medium text-muted">
            {filledCount} / 3
          </span>
        </div>
      </div>

      {/* CTA Button */}
      <div className="py-4 pb-6">
        <button
          disabled={!hasAnyInput}
          onClick={handleSubmit}
          className={cn(
            "w-full h-[56px] rounded-[12px]",
            "flex items-center justify-center gap-2",
            "text-[16px] font-semibold leading-none tracking-tight",
            "transition-all duration-200 ease-out select-none",
            hasAnyInput
              ? "bg-primary text-primary-foreground active:opacity-90 active:scale-[0.99]"
              : "bg-muted text-white cursor-not-allowed"
          )}
        >
          {isSubmitting ? (
            <span className="animate-pulse">저장 중...</span>
          ) : (
            "오늘의 비움 완료하기"
          )}
        </button>
      </div>
    </div>
  )
}
