import AppBar, { AppBarProps } from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import React from "react";
import { routes } from "../../constants/routes";
import { ClickableLink } from "../@shared/clickable";

const useStyles = makeStyles((theme) => ({
  logo: {
    letterSpacing: theme.spacing(1),
    cursor: "pointer",
  },
  toolbar: {
    justifyContent: "center",
  },
}));

export const Logo = (props: TypographyProps) => {
  const classes = useStyles();

  return (
    <ClickableLink href={routes.overview()}>
      <Typography className={classes.logo} variant="h5" {...props}>
        ALIBI
      </Typography>
    </ClickableLink>
  );
};

export const LogoAppBar = React.forwardRef((props: AppBarProps, ref) => {
  const classes = useStyles();

  return (
    <AppBar ref={ref} position="fixed" color="default" {...props}>
      <Toolbar className={classes.toolbar}>
        <Logo />
      </Toolbar>
    </AppBar>
  );
});