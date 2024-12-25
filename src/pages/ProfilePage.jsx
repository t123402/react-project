import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // 假設使用 AuthContext 提供登入狀態

function ProfilePage() {
	useEffect(() => {
		document.title = "會員資料"; // 更改標題
	}, []);

	const { user, refreshUser } = useAuth();
	const [nickname, setNickname] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [gender, setGender] = useState("");
	const [birthday, setBirthday] = useState("");
	const [error, setError] = useState("");

	// 加載資料
	useEffect(() => {
		loadProfile(user.username);
	}, []);

	// 查詢 Profile
	const loadProfile = async (username) => {
		try {
			const response = await fetch(`/auth/profile/${username}`);
			if (!response.ok) throw new Error("無法加載用戶資訊");
			const data = await response.json();
			setNickname(data.nickname || "");
			setFirstname(data.firstname || "");
			setLastname(data.lastname || "");
			setEmail(data.email || "");
			setGender(data.gender || "");
			setBirthday(data.birthday || "");
		} catch (error) {
			console.error("加載用戶資訊錯誤：", error);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// 如果 email 不為空，檢查格式
		if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError("請輸入有效的電子郵件地址");
			return;
		}

		try {
			const response = await fetch(
				`/auth/profile/update/${user.username}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						nickname,
						firstname,
						lastname,
						email,
						gender,
						birthday,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("會員資料已更新失敗，請再試一次。");
			}
			await refreshUser(); // 更新成功後手動刷新用戶資料
			alert("會員資料已更新成功！");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen-navbar bg-gray-100">
			<div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
				<h2 className="text-2xl font-bold mb-6 text-center text-green-600">
					會員資料
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
							value={user.username}
							readOnly
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
							disabled
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
						儲存
					</button>
				</form>
			</div>
		</div>
	);
}

export default ProfilePage;
