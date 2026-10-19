"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import { Menu, ShoppingCart, X } from "lucide-react";
import { CartContext } from "../_context/CartContext";
import Cart from "../_components/Cart";
import CartApis from "../_utils/CartApis";

const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/#products", label: "Explore" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Support" },
];

function Header() {
    const pathname = usePathname();
    const { isLoaded, user } = useUser();
    const {
        cart,
        setCart,
        isCartLoading,
        setIsCartLoading,
        cartError,
        setCartError,
    } = useContext(CartContext);

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const cartAreaRef = useRef(null);
    const isAuthPage =
        pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");

    useEffect(() => {
        if (!isLoaded) return;

        if (!user) {
            setCart([]);
            setCartError("");
            setIsCartLoading(false);
            return;
        }

        const email = user.primaryEmailAddress?.emailAddress;
        if (!email) {
            setCart([]);
            setCartError("We could not identify the email for this account.");
            setIsCartLoading(false);
            return;
        }

        let cancelled = false;
        setIsCartLoading(true);
        setCartError("");

        CartApis.getUserCartItems(email)
            .then((res) => {
                if (cancelled) return;

                const responseItems = Array.isArray(res?.data?.data)
                    ? res.data.data
                    : [];

                setCart(
                    responseItems.map((cartItem) => ({
                        id: cartItem.documentId,
                        product: cartItem.products?.[0],
                    })),
                );
            })
            .catch((error) => {
                if (cancelled) return;

                setCart([]);
                setCartError("We could not load your cart. Please refresh and try again.");
                console.error("Could not load cart:", {
                    status: error?.response?.status,
                    data: error?.response?.data,
                    message: error?.message,
                });
            })
            .finally(() => {
                if (!cancelled) setIsCartLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [isLoaded, user, setCart, setIsCartLoading, setCartError]);

    useEffect(() => {
        if (!isCartOpen) return;

        const handleOutsideClick = (event) => {
            if (
                cartAreaRef.current &&
                !cartAreaRef.current.contains(event.target)
            ) {
                setIsCartOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") setIsCartOpen(false);
        };

        document.addEventListener("pointerdown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("pointerdown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isCartOpen]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsCartOpen(false);
    }, [pathname]);

    if (isAuthPage) return null;

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-5 px-4 sm:px-6 lg:px-8">
                <Link href="/" aria-label=" E-commerce home" className="flex shrink-0 items-center gap-2">
                    <Image
                        src="/logo.svg"
                        alt=" E-commerce logo"
                        width={49}
                        height={48}
                        className="h-9 w-auto"
                        priority
                    />
                    <span className="hidden text-sm font-bold tracking-tight text-gray-900 sm:inline">
                        E-commerce
                    </span>
                </Link>

                <nav aria-label="Main navigation" className="hidden flex-1 md:block">
                    <ul className="flex items-center justify-center gap-6 text-sm font-medium">
                        {navigationItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className="text-gray-600 transition-colors hover:text-primary"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
                    {isLoaded && user ? (
                        <>
                            <div ref={cartAreaRef} className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsCartOpen((open) => !open)}
                                    aria-label={`Open shopping cart, ${cart?.length || 0} items`}
                                    aria-expanded={isCartOpen}
                                    className="relative inline-flex h-10 items-center gap-2 rounded-lg px-2 text-gray-700 transition hover:bg-gray-100 hover:text-primary"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    <span className="text-sm font-semibold tabular-nums">
                                        {cart?.length || 0}
                                    </span>
                                </button>

                                {isCartOpen && (
                                    <Cart
                                        isLoading={isCartLoading}
                                        error={cartError}
                                        onClose={() => setIsCartOpen(false)}
                                    />
                                )}
                            </div>
                            <UserButton />
                        </>
                    ) : isLoaded ? (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/sign-in"
                                className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="/sign-up"
                                className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 sm:px-4"
                            >
                                Create account
                            </Link>
                        </div>
                    ) : (
                        <div aria-hidden="true" className="h-9 w-24 animate-pulse rounded-lg bg-gray-100" />
                    )}

                    <button
                        type="button"
                        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen((open) => !open)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-50 md:hidden"
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <nav aria-label="Mobile navigation" className="border-t border-gray-200 bg-white px-4 py-3 md:hidden">
                    <ul className="mx-auto flex max-w-screen-xl flex-col gap-1">
                        {navigationItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    onClick={closeMobileMenu}
                                    className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-primary"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        {isLoaded && !user && (
                            <li>
                                <Link
                                    href="/sign-in"
                                    onClick={closeMobileMenu}
                                    className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-primary"
                                >
                                    Sign in
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            )}
        </header>
    );
}

export default Header;
