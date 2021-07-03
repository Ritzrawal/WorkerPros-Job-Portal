const baseConfig = {
	secretKey: process.env.REACT_APP_SECRET_KEY,
}

//

const dev = {
	baseUrl: process.env.REACT_APP_DEV_BASE_URL,
	socketUrl: 'localhost:5002',
	basePath: '',
	sockPath: '',
	facebookId: process.env.REACT_APP_DEV_FB_ID,
}

const stage = {
	baseUrl: process.env.REACT_APP_STAGE_BASE_URL,
	socketUrl: process.env.REACT_APP_STAGE_BASE_URL,
	basePath: '/stage/api',
	sockPath: process.env.REACT_APP_STAGE_SOCKET_PATH,
	facebookId: process.env.REACT_APP_STAGE_FB_ID,
}

const prod = {
	baseUrl: process.env.REACT_APP_PROD_BASE_URL,
	socketUrl: process.env.REACT_APP_PROD_BASE_URL,
	basePath: '/live/api',
	sockPath: process.env.REACT_APP_PROD_SOCKET_PATH,
	facebookId: process.env.REACT_APP_PROD_FB_ID,
}

function getConfig(env) {
	switch (env) {
		case 'development':
			return dev
		case 'stage':
			return stage
		case 'production':
			return prod

		default:
			return dev
	}
}

const config = getConfig(process.env.REACT_APP_ENV)

export default { ...baseConfig, ...config }
