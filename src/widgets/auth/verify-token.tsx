"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hook";
import { verifyRegistration } from "@/features/auth/model/auth-slice";
import { Status } from "@/shared/types/status";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

const VerifyToken = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.auth);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Checking verification link...",
    "Validating secure session...",
    "Finalizing your activation...",
    "Verifying your account...",
  ];

  useEffect(() => {
    if (status === Status.LOADING) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 1800);
      return () => clearInterval(interval);
    }
  }, [status, loadingMessages.length]);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      dispatch(verifyRegistration({ token }));
    } else {
      router.replace("/error");
    }
  }, [dispatch, searchParams, router]);

  useEffect(() => {
    if (status === Status.FAILED) {
      router.replace("/error");
    }
  }, [status, router]);

  const handleContinue = () => {
    setIsRedirecting(true);
    router.push("/");
  };

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {status === Status.LOADING && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center space-y-8 text-center"
          >
            <div className="relative">
              <motion.div
                className="h-24 w-24 rounded-full border-4 border-accent-primary/10"
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Loader2 className="absolute inset-0 h-24 w-24 animate-spin text-accent-primary" />
            </div>

            <div className="h-20 flex flex-col items-center justify-center space-y-3">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={loadingStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-2xl font-bold text-text-primary tracking-tight"
                >
                  {loadingMessages[loadingStep]}
                </motion.h2>
              </AnimatePresence>
              <motion.div className="h-1.5 w-64 overflow-hidden rounded-full bg-border">
                <motion.div
                  className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8, ease: "linear" }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {status === Status.SUCCEEDED && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-md overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg-card/80 backdrop-blur-sm p-8 text-center shadow-[var(--shadow-card)]"
          >
            <div className="mb-6 flex justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-8 ring-emerald-500/5"
              >
                <CheckCircle2 size={40} />
              </motion.div>
            </div>

            <h2 className="mb-2 text-2xl font-bold tracking-tight text-text-primary">
              Verification Successful!
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-text-secondary">
              Your account has been successfully verified. You can now log in to
              your account.
            </p>

            <motion.button
              onClick={handleContinue}
              disabled={isRedirecting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`
                group relative flex w-full items-center justify-center gap-2 overflow-hidden
                rounded-[var(--radius-md)] py-3.5 text-sm font-bold text-text-primary transition-all duration-300
                ${
                  isRedirecting
                    ? "cursor-not-allowed bg-bg-elevated opacity-50"
                    : "cursor-pointer bg-accent-primary hover:bg-accent-primary-hover shadow-[var(--shadow-glow)] hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]"
                }
              `}
            >
              <span className="relative z-10">
                {isRedirecting ? "Redirecting..." : "Continue to Login"}
              </span>
              {!isRedirecting && (
                <ArrowRight
                  size={18}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
              {isRedirecting && (
                <Loader2 className="relative z-10 h-5 w-5 animate-spin" />
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VerifyToken;
