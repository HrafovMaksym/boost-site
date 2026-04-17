"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import toast from "react-hot-toast";
import { AlertCircle } from "lucide-react";

import { InputForm } from "@/shared/ui/inputs/input-auth-form";
import { SelectForm } from "@/shared/ui/inputs/select-form";
import { ButtonDefault } from "@/shared/ui";
import { ContactFormData, contactSchema } from "../model/validation";
import { SUBJECT_OPTIONS } from "../model/consts";
import { sendContactEmail } from "../model/actions";

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setIsLoading(true);
    try {
      const result = await sendContactEmail(data);
      if (result.success) {
        toast.success("Message sent successfully!");
        reset();
      } else {
        toast.error(result.error || "Failed to send message");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full mt-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
        <InputForm
          label="Your Name"
          type="text"
          placeholder="Enter your name"
          register={register("name")}
          errorType="name"
          errors={errors}
          style="login"
        />
        <InputForm
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          register={register("email")}
          errorType="email"
          errors={errors}
          style="login"
        />
      </div>

      <SelectForm
        label="Subject"
        options={SUBJECT_OPTIONS}
        register={register("subject")}
        errorType="subject"
        errors={errors}
      />

      <div className="relative w-full mb-8">
        <label className="block text-sm font-semibold mb-2 ml-1 text-text-secondary">
          Message
        </label>
        <textarea
          {...register("message")}
          placeholder="How can we help you?"
          rows={5}
          className="
            w-full rounded-[var(--radius-md)] border
            bg-bg-card/40 backdrop-blur-md
            px-4 py-4 text-base text-text-primary outline-none
            placeholder:text-text-muted caret-accent-primary
            transition-all duration-300 hover:border-border-hover resize-none
            border-border/60 focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20
          "
        />
        {errors.message && (
          <p className="mt-1.5 flex items-center gap-1.5 pl-1 text-xs text-red-400">
            <AlertCircle size={12} />
            {errors.message.message}
          </p>
        )}
      </div>

      <ButtonDefault
        styles="w-full py-4 text-lg font-bold"
        text="Send Message"
        type="submit"
        loading={isLoading}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </form>
  );
}
