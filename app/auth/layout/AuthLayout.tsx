const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-7 flex items-center justify-center gap-4">
                    <div className="h-px w-24 bg-linear-to-r from-transparent via-gray-300 to-transparent" />
                    <img
                        src="/logo.svg"
                        alt="Training App logo"
                        className="h-16 w-16 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm"
                    />
                    <div className="h-px w-24 bg-linear-to-r from-transparent via-gray-300 to-transparent" />
                </div>
                <div className="w-full flex flex-col gap-7">{children}</div>
            </div>
        </main>
    );
};

export default AuthLayout;
