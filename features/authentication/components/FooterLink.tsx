"use client";

import Link from "next/link";

interface FooterLinkProps {
    message: string;
    text: string;
    href: string;
}

const FooterLink = ({ message, text, href }: FooterLinkProps) => {
    return (
        <div className="pt-1 text-center">
            <span className="text-sm text-gray-500">{message} </span>
            <Link
                href={href}
                className="text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
            >
                {text}
            </Link>
        </div>
    );
};

export default FooterLink;
