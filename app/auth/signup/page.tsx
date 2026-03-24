"use client";

import FooterLink from "@/app/auth/components/FooterLink";
import FormHeader from "@/app/auth/components/FormHeader";
import SignUpForm from "@/app/auth/components/SignUpForm";
import Layout from "@/app/auth/layout/AuthLayout";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/app/api/auth/auth";
import { OTPForm } from "./components/dialog";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");

  const [cache_fullname, setCF] = useState("");
  const [cache_email, setCE] = useState("");
  const [cache_password, setCP] = useState("");

  useEffect(() => {
    const f = async () => {
      if (otp.length != 6) return;

      const resp = await signup(
        cache_fullname,
        cache_email,
        cache_password,
        otp,
      );

      if (resp.success) {
        router.push("/");
      }
    };

    f();
  }, [otp]);

  return (
    <Layout>
      <OTPForm
        showOTP={showOTP}
        setShowOTP={setShowOTP}
        otp={otp}
        setOTP={setOTP}
      />
      <FormHeader
        title="Create an account"
        description="Create an account to get started"
      />
      <SignUpForm
        onSubmit={async ({ fullName, email, password }) => {
          setCF(fullName);
          setCE(email);
          setCP(password); // cacher input, så det er klar, parat til start til når OTP ankommer
          setLoading(true);
          const resp = await signup(fullName, email, password);
          setLoading(false);

          if (!resp.success) {
            // handle error
            return;
          }

          if (resp.otp) {
            setShowOTP(true);

            return;
          }

          router.push("/");
        }}
        isLoading={loading}
        error={undefined}
      />
      <FooterLink
        message="Already have an account?"
        text="Sign in"
        href="/auth/signin"
      />
    </Layout>
  );
}
