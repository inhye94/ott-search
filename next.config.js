module.exports = {
  async redirects() {
    return [
      {
        source: "/foo/:path*",
        destination: "/bar/:path*",
        permanent: false,
      },
    ];
  },
};
