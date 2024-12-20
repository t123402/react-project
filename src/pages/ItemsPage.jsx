import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ItemsPage() {
	useEffect(() => {
		document.title = "物品管理"; // 更改標題
	}, []);

	const [items, setItems] = useState([]);
	const [newItem, setNewItem] = useState("");

	// 加載資料
	useEffect(() => {
		loadItems();
	}, []);

	// 查詢 Items
	const loadItems = async () => {
		try {
			const response = await fetch("/api/items");
			if (!response.ok) throw new Error("無法加載物品");
			const data = await response.json();
			setItems(data);
		} catch (error) {
			console.error("加載物品錯誤：", error);
		}
	};

	// 新增 Item
	const addItem = async () => {
		if (!newItem) {
			alert("請輸入物品名稱！");
			return;
		}
		try {
			const response = await fetch("/api/items/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ value: newItem }),
			});
			if (!response.ok) throw new Error("新增失敗");
			alert("新增成功！"); // 新增成功提示
			setNewItem(""); // 清空輸入框
			loadItems(); // 重新加載表格
		} catch (error) {
			alert("新增物品發生錯誤。");
		}
	};

	// 刪除 Item
	const deleteItem = async (id) => {
		try {
			const response = await fetch(`/api/items/delete/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) throw new Error("刪除失敗");
			alert("刪除成功！"); // 刪除成功提示
			loadItems(); // 重新加載表格
		} catch (error) {
			alert("刪除物品發生錯誤。");
		}
	};

	// 修改 Item
	const editItem = async (id, currentValue) => {
		const newValue = prompt("輸入新名稱：", currentValue);
		if (!newValue || newValue === currentValue) return;
		try {
			const response = await fetch(`/api/items/update/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ value: newValue }),
			});
			if (!response.ok) throw new Error("編輯失敗");
			alert("編輯成功！"); // 編輯成功提示
			loadItems(); // 重新加載表格
		} catch (error) {
			alert("編輯物品發生錯誤。");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen-navbar bg-gray-100">
			<div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
				<h1 className="text-2xl font-bold mb-6 text-center text-green-600">
					物品管理
				</h1>
				<div className="flex items-center justify-between mb-6">
					<Link to="/" className="text-green-500 hover:underline">
						回首頁
					</Link>

					{/* 新增物品 */}
					<div className="flex items-center space-x-2">
						<input
							type="text"
							value={newItem}
							onChange={(e) => setNewItem(e.target.value)}
							placeholder="輸入物品名稱"
							className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
						<button
							onClick={addItem}
							className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
						>
							新增物品
						</button>
					</div>
				</div>
				{/* 物品列表 */}
				<table className="w-full table-fixed border-collapse border border-gray-300">
					<thead>
						<tr className="bg-gray-100">
							<th className="border border-gray-300 px-4 py-2 w-[5rem] text-center">
								編號
							</th>
							<th className="border border-gray-300 px-4 py-2 text-center">
								物品名稱
							</th>
							<th className="border border-gray-300 px-4 py-2 w-[10rem] text-center">
								操作
							</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<tr key={item.id} className="text-center">
								<td className="border border-gray-300 px-4 py-2 text-center">
									{item.id}
								</td>
								<td className="border border-gray-300 px-4 py-2 text-center">
									{item.value}
								</td>
								<td className="border border-gray-300 px-4 py-2 space-x-2  flex justify-center">
									<button
										onClick={() =>
											editItem(item.id, item.value)
										}
										className="bg-blue-500 text-white w-16 py-1 px-3 rounded hover:bg-blue-600"
									>
										編輯
									</button>
									<button
										onClick={() => deleteItem(item.id)}
										className="bg-red-500 text-white w-16 py-1 px-3 rounded hover:bg-red-600"
									>
										刪除
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ItemsPage;
