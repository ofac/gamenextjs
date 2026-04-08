"use client";
import Link from "next/link";
import Image from "next/image";
import { FingerprintIcon, UserPlusIcon } from "@phosphor-icons/react";

export default function HomeInfo() {
  return (
    <div className="bg-black min-h-dvh flex flex-col gap-2 p-4 items-center justify-center">
      <div className="hero min-h-screen bg-[url(/imgs/bg-home.png)]">
          <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <Image 
                  src="/imgs/logo.png"
                  width={260}
                  height={96}
                  className="flex mx-auto -mt-24"
                  alt="Logo"
                />
                <p className="my-4 p-2 text-sm text-justify">
                  <strong>GameNext.js</strong> is a modern platform to manage and organize
                  videogames. Built with Next.js, it uses Prisma, Neon database, and 
                  Stack Auth to provide secure authentication, fast performance, and scalable 
                  data management.
                </p>
                <Link href="handler/sign-in" className="btn btn-defautl me-4 px-10 mt-8 btn-outline hover:bg-purple-600">
                  <FingerprintIcon size={24} />
                  Sign In
                </Link>

                <Link href="handler/sign-up" className="btn btn-defautl px-10 mt-8 btn-outline hover:bg-purple-600">
                  <UserPlusIcon size={24} />
                  Sign Up
                </Link>
              </div>
            </div>
        </div>
    </div>
  );
}