import Hidden from "@material-ui/core/Hidden";
import { Gutter } from "@ui";
import React from "react";
import { NAVIGATION_LINKS } from "routes";
import {
  VideoPlayerModalMaximized,
  VideoPlayerModalMinimized,
} from "../../video/video-player";
import { NavigationBarBottom, NavigationBarTop } from "../navigation";
import { NAV_BAR_HEIGHT } from "../navigation/navigation-constants";
import { AppLogo } from "./app-logo";

const AppLayoutSmall = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <VideoPlayerModalMaximized />

      {children}

      <VideoPlayerModalMinimized bottom={NAV_BAR_HEIGHT} />

      <NavigationBarBottom logo={<AppLogo />} links={NAVIGATION_LINKS} />

      <Gutter height={NAV_BAR_HEIGHT} />
    </>
  );
};

const AppLayoutLarge = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <VideoPlayerModalMaximized />

      <NavigationBarTop logo={<AppLogo />} links={NAVIGATION_LINKS} />

      <Gutter height={NAV_BAR_HEIGHT} />

      {children}

      <VideoPlayerModalMinimized bottom={0} />
    </>
  );
};

export const AppLayoutResponsive = ({
  children,
}: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Hidden xsDown implementation="css">
        <AppLayoutLarge>{children}</AppLayoutLarge>
      </Hidden>

      <Hidden smUp implementation="css">
        <AppLayoutSmall>{children}</AppLayoutSmall>
      </Hidden>
    </>
  );
};
