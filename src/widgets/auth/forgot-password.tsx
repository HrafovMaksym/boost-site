import ForgotPasswordForm from "@/features/auth/ui/forgot-form";
import { Description, Title } from "@/shared/ui";

const ForgotPassword = () => {
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
          title="Reset Your Password"
        />
        <Description
          styles="text-base text-text-secondary leading-relaxed"
          description="Please provide the email address associated with your account. You'll receive a link to create a new password."
        />
      </div>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
