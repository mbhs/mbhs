/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	i18n: process.env.I18N ? {
		locales: ['en', 'es'],
		defaultLocale: 'en',
	} : undefined,
};

module.exports = nextConfig;
