import FooterLink from "@/features/authentication/components/FooterLink";
import FormHeader from "@/features/authentication/components/FormHeader";
import SignUpForm from "@/features/authentication/components/SignUpForm";
import Layout from "@/features/authentication/layout/AuthLayout";

const SignUpPage = () => {
    return (
        <Layout>
            <FormHeader title="Create an account" description="Create an account to get started" />
            <SignUpForm onSubmit={() => { }} isLoading={false} error={undefined} />
            <FooterLink message="Already have an account?" text="Sign in" href="/" />
        </Layout>
    );
};

export default SignUpPage;