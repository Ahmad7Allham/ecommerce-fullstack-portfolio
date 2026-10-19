import Image from "next/image";
import Link from "next/link";

const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/#products", label: "Explore products" },
    { href: "/cart", label: "Your cart" },
    { href: "/sign-in", label: "Sign in" },
];

function Footer() {
    return (
        <footer className="mt-20 border-t border-gray-200 bg-slate-950 text-gray-300">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
                <div className="scroll-mt-24 sm:col-span-2 lg:col-span-2" id="about">
                    <Link href="/" className="inline-flex items-center gap-3" aria-label=" E-commerce home">
                        <Image src="/logo.svg" alt=" E-commerce logo" width={49} height={48} className="h-10 w-auto" />
                        <span className="text-lg font-bold text-white"> E-commerce</span>
                    </Link>
                    <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
                        A digital storefront for useful learning resources, creative assets, and technology bundles. Browse the collection and receive your purchase details by email.
                    </p>
                </div>

                <nav aria-label="Footer navigation">
                    <h2 className="font-semibold text-white">Explore</h2>
                    <ul className="mt-4 space-y-3 text-sm">
                        {footerLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className="transition hover:text-primary">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div id="contact" className="scroll-mt-24">
                    <h2 className="font-semibold text-white">Need help?</h2>
                    <p className="mt-4 text-sm leading-7 text-gray-400">
                        Purchase details are sent to the email address provided during checkout. Check your inbox and spam folder if you cannot find the message.
                    </p>
                    <Link href="/sign-in" className="mt-3 inline-flex text-sm font-semibold text-teal-300 transition hover:text-white">
                        Access your account
                    </Link>
                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p>© {new Date().getFullYear()}  E-commerce. All rights reserved.</p>
                    <p>Digital products · Secure checkout · Email delivery</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
