import { UniformGrid } from "@components/generic";
import {
  CartItemQuantity,
  IProduct,
  ISettings,
  productToOptionsByName,
  selectedOptionsToVariant,
  useAddCartItems,
  useUiState,
} from "@data-access";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/core/Alert";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { PageWrapper } from "../../../top-level";
import { ProductCard } from "../../cards";
import { AddToCartButton } from "./add-to-cart-button";
import { ProductImages, useProductImagesState } from "./product-images";
import { ProductOptions, useProductOptionsState } from "./product-options";

export type IProductSingleProps = {
  settings: ISettings;
  product: IProduct;
  relatedProducts: IProduct[];
};

export const ProductSingle = ({
  settings,
  relatedProducts,
  product,
}: IProductSingleProps) => {
  const imagesState = useProductImagesState();
  const optionsState = useProductOptionsState();

  const optionsByName = productToOptionsByName(product);
  const selectedVariant = selectedOptionsToVariant(
    product,
    optionsState.selectedOptions
  );

  const uiState = useUiState();
  const cartAddItems = useAddCartItems();

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      return;
    }

    await cartAddItems.mutateAsync([
      {
        variantId: selectedVariant.variantId,
        quantity: CartItemQuantity(1),
      },
    ]);

    uiState.setStatus("shopping-cart-opened");
  };

  useEffect(() => {
    if (!selectedVariant?.image) {
      return;
    }

    const index = product.images.findIndex(
      (image) => image.src === selectedVariant.image.src
    );

    if (index === -1) {
      return;
    }

    imagesState.setIndex(index);
  }, [selectedVariant?.image]);

  return (
    <PageWrapper pageTitle={["Store", product.name]} settings={settings}>
      <Container disableGutters>
        <UniformGrid ItemProps={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
          <Container maxWidth="sm" disableGutters>
            <ProductImages images={product.images} state={imagesState} />
          </Container>

          <Box
            p={2}
            sx={{
              "& > *": {
                marginBottom: 2,
              },
            }}
          >
            <Typography variant="h1" align="center">
              {product.name}
            </Typography>

            <ProductOptions
              optionsByName={optionsByName}
              state={optionsState}
            />

            <AddToCartButton
              loading={cartAddItems.status === "loading"}
              disabled={selectedVariant === null}
              onClick={handleAddToCart}
            />

            <div
              dangerouslySetInnerHTML={{ __html: product.descriptionHTML }}
            />
          </Box>
        </UniformGrid>

        <Box>
          <Box paddingX={2}>
            <Typography variant="h2">Related</Typography>
          </Box>
          <UniformGrid ItemProps={{ xs: 6 }}>
            {relatedProducts.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </UniformGrid>
        </Box>
      </Container>
    </PageWrapper>
  );
};