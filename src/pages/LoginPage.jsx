import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
	useEffect(() => {
		document.title = "登入頁面"; // 更改標題
	}, []);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { refreshUser } = useAuth(); // 拉取用戶資料
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				throw new Error("登入失敗，請檢查您的用戶名或密碼。");
			}
			await refreshUser(); // 登入成功後手動刷新用戶資料
			alert("登入成功！");
			navigate("/"); // 跳轉到首頁
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen-navbar bg-gray-100">
			<div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
				<h1 className="text-2xl font-bold mb-6 text-center text-green-600">
					會員登入
				</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="username"
							className="block text-gray-700 font-medium mb-2"
						>
							用戶名：
						</label>
						<input
							type="text"
							id="username"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-gray-700 font-medium mb-2"
						>
							密碼：
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
							required
						/>
					</div>
					{error && <p className="text-red-500 mb-4">{error}</p>}
					<button
						type="submit"
						className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
					>
						登入
					</button>
				</form>
				<div className="text-center text-gray-600 mt-4">
					還不是會員？{" "}
					<Link
						to="/register"
						className="text-blue-500 hover:underline"
					>
						註冊帳號
					</Link>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
