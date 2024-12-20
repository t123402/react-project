import React, { useState, useEffect } from "react";

function CounterPage() {
	useEffect(() => {
		document.title = "首頁"; // 更改標題
	}, []);

	const [count, setCount] = useState(0);
	const [warning, setWarning] = useState("");

	const addClick = () => {
		const randomValue = Math.floor(Math.random() * (10 - count)) + 1;
		if (count < 10) {
			setCount(count + randomValue);
			setWarning("");
		} else {
			setWarning("計數已達最大值！");
		}
	};

	const minusClick = () => {
		const randomValue = Math.floor(Math.random() * count) + 1;
		if (count > 0) {
			setCount(count - randomValue);
			setWarning("");
		} else {
			setWarning("計數已達最小值！");
		}
	};

	const resetClick = () => {
		setCount(0);
		setWarning("");
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen-navbar bg-gradient-to-b from-blue-200 to-blue-500">
			<h1 className="text-3xl font-bold text-white mb-6">計數器頁面</h1>
			<p className="text-xl font-semibold mb-4">當前計數：{count}</p>
			<div className="space-x-4">
				<button
					onClick={addClick}
					className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow"
				>
					點我增加
				</button>
				<button
					onClick={minusClick}
					className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow"
				>
					點我減少
				</button>
				<button
					onClick={resetClick}
					className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded shadow"
				>
					重置
				</button>
			</div>
			{warning && <p className="text-red-600 mt-4">{warning}</p>}
		</div>
	);
}

export default CounterPage;
