"use client";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import HamburgerSVG from "@/public/assets/icons/menu.svg";
import LogoSVG from "@/public/assets/images/logo-text.svg";
import { navLinks } from "@/constants";
import { Button } from "../ui/button";
const MobileNav = () => {
  const pathname = usePathname();
  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2 ">
        <Image src={LogoSVG} alt="logo" width={180} height={28} />
      </Link>
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger>
              <Image
                src={HamburgerSVG}
                alt="menu"
                width={28}
                height={28}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>
                <Image src={LogoSVG} alt="logo" width={152} height={23} />
                <ul className="header-nav_elements">
                  {navLinks.map((link) => {
                    const isActive = link.route == pathname;
                    return (
                      <li
                        key={link.route}
                        className={`${
                          isActive && "gradient-text"
                        } p-18 flex whitespace-nowrap text-dark-700`}
                      >
                        <Link
                          className="sidebar-link hover:gradient-text transition-all"
                          href={link.route}
                        >
                          <Image
                            src={link.icon}
                            alt="logo"
                            width={24}
                            height={24}
                          />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="flex-center cursor-pointer gap-2 p-4">
                    <UserButton afterSignOutUrl="/" showName />
                  </li>
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>

        {/* for not signed in */}
        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
