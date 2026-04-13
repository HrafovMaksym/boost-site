import React from "react";

export const Description = ({
  description,
  styles,
}: {
  description: string;
  styles?: string;
}) => {
  return (
    <p
      className={`${styles ? styles : "text-base"} text-text-secondary leading-relaxed`}
    >
      {description}
    </p>
  );
};
