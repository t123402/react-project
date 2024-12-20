import React, { createContext, useContext, useState, useEffect } from "react";

// 創建 Context
const AuthContext = createContext();

// 提供 AuthProvider 組件，包裹整個應用
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null); // 保存用戶資訊
	const [loading, setLoading] = useState(true); // 加載狀態

	// 手動拉取用戶資料
	const refreshUser = async () => {
		setLoading(true);
		fetch("/auth/me", { credentials: "include" }) // 攜帶 Cookie 發送請求
			.then((res) => {
				if (!res.ok) throw new Error("未登入");
				return res.json();
			})
			.then((data) => setUser(data)) // 保存用戶資訊
			.catch(() => setUser(null)) // 未登入或發生錯誤
			.finally(() => setLoading(false)); // 結束加載
	};

	// 初次加載應用時檢查登入狀態
	useEffect(() => {
		refreshUser(); // 拉取用戶資料
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, loading, refreshUser }}>
			{children}
		</AuthContext.Provider>
	);
};

// 自定義 Hook，方便取用 AuthContext
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
