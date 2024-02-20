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
import LogoSmallSVG from "@/public/assets/images/logo-text.svg";
import Image from "next/image";

const MobileNav = () => {
  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2 ">
        <Image src={LogoSmallSVG} alt="logo" width={180} height={28} />
      </Link>
    </header>
  );
};

export default MobileNav;
