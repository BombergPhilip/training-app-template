interface EmailTemplateProps {
    firstname: string;
    otp: string;
}

export function EmailTemplate({ firstname, otp }: EmailTemplateProps) {
    return (
        <div>
            <h1>Welcome, {firstname}!</h1>
            <p>Your one time password: {otp}</p>
        </div>
    );
}
