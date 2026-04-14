import ResetPassword from "@/widgets/auth/reset-password";
import { Loading } from "@/shared/ui";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<Loading className="py-20" />}>
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPasswordPage;
