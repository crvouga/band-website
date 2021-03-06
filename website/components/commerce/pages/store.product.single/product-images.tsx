import {
  Image,
  ImageViewModal,
  PaginationDots,
  SwipeableViews,
} from "@components/generic";
import Box from "@material-ui/core/Box";
import React, { useEffect, useState } from "react";

type IProductImagesState = "default" | "image-modal-opened";

export const useProductImagesState = () => {
  const [state, setState] = useState<IProductImagesState>("default");

  const [index, setIndex] = useState(0);

  return {
    state,
    setState,
    index,
    setIndex,
  };
};

export const ProductImages = ({
  images,
  state,
}: {
  images: { src: string; alt: string }[];
  state: ReturnType<typeof useProductImagesState>;
}) => {
  useEffect(() => {
    state.setIndex(0);
  }, [images.map((image) => image.src).join(", ")]);

  return (
    <>
      <ImageViewModal
        startIndex={state.index}
        open={state.state === "image-modal-opened"}
        onClose={() => state.setState("default")}
        images={images.map((image) => ({
          src: image.src,
          width: 1000,
          height: 1000,
        }))}
      />

      <SwipeableViews index={state.index} onChangeIndex={state.setIndex}>
        {images.map((image) => (
          <Image
            onClick={() => state.setState("image-modal-opened")}
            key={image.src}
            aspectRatio={1}
            src={image.src}
            alt={image.alt}
          />
        ))}
      </SwipeableViews>

      {images.length > 1 && (
        <Box width="100%" display="flex" justifyContent="center" paddingTop={1}>
          <PaginationDots
            hideArrows
            page={state.index + 1}
            count={images.length}
            onChange={(page) => state.setIndex(page - 1)}
          />
        </Box>
      )}
    </>
  );
};
