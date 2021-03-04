import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { ISettings, IVideo } from "../../lib/domain";
import { ITag } from "../../lib/domain/tag";
import { dataStore } from "../../lib/data-store";
import { DocumentTitle } from "../app/meta";
import { PageLayout } from "../app/page-layout";
import { TagChipGroup } from "../tag/tag-chip";
import {
  VideoCardGridSkeleton,
  VideoCardGridWithPlayer,
} from "../video/video-card-grid-with-player";
import { Gutter } from "../app/navigation/gutter";

export type IVideoGalleryProps = {
  initialVideos: IVideo[];
  tags: ITag[];
  settings: ISettings;
};

const useStyles = makeStyles((theme) => ({
  tagGroup: {
    padding: theme.spacing(2, 0),
  },
  tagChipGroupBar: {
    [theme.breakpoints.down("xs")]: {
      zIndex: theme.zIndex.appBar,
      backgroundColor: theme.palette.background.default,
      position: "sticky",
      top: 0,
    },
  },
}));

export const VideoGallery = (props: IVideoGalleryProps) => {
  const { initialVideos, tags, settings } = props;

  const classes = useStyles();

  const [selected, setSelected] = useState<ITag | null>(null);

  const toggle = (tag: ITag) => {
    setSelected((selected) => (tag.slug === selected?.slug ? null : tag));
  };

  const getVideos = () => {
    if (selected) {
      return dataStore.video.getAllByTagSlug(selected.slug);
    } else {
      return initialVideos;
    }
  };

  const query = useQuery(String(selected?.slug), getVideos);

  const videos = query.data;

  return (
    <PageLayout
      title={DocumentTitle("Video", settings.band.name)}
      settings={settings}
    >
      <Gutter />
      <Container>
        <Box paddingTop={2}>
          <Typography variant="h1">Videos</Typography>
        </Box>
      </Container>

      <Container className={classes.tagChipGroupBar} disableGutters>
        <TagChipGroup
          className={classes.tagGroup}
          onClick={toggle}
          selected={selected ? [selected] : []}
          tags={tags}
        />
      </Container>

      <Container>
        {query.isLoading || !videos ? (
          <VideoCardGridSkeleton count={3} />
        ) : (
          <VideoCardGridWithPlayer videos={videos} />
        )}
      </Container>
    </PageLayout>
  );
};
