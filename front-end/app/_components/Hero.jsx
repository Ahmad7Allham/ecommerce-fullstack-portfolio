import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

function Hero() {
    return (
        <section className="overflow-hidden bg-gradient-to-b from-teal-50 via-white to-white">
            <div className="mx-auto grid min-h-[520px] max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
                <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-teal-800 shadow-sm">
                        <Zap className="h-3.5 w-3.5" /> Digital tools, one click away
                    </span>

                    <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                        Digital products to help you
                        <span className="mt-1 block text-primary">learn, build, and create.</span>
                    </h1>

                    <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
                        Explore practical resources, creative assets, and technology bundles in one simple storefront.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/#products"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800"
                        >
                            Explore products <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/#about"
                            className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-teal-200 hover:text-primary"
                        >
                            Learn more
                        </Link>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
                        <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Secure checkout</span>
                        <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4 text-primary" /> Digital delivery</span>
                    </div>
                </div>

                <div aria-hidden="true" className="relative mx-auto hidden w-full max-w-md lg:block">
                    <div className="absolute -inset-8 rounded-full bg-teal-100/60 blur-3xl" />
                    <div className="relative rounded-3xl border border-white bg-white/90 p-5 shadow-2xl shadow-teal-900/10">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-300" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-green-300" /></div>
                            <span className="text-xs font-medium text-gray-400">Your next idea starts here</span>
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <div className="rounded-2xl bg-teal-50 p-5"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white"><ShieldCheck className="h-5 w-5" /></div><p className="mt-4 text-sm font-bold text-gray-900">Technology</p><p className="mt-1 text-xs text-gray-500">Tools and guides</p></div>
                            <div className="rounded-2xl bg-indigo-50 p-5"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white"><ArrowRight className="h-5 w-5" /></div><p className="mt-4 text-sm font-bold text-gray-900">Creativity</p><p className="mt-1 text-xs text-gray-500">Design resources</p></div>
                            <div className="col-span-2 flex items-center justify-between rounded-2xl border border-gray-100 p-4"><div><p className="text-sm font-bold text-gray-900">A simpler way to discover</p><p className="mt-1 text-xs text-gray-500">Browse the collection below</p></div><div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-primary"><ArrowRight className="h-5 w-5" /></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
