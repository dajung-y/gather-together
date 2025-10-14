"use client";

import React from "react";

type ToggleProps = {
    on?: boolean;
    disabled?: boolean;
    onToggle?: (e: React.SyntheticEvent) => void;
};

export default function Toggle({ on, disabled, onToggle }: ToggleProps) {
    const isControlled = typeof on === "boolean";
    const rootRef = React.useRef<HTMLDivElement>(null);

    const [inner, setInner] = React.useState<boolean>(on ?? true);
    // 모집완료면 잠금
    const [locked, setLocked] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (isControlled) setInner(on as boolean);
    }, [isControlled, on]);

    React.useLayoutEffect(() => {
        if (isControlled) return;
        const el = rootRef.current;
        const holder = el?.closest("[data-recruiting]") as HTMLElement | null;
        const attr = holder?.getAttribute("data-recruiting");
        if (attr === "true") {
            setInner(true);
            setLocked(false);
        } else if (attr === "false") {
            setInner(false);
            setLocked(true);
        } else {
            setLocked(false);
        }
    }, [isControlled]);

    const computedDisabled = !!disabled || locked;

    const handleToggle = (e: React.SyntheticEvent) => {
        // 카드 라우팅 방지
        e.stopPropagation();
        e.preventDefault();
        if (computedDisabled) return;

        if (!isControlled) setInner((prev) => !prev);

        if (typeof onToggle === "function") onToggle(e);
    };

    const checked = inner;

    return (
        <div
            ref={rootRef}
            className="flex gap-2 select-none"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            title={computedDisabled ? "모집완료 상태에선 변경할 수 없어요" : undefined}
        >
      <span className={`text-primary-700 ${computedDisabled ? "opacity-60" : ""}`}>
        {checked ? "모집 중" : "모집 완료"}
      </span>

            <div
                role="switch"
                aria-checked={checked}
                tabIndex={computedDisabled ? -1 : 0}
                aria-disabled={computedDisabled}
                className={`w-12 h-6 bg-gray-200 shadow-inner shadow-black/25 rounded-full flex items-center ${
                    computedDisabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={handleToggle}
                onKeyDown={(e) => {
                    if ((e.key === " " || e.key === "Enter") && !computedDisabled) handleToggle(e);
                }}
            >
                <div
                    className={`w-4 h-4 rounded-full m-1 transition-all duration-200 ${
                        checked ? "bg-primary-500 ml-7" : "bg-gray-400 ml-1"
                    }`}
                />
            </div>
        </div>
    );
}
