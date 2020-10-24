import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8" />
					<meta httpEquiv="x-ua-compatible" content="ie=edge" />
					<title>PB Tech Hackathon 2020</title>
					<meta property="og:site_name" content="PB Tech Hackathon 2020" />
					<meta property="og:type" content="website" />
					<meta name="theme-color" content="#000" />
					<link rel="shortcut icon" href="/favicon.png" />
					<script src="https://kit.fontawesome.com/177f8f663d.js" crossOrigin="anonymous"></script>
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
