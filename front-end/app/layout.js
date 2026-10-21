"use client";

import { Roboto } from "next/font/google";
import { useState } from "react";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { CartContext } from "./_context/CartContext";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700", "900"],
    variable: "--font-roboto",
});

export default function RootLayout({ children }) {
    const [cart, setCart] = useState([]);
    const [isCartLoading, setIsCartLoading] = useState(true);
    const [cartError, setCartError] = useState("");

    return (
        <html lang="en" data-scroll-behavior="smooth">
            <body className={`${roboto.className} ${roboto.variable}`}>
                <ClerkProvider>
                    <CartContext.Provider
                        value={{
                            cart,
                            setCart,
                            isCartLoading,
                            setIsCartLoading,
                            cartError,
                            setCartError,
                        }}
                    >
                        <Header />
                        {children}
                        <Footer />
                    </CartContext.Provider>
                </ClerkProvider>
            </body>
        </html>
    );
}
