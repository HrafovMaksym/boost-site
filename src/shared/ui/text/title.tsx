import React from "react";

export const Title = ({
  title,
  styles,
}: {
  title: string;
  styles?: string;
}) => {
  return (
    <h1
      className={`${styles ? styles : "text-2xl"} font-bold text-text-primary tracking-tight`}
    >
      {title}
    </h1>
  );
};
