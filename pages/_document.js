import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<meta httpEquiv="x-ua-compatible" content="ie=edge" />
					<meta property="og:site_name" content="PB Tech Hackathon 2020" />
					<meta property="og:type" content="website" />
					<meta name="theme-color" content="#000" />
					<link rel="shortcut icon" href="/favicon.png" />
					<script src="https://kit.fontawesome.com/177f8f663d.js" crossOrigin="anonymous"></script>
					<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css' rel='stylesheet' />
					<link
						rel="stylesheet"
						href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.css"
						type="text/css"
					/>
					<script crossOrigin="anonymous" src="https://unpkg.com/@daily-co/daily-js"></script>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument
