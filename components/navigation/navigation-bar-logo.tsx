import AppBar, { AppBarProps } from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React, { forwardRef } from "react";
import { Logo } from "../app/logo";
import { ISettings } from "../../lib/domain";

export const useStyles = makeStyles(() => ({
  toolbar: {
    justifyContent: "center",
  },
}));

export const NavigationBarLogo = forwardRef<
  unknown,
  AppBarProps & { settings: ISettings }
>(({ settings, ...props }, ref) => {
  const classes = useStyles();

  return (
    <AppBar ref={ref} position="fixed" color="default" {...props}>
      <Toolbar className={classes.toolbar}>
        <Logo settings={settings} />
      </Toolbar>
    </AppBar>
  );
});