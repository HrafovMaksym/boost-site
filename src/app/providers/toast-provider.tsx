"use client";
import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--bg-card)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-md)",
          padding: "14px 20px",
          fontSize: "14px",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(124, 58, 237, 0.1)",
          backdropFilter: "blur(12px)",
        },
        success: {
          iconTheme: {
            primary: "#10b981",
            secondary: "var(--bg-card)",
          },
          style: {
            borderColor: "rgba(16, 185, 129, 0.3)",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "var(--bg-card)",
          },
          style: {
            borderColor: "rgba(239, 68, 68, 0.3)",
          },
        },
      }}
    />
  );
}
