import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
	useEffect(() => {
		document.title = "註冊頁面"; // 更改標題
	}, []);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [nickname, setNickname] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState("");
	const [birthday, setBirthday] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		// 簡單驗證邏輯
		if (password !== confirmPassword) {
			setError("確認密碼與密碼不一致");
			return;
		}

		// 如果 email 不為空，檢查格式
		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError("請輸入有效的電子郵件地址");
			return;
		}

		try {
			const response = await fetch("/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username,
					password,
					nickname,
					firstname,
					lastname,
					email,
					gender,
					birthday,
				}),
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
			<div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
				<h2 className="text-2xl font-bold mb-6 text-center text-green-600">
					帳號註冊
				</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="username"
							className="block text-gray-700 font-medium mb-2"
						>
							帳號 <span className="text-red-500">*</span>：
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
							密碼 <span className="text-red-500">*</span>：
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
							placeholder="請再次輸入密碼"
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
							required
						/>
					</div>
					<div className="mb-4 flex gap-4">
						<div className="w-1/3">
							<label
								htmlFor="nickname"
								className="block text-gray-700 font-medium mb-2"
							>
								暱稱：
							</label>
							<input
								type="text"
								id="nickname"
								name="nickname"
								value={nickname}
								onChange={(e) => setNickname(e.target.value)}
								placeholder="暱稱"
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
							/>
						</div>
						<div className="w-1/3">
							<label
								htmlFor="firstname"
								className="block text-gray-700 font-medium mb-2"
							>
								名：
							</label>
							<input
								type="text"
								id="firstname"
								name="firstname"
								value={firstname}
								onChange={(e) => setFirstname(e.target.value)}
								placeholder="名"
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
							/>
						</div>
						<div className="w-1/3">
							<label
								htmlFor="lastname"
								className="block text-gray-700 font-medium mb-2"
							>
								姓：
							</label>
							<input
								type="text"
								id="lastname"
								name="lastname"
								value={lastname}
								onChange={(e) => setLastname(e.target.value)}
								placeholder="姓"
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
							/>
						</div>
					</div>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-700 font-medium mb-2"
						>
							電子郵件：
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="請輸入電子郵件"
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
						/>
					</div>
					<div className="mb-4 flex gap-4">
						<div className="w-1/2">
							<span className="block text-gray-700 font-medium mb-2">
								性別：
							</span>
							<select
								id="gender"
								name="gender"
								value={gender}
								onChange={(e) => setGender(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
							>
								<option value="">不選擇性別</option>
								<option value="M">男生</option>
								<option value="F">女生</option>
							</select>
						</div>
						<div className="w-1/2">
							<label
								htmlFor="birthday"
								className="block text-gray-700 font-medium mb-2"
							>
								生日：
							</label>
							<input
								type="date"
								id="birthday"
								name="birthday"
								value={birthday}
								onChange={(e) => setBirthday(e.target.value)}
								className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
							/>
						</div>
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
