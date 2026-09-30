"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNav } from "@/data/mock";
import { Logo } from "./Logo";
import { UtilityNav } from "./UtilityNav";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <header className="bg-primary text-white">
      <div className="container-xl relative flex flex-col items-center gap-2 px-2 py-5 md:py-6">
        <Logo />
        <button
          type="button"
          aria-label="Toggle theme"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-white/90 hover:text-white transition"
        >
          <MoonIcon />
        </button>
      </div>

      <nav
        aria-label="Main Navigation"
        className="border-t-2 border-white bg-primary"
      >
        <div className="container-xl flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 bg-secondary px-3 h-[50px] md:hidden font-bold"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            <MenuIcon />
            MENU
          </button>

          <div
            className={`${
              open ? "flex" : "hidden"
            } md:flex w-full md:w-auto flex-col md:flex-row md:items-center`}
          >
            <ul className="flex flex-col md:flex-row md:items-stretch">
              {mainNav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href) && item.href !== "#";

                if (item.children?.length) {
                  return (
                    <li key={item.label} className="relative">
                      <button
                        type="button"
                        className="nav-link flex items-center gap-1 px-3 py-3.5 hover:bg-secondary"
                        onClick={() => setMoreOpen((v) => !v)}
                        data-active={moreOpen}
                      >
                        {item.label}
                        <ChevronIcon />
                      </button>
                      {moreOpen ? (
                        <ul className="md:absolute left-0 top-full z-40 min-w-52 bg-secondary shadow-lg">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block px-4 py-2.5 hover:bg-ternary"
                                onClick={() => {
                                  setMoreOpen(false);
                                  setOpen(false);
                                }}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="nav-link block px-3 py-3.5 hover:bg-secondary"
                      data-active={active}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="ml-auto hidden md:flex items-center gap-3 text-sm font-bold">
            <span className="hover:text-white/80 cursor-default">English</span>
            <span className="hover:text-white/80 cursor-default">हिन्दी</span>
            <button type="button" aria-label="Recent" className="p-1.5 hover:text-white/80">
              <ClockIcon />
            </button>
            <button type="button" aria-label="Trending" className="p-1.5 hover:text-white/80">
              <TrendIcon />
            </button>
            <button type="button" aria-label="Search" className="p-1.5 hover:text-white/80">
              <SearchIcon />
            </button>
          </div>
        </div>
      </nav>

      <UtilityNav />
    </header>
  );
}

function MenuIcon() {
  return (
    <svg className="size-7" viewBox="0 0 28 28" aria-hidden="true">
      <path
        d="M4 7C4 6.45 4.45 6 5 6H24C24.55 6 25 6.45 25 7C25 7.55 24.55 8 24 8H5C4.45 8 4 7.55 4 7Z"
        fill="currentColor"
      />
      <path
        d="M4 14C4 13.45 4.45 13 5 13H16C16.55 13 17 13.45 17 14C17 14.55 16.55 15 16 15H5C4.45 15 4 14.55 4 14Z"
        fill="currentColor"
      />
      <path
        d="M5 20C4.45 20 4 20.45 4 21C4 21.55 4.45 22 5 22H22C22.55 22 23 21.55 23 21C23 20.45 22.55 20 22 20H5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
      <path strokeWidth="1.8" strokeLinecap="round" d="M12 7v5l3 2" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M3 17l6-6 4 4 7-8" />
      <path strokeWidth="1.8" strokeLinecap="round" d="M14 7h6v6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
      <path strokeWidth="1.8" strokeLinecap="round" d="M20 20l-3.5-3.5" />
    </svg>
  );
}
