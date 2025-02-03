import React from "react";
import "./ErrorPage.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ErrorPage = () => {
  return (
    <div className="shadow-2xl lg:w-2/3 h-2/3 sm:w-3/4 flex justify-center rounded-lg bg-transparent mb-9">
      <div className="w-full inset-shadow-sm">
        <DotLottieReact
          src="https://lottie.host/8d0f31da-83d3-4d76-bdef-938f5fd97b81/4LTw92Jkxh.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default ErrorPage;

