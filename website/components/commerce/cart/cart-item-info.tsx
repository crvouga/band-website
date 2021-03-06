import { Image } from "@components/generic";
import { formatPrice, ICartItem, cartItemToTotalPrice } from "@data-access";
import { useTheme } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";

export const CartItemInfo = ({ cartItem }: { cartItem: ICartItem }) => {
  const totalPrice = formatPrice(cartItemToTotalPrice(cartItem));
  const theme = useTheme();

  return (
    <Box
      sx={{
        paddingY: 1,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Badge
        badgeContent={<Typography variant="h6">{cartItem.quantity}</Typography>}
        color="secondary"
      >
        <Box
          sx={{
            width: "64px",
            borderRadius: theme.spacing(1 / 2),
            border: `solid 1.5px ${theme.palette.divider}`,
          }}
        >
          <Image
            aspectRatio={1}
            src={cartItem.image.src}
            alt={cartItem.image.alt}
          />
        </Box>
      </Badge>

      <Box
        sx={{
          marginLeft: 2,
          display: "flex",
          alignItems: "center",
          flex: 1,
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            marginRight: 1,
            overflowX: "hidden",
          }}
        >
          <Typography>{cartItem.productName}</Typography>
          <Typography color="textSecondary">{cartItem.variantName}</Typography>
        </Box>

        <Typography>{totalPrice}</Typography>
      </Box>
    </Box>
  );
};
