import VerifyToken from "@/widgets/auth/verify-token";
import { Suspense } from "react";

const CallbackPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {" "}
      <VerifyToken />{" "}
    </Suspense>
  );
};

export default CallbackPage;
