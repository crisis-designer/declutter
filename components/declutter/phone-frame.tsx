import { ReactNode } from "react"

interface PhoneFrameProps {
  children: ReactNode
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="relative w-[375px] h-[812px] bg-foreground rounded-[44px] p-[10px] shadow-2xl">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[34px] bg-foreground rounded-b-[18px] z-20" />
      
      {/* Screen Container */}
      <div className="relative w-full h-full bg-background rounded-[34px] overflow-hidden">
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-[44px] flex items-center justify-between px-6 z-10">
          <span className="text-[14px] font-semibold text-foreground">9:41</span>
          <div className="flex items-center gap-1">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none" className="text-foreground">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.5 2.5C10.5 1.67157 11.1716 1 12 1H15C15.8284 1 16.5 1.67157 16.5 2.5V9.5C16.5 10.3284 15.8284 11 15 11H12C11.1716 11 10.5 10.3284 10.5 9.5V2.5Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 4H15V8H12V4Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="h-full pt-[44px]">
          {children}
        </div>
      </div>
    </div>
  )
}
