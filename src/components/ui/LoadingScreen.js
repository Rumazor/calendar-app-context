import React from "react";
import { Ring } from "@uiball/loaders";

export const LoadingScreen = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-slate-800">
      <Ring size={70} lineWeight={5} speed={1.5} color="white" />;
    </div>
  );
};
