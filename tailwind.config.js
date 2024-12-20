export default {
	content: ["./index.html", "./src/**/*.{jsx,js,ts,tsx}"],
	theme: {
		extend: {
			minHeight: {
				"screen-navbar": "calc(100vh - 60px)", // 減去 NavBar 的高度
			},
		},
	},
	plugins: [],
};
