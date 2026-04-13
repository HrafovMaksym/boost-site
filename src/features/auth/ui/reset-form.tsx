"use client";
import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputForm } from "@/shared/ui/inputs/input-auth-form";

import { useAppDispatch } from "@/shared/hooks/redux-hook";
import { RecoverPassData, recoverPassSchema } from "../model/validation";
import { resetPassword } from "../model/auth-slice";
import { ButtonDefault } from "@/shared/ui";

const ResetPasswordForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenParams = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RecoverPassData>({
    resolver: zodResolver(recoverPassSchema),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const isFormValid = !!password && !!confirmPassword;

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<RecoverPassData> = async (data) => {
    try {
      setIsLoading(true);

      const token = String(tokenParams);
      const result = await dispatch(resetPassword({ ...data, token }));
      if (result.meta.requestStatus === "fulfilled") {
        router.push("/login");
        toast.success("Password has been reset successfully!");
      } else {
        router.push("/login");
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err: unknown) {
      const error = err as string;
      setError(error || "Something went wrong. Try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full mt-6" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        label="New Password"
        type="password"
        placeholder=""
        register={register("password")}
        errorType="password"
        errors={errors}
        style="login"
      />
      <InputForm
        label="Confirm Password"
        type="password"
        placeholder=""
        register={register("confirmPassword")}
        errorType="confirmPassword"
        errors={errors}
        style="login"
      />

      {error && (
        <p className="mt-2 text-sm font-medium text-red-400">{error}</p>
      )}

      <ButtonDefault
        styles="mt-5 w-full py-3"
        text="Reset Password"
        type="submit"
        loading={isLoading}
        onClick={handleSubmit(onSubmit)}
        disabled={!isFormValid}
      />

      <div className="mt-5 flex flex-wrap items-center justify-center">
        <Link
          href="/login"
          className="text-sm font-medium text-accent-primary transition-colors duration-300 hover:text-accent-primary-hover hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
