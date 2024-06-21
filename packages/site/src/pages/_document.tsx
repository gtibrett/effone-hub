import {documentGetInitialProps, DocumentHeadTags, DocumentHeadTagsProps} from '@mui/material-nextjs/v14-pagesRouter';
import {DocumentContext, Head, Html, Main, NextScript} from 'next/document';

Document.getInitialProps = async (ctx: DocumentContext) => {
	return await documentGetInitialProps(ctx);
};

export default function Document(props: DocumentHeadTagsProps) {
	return (
		<Html lang="en">
			<Head>
				{/*<title>effOne Hub</title>*/}
				{/*<meta charSet="utf-8"/>*/}
				{/*<meta name="viewport" content="width=device-width, initial-scale=1"/>*/}
				<link rel="icon" href="/effOne.svg"/>
				<DocumentHeadTags {...props} />
			</Head>
			<body>
				<Main/>
				<NextScript/>
			</body>
		</Html>
	);
}