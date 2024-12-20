import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
	const { user, loading } = useAuth();
	const hasAlerted = useRef(false); // 使用 useRef 控制 alert 只顯示一次

	useEffect(() => {
		if (!loading && !user && !hasAlerted.current) {
			alert("您需要登入才能訪問此頁面！");
			hasAlerted.current = true; // 標記已顯示過 alert
		}
	}, [loading, user]);

	if (loading) return <div>加載中...</div>; // 等待驗證完成

	if (!user) {
		return <Navigate to="/login" replace />; // 未登入，跳轉登入頁
	}

	return children;
}

export default ProtectedRoute;
