"use client";
import { LoginForm } from "@/components/modules/auth/login/LoginForm";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="min-h-[80vh] flex items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>{" "}
      </div>
    </div>
  );
};

export default LoginPage;
