import FooterLink from "@/features/authentication/components/FooterLink";
import FormHeader from "@/features/authentication/components/FormHeader";
import SignInForm from "@/features/authentication/components/SignInForm";
import Layout from "@/features/authentication/layout/AuthLayout";

const SignInPage = () => {
  return (
    <Layout>
      <FormHeader title="Welcome back 👋" description="Continue to your Training App account" />
      <SignInForm onSubmit={() => { }} isLoading={false} error={undefined} />
      <FooterLink message="Don't have an account?" text="Sign up" href="/auth/signup" />
    </Layout>
  );
};

export default SignInPage;
