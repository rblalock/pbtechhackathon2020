const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
	pwa: {
		dest: 'public'
	},
	env: {
		ROOMSERVICE: process.env.ROOMSERVICE,
		FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
		FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
		FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
		FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
		FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
		FIREBASE_MESSAGE_SENDER_ID: process.env.FIREBASE_MESSAGE_SENDER_ID,
		FIRSEBASE_APP_I: process.env.FIRSEBASE_APP_ID,
		MAPS_KEY: process.env.MAPS_KEY
	}
});
