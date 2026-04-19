"use client";
import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";

import { motion } from "framer-motion";
import { MailCheck, ArrowRight } from "lucide-react";
import { RegistrationFormData, registrationSchema } from "../model/validation";
import { registration } from "../model/auth-slice";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hook";
import { InputForm } from "@/shared/ui/inputs/input-auth-form";

import Link from "next/link";
import { Status } from "@/shared/types/status";

import { zodResolver } from "@hookform/resolvers/zod";
import { Devider } from "@/shared/ui/devider";
import { ButtonDefault } from "@/shared/ui";

const RegistrationForm = () => {
  const { status, error } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const [emailSent, setEmailSent] = useState(false);

  const isFormValid = !!(email && password && confirmPassword);

  const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
    const res = await dispatch(registration({ ...data }));

    if (res.meta.requestStatus === "fulfilled") {
      setEmailSent(true);
    }
  };
  if (emailSent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="mt-8 flex w-full flex-col items-center justify-center rounded-[var(--radius-lg)] border border-border bg-bg-card/40 p-10 text-center backdrop-blur-xl shadow-2xl"
      >
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary ring-8 ring-accent-primary/5">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 400,
              damping: 15,
            }}
          >
            <MailCheck size={48} />
          </motion.div>
        </div>
        <h3 className="mb-3 text-2xl font-bold tracking-tight text-text-primary">
          Registration Successful!
        </h3>
        <p className="max-w-xs text-text-secondary leading-relaxed">
          We&apos;ve sent a verification link to your email. Please check your
          inbox to activate your account.
        </p>
        <Link
          href="/login"
          className="group mt-10 flex items-center gap-3 rounded-full bg-accent-primary px-8 py-3 text-sm font-bold text-white transition-all hover:bg-accent-primary-hover hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] active:scale-95"
        >
          Back to Login
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    );
  }
  return (
    <form className="w-full mt-4" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        label={"Email"}
        type="email"
        placeholder={""}
        register={register("email")}
        errorType="email"
        errors={errors}
        style="registration"
      />
      <InputForm
        label={"Password"}
        type="password"
        placeholder={""}
        register={register("password")}
        errorType="password"
        errors={errors}
        style="registration"
      />
      <InputForm
        label={"Confirm Password"}
        type="password"
        placeholder={""}
        register={register("confirmPassword")}
        errorType="confirmPassword"
        errors={errors}
        style="registration"
      />

      {error && (
        <p className="mt-2 text-[14px] font-medium text-red-500">{error}</p>
      )}

      <ButtonDefault
        styles="mt-4 w-full p-3"
        text={"Create Account"}
        type="submit"
        loading={status === Status.LOADING}
        onClick={handleSubmit(onSubmit)}
        disabled={!isFormValid}
      />

      <Devider />

      <div className="mt-4 flex flex-wrap items-center justify-center gap-[6px]">
        <span className="text-[15px] text-[var(--color-text-secondary)] opacity-80">
          Already have an account?
        </span>
        <Link
          href="/login"
          className="text-sm font-medium text-accent-primary transition-colors duration-300 hover:text-accent-primary-hover hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
