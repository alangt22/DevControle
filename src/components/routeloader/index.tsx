"use client";

import { useEffect } from "react";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";


NProgress.configure({ showSpinner: false });

export function RouteLoader() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 300); 

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
