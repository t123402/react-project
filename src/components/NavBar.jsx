import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 假設使用 AuthContext 提供登入狀態

function NavBar() {
	const { user, setUser, loading } = useAuth(); // 從 AuthContext 取得使用者資訊和登出方法

	// 登出邏輯
	const handleLogout = async () => {
		await fetch("/auth/logout", { method: "POST", credentials: "include" });
		setUser(null);
	};

	const welcomeMessage = (user) => {
		if (!user) return "歡迎光臨本站！";
		const genderTitle =
			user.gender === "M"
				? "先生"
				: user.gender === "F"
				? "小姐"
				: "會員";
		if (user.roleid === "1" || user.roleid === "2")
			return `恭迎 ${user.rolename} ${user.nickname} 回歸本站！`;
		const displayName = user.nickname || user.username; // 如果 nickname 不存在則使用 username
		return `你好 ${displayName} ${genderTitle}，歡迎回來！`;
	};

	if (loading) return null; // 加載中時不顯示 NavBar

	return (
		<nav className="bg-green-100 text-green-700 p-4 shadow-md">
			<div className="container mx-auto flex items-center justify-between">
				{/* 左側歡迎訊息 */}
				<div className="text-lg font-semibold">
					{welcomeMessage(user)}
				</div>

				{/* 右側連結 */}
				<div className="flex space-x-4 items-center">
					<Link
						to="/"
						className="hover:text-green-900 transition-colors"
					>
						首頁
					</Link>
					<Link
						to="/about"
						className="hover:text-green-900 transition-colors"
					>
						關於
					</Link>
					<Link
						to="/item"
						className="hover:text-green-900 transition-colors"
					>
						物品管理
					</Link>
					{user ? (
						// 已登入時顯示「登出」
						<button
							onClick={handleLogout}
							className="hover:text-green-900 transition-colors"
						>
							登出
						</button>
					) : (
						// 未登入時顯示「登入」和「註冊」
						<>
							<Link
								to="/login"
								className="hover:text-green-900 transition-colors"
							>
								登入
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

export default NavBar;
