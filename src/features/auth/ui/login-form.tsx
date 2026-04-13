"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { LoginFormData, loginSchema } from "../model/validation";
import { login } from "../model/auth-slice";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux-hook";
import { InputForm } from "@/shared/ui/inputs/input-auth-form";
import { Status } from "@/shared/types/status";

import { Devider } from "@/shared/ui/devider";
import { ButtonDefault } from "@/shared/ui";

const LoginForm = () => {
  const { status, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const email = watch("email");
  const password = watch("password");
  const isFormValid = email && password;

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const res = await dispatch(login(data));
    if (res.meta.requestStatus === "fulfilled") {
      router.replace("/");
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
      <InputForm
        label="Password"
        type="password"
        placeholder=""
        register={register("password")}
        errorType="password"
        errors={errors}
        style="login"
      />
      <div className="flex w-full justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-text-secondary transition-colors duration-300 hover:text-white/90 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {error && (
        <p className="mt-2 text-sm font-medium text-red-400">{error}</p>
      )}

      <ButtonDefault
        styles="mt-5 w-full py-3"
        text="Login"
        type="submit"
        loading={status === Status.LOADING}
        onClick={handleSubmit(onSubmit)}
        disabled={!isFormValid}
      />

      <Devider />

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <span className="text-sm text-text-secondary">Need an account?</span>
        <Link
          href="/registration"
          className="text-sm font-medium text-accent-primary transition-colors duration-300 hover:text-accent-primary-hover hover:underline"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
