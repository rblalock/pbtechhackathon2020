const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: [
		'./pages/**/*.js',
		'./components/**/*.js',
	],
	theme: {
		extend: {
			fontFamily: {
				display: ['Inter var', ...defaultTheme.fontFamily.sans],
				body: ['Lato', ...defaultTheme.fontFamily.sans],
			},
			screens: {
				'xxl': '1500px',
			},
		},
	},
	variants: {},
	plugins: [
		require('@tailwindcss/typography'),
	],
};
