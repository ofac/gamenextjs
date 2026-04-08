"use client";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import Link              from "next/link";

export default function BackHomeButton() {
    return (
        <div>
            <Link href="/" className="btn btn-outline mt-10 w-full hover:bg-purple-600">
                <ArrowLeftIcon size={24} />
                Go back Home
            </Link>
        </div>
    );
}
