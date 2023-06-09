/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["images.unsplash.com"],
    },
    env: {
        FOURSQUARE_API_KEY: "fsq3q09yfqxEe4oI1zvJaHDmPUcuJCFqnWBZ4G4BghUIQEQ=",
        UNSPLASH_ACCESS_KEY: "ZiK2mkeM-tZVpicwA6m8PJoWfwyXaLz5IrB40UJ21eA",
        UNSPLASH_SECRET_KEY: "2Y7_13_wMfJffYU97AE23drRxrleGK_XVdxN2oPbFdE",
        AIRTABLE_SECRET_API_TOKEN: "key0fsMYD0igZRnk7",
        AIRTABLE_BASE_KEY: "appHqVfw8pyoUOn2E",
    },
}

module.exports = nextConfig
