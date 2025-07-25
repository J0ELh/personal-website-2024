"use client";
import React from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import { DesktopHomepage } from "@/full_page_components/DesktopHomepage";
import { MobileHomePage } from "@/full_page_components/MobileHomePage";

const HomePage = () => {
  const isSmallScreen = useMediaQuery("(max-width: 840px)");

  // todo, implement phone homepage after i've fixed the formatting issues of this
  return isSmallScreen ? (
    <div>
      <MobileHomePage />
    </div>
  ) : (
    <div>
      <DesktopHomepage />
    </div>
  );
};

export default HomePage;
