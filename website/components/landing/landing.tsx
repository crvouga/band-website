import { UniformGrid } from "@components/generic";
import {
  IImageGallery,
  IRelease,
  ISettings,
  IVideoGallery,
} from "@data-access";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import {
  ImageGalleriesCard,
  ImageGalleryCard,
  ReleaseCard,
  ReleasesCard,
  VideoGalleriesCard,
  VideoGalleryCard,
} from "../content";
import { PageWrapper, routes } from "../shared";
import { Hero } from "./hero";

export type ILandingProps = {
  settings: ISettings;
  releases: IRelease[];
  videoGalleries: IVideoGallery[];
  imageGalleries: IImageGallery[];
};

export const Landing = (props: ILandingProps) => {
  const { videoGalleries, imageGalleries, releases, settings } = props;

  const sections = [
    {
      title: "Videos",
      href: routes.allVideoGalleries(),
      content: (
        <UniformGrid>
          {settings.landingPage.videoGalleries
            .slice(0, 2)
            .map((videoGallery) => (
              <VideoGalleryCard
                key={videoGallery.slug}
                videoGallery={videoGallery}
              />
            ))}
          <VideoGalleriesCard videoGalleries={videoGalleries} />
        </UniformGrid>
      ),
    },
    {
      title: "Photos",
      href: routes.allImageGalleries(),
      content: (
        <UniformGrid>
          {settings.landingPage.imageGalleries
            .slice(0, 2)
            .map((imageGallery) => (
              <ImageGalleryCard
                key={imageGallery.slug}
                imageGallery={imageGallery}
              />
            ))}
          <ImageGalleriesCard imageGalleries={imageGalleries} />
        </UniformGrid>
      ),
    },
    {
      title: "Releases",
      href: routes.allReleases(),
      content: (
        <UniformGrid>
          {releases.slice(0, 2).map((release) => (
            <ReleaseCard key={release.slug} release={release} />
          ))}
          <ReleasesCard releases={releases} />
        </UniformGrid>
      ),
    },
  ];

  return (
    <PageWrapper pageTitle={["Official Site"]} settings={settings}>
      <Hero hero={settings.landingPage.heros[0]} />

      <Box paddingY={1} />

      {sections.map((section) => (
        <Box
          key={section.href}
          component="section"
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 4,
          }}
        >
          <Container>
            <Link href={section.href}>
              <Typography sx={{ cursor: "pointer" }} variant="h2">
                {section.title}
              </Typography>
            </Link>
          </Container>

          <Container disableGutters>{section.content}</Container>
        </Box>
      ))}
    </PageWrapper>
  );
};
