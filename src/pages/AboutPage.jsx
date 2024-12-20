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
						這是一個用 Go 語言開發的簡單 HTTP
						Server。它可以處理靜態頁面顯示和 API
						請求，並與資料庫進行交互，實現基本的 CRUD 操作。
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
