module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost", 
        port: '8081', 
        https: false,   //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: null,
    },
	devServer: {
	    open: true, //是否自动弹出浏览器页面
	    host: "localhost", 
	    port: '8200',
	    https: false,
	    hotOnly: true, 
	    proxy: {
	        // '/api': {
	        //     target: 'http://192.168.0.100:8200/', //API服务器的地址
	        //     changeOrigin: true,
	        //     pathRewrite: {
	        //         '^/api': ''
	        //     }
	        // }
	        '/user': {
	            target: 'http://111.231.241.166:8888/', //API服务器的地址
	            changeOrigin: true,
	            pathRewrite: {
	                '^/user': '/user'
	            }
	        }
	    },
	}
}