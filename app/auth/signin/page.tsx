"use client";

import FooterLink from "@/features/authentication/components/FooterLink";
import FormHeader from "@/features/authentication/components/FormHeader";
import SignInForm from "@/features/authentication/components/SignInForm";
import Layout from "@/features/authentication/layout/AuthLayout";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { signin } from "@/app/api/auth/auth";

export default function SignInPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);


    return (
        <Layout>
            <FormHeader
                title="Welcome back 👋"
                description="Continue to your Training App account"
            />
            <SignInForm
                onSubmit={async ({ email, password }) => {
                    setLoading(true);
                    const resp = await signin(email, password);
                    setLoading(false);

                    if (resp.success) {
                        router.push("/")
                        return;
                    }

                    console.log("error:", resp.error);
                }}
                isLoading={loading}
                error={undefined}
            />
            <FooterLink message="Don't have an account?" text="Sign up" href="/auth/signup" />
        </Layout>
    );
}
