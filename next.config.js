/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	i18n: process.env.NO_I18N === "1" ? undefined :
	{
		locales: ['en', 'es'],
		defaultLocale: 'en',
	},
	env: {
		NO_I18N: process.env.NO_I18N,
	}
};

module.exports = nextConfig;
