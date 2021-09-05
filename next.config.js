// eslint-disable-next-line
module.exports = {
  images: {
    domains: ["i.scdn.co"],
  },
  webpack5: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
};
