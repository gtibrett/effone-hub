/**
 * Tailwind v4 ships its own PostCSS plugin — no autoprefixer needed since
 * lightningcss handles vendor prefixing internally.
 */
export default {
	plugins: {
		'@tailwindcss/postcss': {}
	}
};
