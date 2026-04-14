import VerifyToken from "@/widgets/auth/verify-token";
import { Loading } from "@/shared/ui";
import { Suspense } from "react";

const CallbackPage = () => {
  return (
    <Suspense fallback={<Loading className="py-20" />}>
      <VerifyToken />
    </Suspense>
  );
};

export default CallbackPage;
