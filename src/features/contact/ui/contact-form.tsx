"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";

import { InputForm } from "@/shared/ui/inputs/input-auth-form";
import { SelectForm } from "@/shared/ui/inputs/select-form";
import { ButtonDefault } from "@/shared/ui";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const SUBJECT_OPTIONS = [
  { value: "order", label: "Order Issue" },
  { value: "payment", label: "Payment" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const name = watch("name");
  const email = watch("email");
  const subject = watch("subject");
  const message = watch("message");
  const isFormValid = !!(name && email && subject && message);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    try {
      setIsLoading(true);
      // TODO: send to API
      console.log(data);
      toast.success("Message sent successfully!");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full mt-6" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        label="Your Name"
        type="text"
        placeholder=""
        register={register("name")}
        errorType="name"
        errors={errors}
        style="login"
      />
      <InputForm
        label="Email Address"
        type="email"
        placeholder=""
        register={register("email")}
        errorType="email"
        errors={errors}
        style="login"
      />
      <SelectForm
        label="Subject"
        options={SUBJECT_OPTIONS}
        register={register("subject")}
        errorType="subject"
        errors={errors}
      />
      <div className="relative w-full mb-6">
        <textarea
          {...register("message")}
          placeholder="Your message..."
          rows={4}
          className="
            w-full rounded-[var(--radius-md)] border
            bg-bg-card/60 backdrop-blur-sm
            px-4 py-4 text-base text-text-primary outline-none
            placeholder:text-text-muted caret-accent-primary
            transition-[border-color,box-shadow] duration-300 hover:border-border-hover resize-none
            border-border focus:border-accent-primary/70 focus:ring-2 focus:ring-accent-primary/20
          "
        />
        {errors.message && (
          <p className="mt-1.5 flex items-center gap-1.5 pl-1 text-xs text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      <ButtonDefault
        styles="w-full py-3"
        text="Send Message"
        type="submit"
        loading={isLoading}
        onClick={handleSubmit(onSubmit)}
        disabled={!isFormValid}
      />
    </form>
  );
}
