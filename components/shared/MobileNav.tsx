import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import Image from "next/image";

import { SignedIn, UserButton } from "@clerk/nextjs";
import HamburgerSVG from "@/public/assets/icons/menu.svg";
import LogoSmallSVG from "@/public/assets/images/logo-text.svg";
const MobileNav = () => {
  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2 ">
        <Image src={LogoSmallSVG} alt="logo" width={180} height={28} />
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
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </SignedIn>
      </nav>
    </header>
  );
};

export default MobileNav;
