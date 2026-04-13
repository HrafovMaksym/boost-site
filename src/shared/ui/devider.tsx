import React from "react";

export const Devider = () => {
  return (
    <div className="flex items-center w-full my-5">
      <div className="h-px flex-1 bg-border" />
      <span className="px-4 text-sm text-text-muted">OR</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
};
