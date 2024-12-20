import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
	useEffect(() => {
		document.title = "註冊頁面"; // 更改標題
	}, []);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				throw new Error("註冊失敗，請再試一次。");
			}
			alert("註冊成功！請重新登入。");
			navigate("/login"); // 跳轉到登入頁
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen-navbar bg-gray-100">
			<div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
				<h2 className="text-2xl font-bold mb-6 text-center text-green-600">
					帳號註冊
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="username"
							className="block text-gray-700 font-medium mb-2"
						>
							帳號：
						</label>
						<input
							type="text"
							id="username"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="請輸入帳號"
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
							placeholder="請輸入密碼"
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
							required
						/>
					</div>
					{error && <p className="text-red-500 mb-4">{error}</p>}
					<button
						type="submit"
						className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
					>
						註冊
					</button>
				</form>
				<p className="text-center text-gray-600 mt-4">
					已有帳號？{" "}
					<Link
						to="/login"
						className="text-green-500 hover:underline"
					>
						返回登入
					</Link>
				</p>
			</div>
		</div>
	);
}

export default RegisterPage;
