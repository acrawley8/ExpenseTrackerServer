if(process.env.NODE_ENV) {
	module.exports = {
		mongoURI: process.env.mongoURI,
		NODE_ENV: process.env.NODE_ENV
	}
} else {
	module.exports = {
		NODE_ENV: "dev",
		mongoURI: "mongodb://expense:passw0rd@192.168.0.20:30017/expense?retryWrites=true"
	}
}