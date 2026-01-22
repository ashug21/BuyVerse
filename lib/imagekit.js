import ImageKit from "imagekit-javascript";

const ik = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  authenticationEndpoint: "/api/imagekit-auth",
});

export default ik;
