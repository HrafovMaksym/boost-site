"use client";

import ResetPasswordForm from "@/features/auth/ui/reset-form";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/shared/hooks/redux-hook";
import { LoaderCircle } from "lucide-react";
import { verifyToken } from "@/features/auth/model/auth-slice";
import { Description, Title } from "@/shared/ui";

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenParams = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!tokenParams) {
      router.replace("/login");
      return;
    }

    const verify = async () => {
      try {
        const res = await dispatch(
          verifyToken({ token: tokenParams }),
        ).unwrap();

        if (!res.valid) {
          throw new Error();
        }
      } catch {
        router.replace("/error");
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, [dispatch, router, tokenParams]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LoaderCircle size={40} className="animate-spin text-accent-primary" />
      </div>
    );
  }

  return (
    <div
      className="rounded-[var(--radius-lg)]   p-10 bg-bg-card/60
backdrop-blur-xl
border border-border/40
shadow-[0_20px_80px_-30px_rgba(124,58,237,0.35)]"
    >
      <div className="text-center mb-3">
        <Title
          styles="text-3xl font-semibold tracking-tight"
          title="Create a New Password"
        />
        <Description
          styles="text-base text-text-secondary leading-relaxed"
          description="Your new password must be secure and easy to remember."
        />
      </div>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;
