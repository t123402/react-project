import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 假設使用 AuthContext 提供登入狀態

function ChangePasswordPage() {
	useEffect(() => {
		document.title = "修改密碼"; // 更改標題
	}, []);

	const { user } = useAuth();
	const [oldPassword, setOldPassword] = useState(""); // 原密碼
	const [newPassword, setNewPassword] = useState(""); // 新密碼
	const [confirmPassword, setConfirmPassword] = useState(""); // 確認密碼
	const [error, setError] = useState(""); // 錯誤訊息
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		// 驗證新密碼與確認密碼是否一致
		if (newPassword !== confirmPassword) {
			setError("新密碼與確認密碼不一致");
			return;
		}

		try {
			const response = await fetch(
				`/auth/change-password/${user.username}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						oldPassword,
						newPassword,
					}),
				}
			);

			if (!response.ok) {
				if (response.status === 401) {
					throw new Error("原密碼不正確");
				} else {
					throw new Error("修改密碼失敗，請再試一次");
				}
			}
			alert("密碼修改成功！");
			navigate("/profile");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen-navbar bg-gray-100">
			<div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
				<h2 className="text-2xl font-bold mb-6 text-center text-green-600">
					修改密碼
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="oldPassword"
							className="block text-gray-700 font-medium mb-2"
						>
							原密碼 <span className="text-red-500">*</span>：
						</label>
						<input
							type="password"
							id="oldPassword"
							name="oldPassword"
							value={oldPassword}
							onChange={(e) => setOldPassword(e.target.value)}
							placeholder="請輸入原密碼"
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="newPassword"
							className="block text-gray-700 font-medium mb-2"
						>
							新密碼 <span className="text-red-500">*</span>：
						</label>
						<input
							type="password"
							id="newPassword"
							name="newPassword"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							placeholder="請輸入新密碼"
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="confirmPassword"
							className="block text-gray-700 font-medium mb-2"
						>
							確認密碼 <span className="text-red-500">*</span>：
						</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="請再次輸入新密碼"
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
							required
						/>
					</div>
					{error && <p className="text-red-500 mb-4">{error}</p>}
					<button
						type="submit"
						className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
					>
						確認修改
					</button>
				</form>
			</div>
		</div>
	);
}

export default ChangePasswordPage;
