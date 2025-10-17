"use client";

import React, { useState } from "react";

type ToggleProps = {
	studyId: string;
	isRecruiting: boolean;
	isMax: boolean;
};


export default function Toggle({ studyId, isRecruiting, isMax }: ToggleProps) {
	const [recruiting, setRecruiting] = useState<boolean>(isRecruiting);

	const handleToggle = async (e: React.SyntheticEvent) => {
		e.stopPropagation();
		e.preventDefault();
		if (isMax) return;

		const newRecruiting = !recruiting;
		setRecruiting(newRecruiting);

		try {
			const res = await fetch(`/api/mypage/created/${studyId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ isRecruiting: newRecruiting }),
			});

			const data = await res.json();
			if (!res.ok) console.error("스터디 업데이트 실패:", data.error);
		} catch (err) {
			console.error("통신 에러:", err);
		}

	};

	return (
		<div className="flex gap-4">
			<span className={`text-primary-700 ${!isRecruiting ? "opacity-60" : ""}`}>
				{isMax ? "인원 마감" : recruiting ? "모집 중" : "모집 완료"}
			</span>
			<div
				className={`w-12 h-6 bg-gray-200 shadow-inner shadow-black/25 rounded-full flex items-center 
					${isMax ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
				onClick={(e) => handleToggle(e)}>
				<div
					className={`w-4 h-4 rounded-full m-1 transition-all duration-200 
						${recruiting ? "bg-primary-500 ml-7" : "bg-gray-400 ml-1"}`}
				/>
			</div>
		</div>
	);
}
