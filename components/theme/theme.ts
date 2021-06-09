import { amber } from "@material-ui/core/colors";
import { createTheme } from "./create-theme";
import { Fonts } from "./fonts";

const mainColor = amber[100];

// complementary color: https://www.sessions.edu/color-calculator/

export const theme = createTheme({
  primaryColor: mainColor,

  backgroundColor: mainColor,
  paperColor: mainColor,

  headingFont: Fonts.BebasNeue,
  bodyFont: Fonts.Roboto,
});
