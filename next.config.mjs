/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /* Next defaults the optimizer to "attachment", which tells the
       browser to download rather than render. Browsers normally
       ignore that for <img>, but these images exist to be displayed
       inline, so say so rather than relying on that leniency. */
    contentDispositionType: "inline",
  },

  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
