"use client";

import { Toaster } from "react-hot-toast";

const ToasterClient = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#111",
          color: "#fff",
        },
      }}
    />
  );
};

export default ToasterClient;
