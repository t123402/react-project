import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function AboutPage() {
	useEffect(() => {
		document.title = "關於網站"; // 更改標題
	}, []);

	return (
		<div className="flex items-center justify-center min-h-screen-navbar bg-gray-100">
			<div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
				<h1 className="text-2xl font-bold mb-6 text-center text-green-600">
					關於網站
				</h1>
				<div className="flex items-center justify-between mb-6">
					<p>
						這是一個以 Go 語言開發的後端 HTTP Server，搭配 React
						作為前端框架，並採用了 Tailwind CSS 來設計樣式。
						物品管理：支援基本的 CRUD 操作。
						會員系統：提供簡單的會員註冊、登入、資料管理、修改密碼等功能。
						這是一個小型的全端專案，展示了後端開發與前端整合的能力。
					</p>
				</div>
				<div className="text-center items-center mt-4">
					<Link to="/" className="text-green-500 hover:underline">
						回首頁
					</Link>
				</div>
			</div>
		</div>
	);
}

export default AboutPage;
