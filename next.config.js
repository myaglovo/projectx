/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  onDemandEntries: {
    // Разрешить кэширование только для прокси-сервера
    cache: "memory",
    // Указать время жизни кэша в миллисекундах (0 - выключить кэширование)
    maxInactiveAge: 0,
  },
  distribution: "local",
  env: {
    HOST: "server210.hosting.reg.ru",
    USER: "u2015014_admin",
    PASSWORD: "oE8iU2uN4rqX6rB2",
    DATABASE: "u2015014_projectx",
    NEXTAUTH_SECRET: "Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=",
    NEXTAUTH_URL: "https://projectx-orpin.vercel.app/",
    // NEXTAUTH_URL: "http://localhost:3000",
    NEXT_PUBLIC_URL: "https://projectx-orpin.vercel.app/",
    // NEXT_PUBLIC_URL: "http://localhost:3000",
  },
};
