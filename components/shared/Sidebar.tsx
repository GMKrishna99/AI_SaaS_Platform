"use client";
import Link from "next/link";
import React from "react";
import LogoSVG from "@/public/assets/images/logo-text.svg";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { User } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image src={LogoSVG} alt="logo" width={180} height={28} />
        </Link>
        <nav className="sidebar-nav">
          {/* for signed in */}
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {/* sidebar components */}
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route == pathname;
                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group cursor-pointer ${
                      isActive
                        ? "bg-purple-gradient text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <Link className="sidebar-link" href={link.route}>
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && "brightness-200"}`}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* logout button to logout user */}
            <ul className="sidebar-nav_elements">
              {navLinks.slice(6).map((link) => {
                const isActive = link.route == pathname;
                return (
                  <li
                    key={link.route}
                    className={`sidebar-nav_element group cursor-pointer ${
                      isActive
                        ? "bg-purple-gradient text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <Link className="sidebar-link" href={link.route}>
                      <Image
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && "brightness-200"}`}
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
          </SignedIn>
          {/* for not signed in */}
          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
