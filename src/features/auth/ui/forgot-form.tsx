"use client";
import React, { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Link from "next/link";

import { InputForm } from "@/shared/ui/inputs/input-auth-form";

import { useAppDispatch } from "@/shared/hooks/redux-hook";
import { ForgotPassData, forgotPassSchema } from "../model/validation";
import { forgotPassword } from "../model/auth-slice";
import { ButtonDefault } from "@/shared/ui";

const ForgotPasswordForm = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgotPassData>({
    resolver: zodResolver(forgotPassSchema),
  });

  const email = watch("email");
  const isFormValid = !!email;

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<ForgotPassData> = async (data) => {
    try {
      setIsLoading(true);
      const result = await dispatch(forgotPassword(data));

      if (result.meta.requestStatus === "fulfilled") {
        toast.success("The password reset link was sent to your email");
      } else {
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
        label="Email"
        type="email"
        placeholder=""
        register={register("email")}
        errorType="email"
        errors={errors}
        style="login"
      />

      {error && (
        <p className="mt-2 text-sm font-medium text-red-400">{error}</p>
      )}

      <ButtonDefault
        styles="mt-5 w-full py-3"
        text="Send Reset Link"
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

export default ForgotPasswordForm;
