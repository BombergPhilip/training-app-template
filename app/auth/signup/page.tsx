"use client";

import FooterLink from "@/features/authentication/components/FooterLink";
import FormHeader from "@/features/authentication/components/FormHeader";
import SignUpForm from "@/features/authentication/components/SignUpForm";
import Layout from "@/features/authentication/layout/AuthLayout";
// import { signup } from "@/lib/auth/signup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/app/api/auth/auth";

export default function SignUpPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    return (
        <Layout>
            <FormHeader title="Create an account" description="Create an account to get started" />
            <SignUpForm
                onSubmit={async ({ fullName, email, password }) => {
                    setLoading(true);
                    const resp = await signup(fullName, email, password);
                    setLoading(false);

                    if (resp.success) {
                        router.push("/");
                    }
                }}
                isLoading={loading}
                error={undefined}
            />
            <FooterLink message="Already have an account?" text="Sign in" href="/auth/signin" />
        </Layout>
    );
}
