"use client";

import { ImageKitProvider } from "@imagekit/next";

export default function ImageKitClientProvider({ children }) {
  return (
    <ImageKitProvider
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
    >
      {children}
    </ImageKitProvider>
  );
}
 