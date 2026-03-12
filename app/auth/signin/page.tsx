"use client";

import FooterLink from "@/features/authentication/components/FooterLink";
import FormHeader from "@/features/authentication/components/FormHeader";
import SignInForm from "@/features/authentication/components/SignInForm";
import Layout from "@/features/authentication/layout/AuthLayout";
import { signin } from "@/lib/auth/signin";
import { useState } from "react";
import { useRouter } from 'next/navigation'

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
                onSubmit={async (formData) => {
                    setLoading(true);
                    const resp = await signin(formData);
                    setLoading(false);

                    if (resp.result) {
                        router.push("/")
                    }
                }}
                isLoading={loading}
                error={undefined}
            />
            <FooterLink message="Don't have an account?" text="Sign up" href="/auth/signup" />
        </Layout>
    );
}
