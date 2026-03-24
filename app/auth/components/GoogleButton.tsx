import { Button } from "@/components/ui/button";

interface GoogleButtonProps {
    onGoogleSignIn: () => void;
    label?: string;
}

const GoogleButton = ({ onGoogleSignIn, label = "Continue with Google" }: GoogleButtonProps) => {
    return (
        <Button
            variant="outline"
            size="lg"
            weight="medium"
            className="h-10 w-full border-gray-200 text-sm text-gray-700"
            onClick={onGoogleSignIn}
        >
            <img src="/google.svg" alt="Google Logo" width={16} height={16} />
            {label}
        </Button>
    );
};

export default GoogleButton;
