interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div
      className={`w-full max-w-[var(--container-max)] mx-auto px-4 md:px-6 ${className}`}
    >
      {children}
    </div>
  );
};
