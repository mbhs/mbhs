/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	i18n: process.env.NO_I18N ? undefined :
	{
		locales: ['en', 'es'],
		defaultLocale: 'en',
	},
};

module.exports = nextConfig;
