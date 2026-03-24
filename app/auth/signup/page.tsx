"use client";

import FooterLink from "@/app/auth/components/FooterLink";
import FormHeader from "@/app/auth/components/FormHeader";
import SignUpForm from "@/app/auth/components/SignUpForm";
import Layout from "@/app/auth/layout/AuthLayout";
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
