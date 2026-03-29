"use client";

import FooterLink from "@/app/(auth)/auth/components/FooterLink";
import FormHeader from "@/app/(auth)/auth/components/FormHeader";
import SignInForm from "@/app/(auth)/auth/components/SignInForm";
import Layout from "@/app/(auth)/auth/layout/AuthLayout";
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
