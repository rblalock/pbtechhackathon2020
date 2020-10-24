const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
	pwa: {
		dest: 'public'
	},
	env: {
		ROOMSERVICE: process.env.ROOMSERVICE,
	}
});
