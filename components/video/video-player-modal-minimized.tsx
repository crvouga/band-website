import { Card, Container, IconButton } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { IVideo } from "../../lib/data-access";
import { toYouTubeThumbnailUrl } from "../../lib/utility/youtube";
import { NAV_BAR_HEIGHT } from "../navigation/navigation-constants";
import { Avatar } from "../shared/avatar";
import { CardHeader } from "../shared/card-header";
import { CloseIconButton } from "../shared/close-icon-button";
import { VideoCardSubheader } from "./video-card-subheader";
import { VideoPlayPauseIcon } from "./video-play-pause-icon";
import { useVideoState } from "./video-state";
import { useAnimationStyles } from "../shared/use-animation-styles";
import clsx from "clsx";

const GAP = "2px";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    position: "fixed",
    zIndex: theme.zIndex.appBar - 1,
    bottom: 0,
    [theme.breakpoints.down("xs")]: {
      bottom: `calc(${NAV_BAR_HEIGHT} - ${GAP})`,
    },
  },
  clickable: {
    cursor: "pointer",
  },
  "@keyframes flicker": {
    "0%": {
      opacity: 1,
    },
    "50%": {
      opacity: 1 / 2,
    },
    "100%": {
      opacity: 1,
    },
  },
  flicker: {
    animation: `$flicker 1s infinite`,
  },
}));

export const VideoPlayerModalMinimized = ({
  currentVideo,
}: {
  currentVideo: IVideo;
}) => {
  const classes = useStyles();
  const animationClasses = useAnimationStyles();
  const videoState = useVideoState();

  return (
    <div className={classes.root}>
      <Container maxWidth="md" disableGutters>
        <Slide direction="up" in={videoState.modalState === "minimized"}>
          <Card
            className={classes.clickable}
            onClick={() => {
              videoState.setModalState("opened");
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  variant="rounded"
                  src={toYouTubeThumbnailUrl(currentVideo?.url ?? "")}
                />
              }
              titleTypographyProps={{ noWrap: true }}
              title={currentVideo?.name}
              subheader={
                videoState.currentVideo ? (
                  <VideoCardSubheader
                    className={clsx({
                      [animationClasses.flicker]: videoState.isPlaying,
                    })}
                    video={videoState.currentVideo}
                  />
                ) : undefined
              }
              action={
                <>
                  {videoState.currentVideo && (
                    <IconButton
                      aria-label="play pause toggle button"
                      onClick={(event) => {
                        event.stopPropagation();
                        videoState.togglePlayerState();
                      }}
                    >
                      <VideoPlayPauseIcon video={videoState.currentVideo} />
                    </IconButton>
                  )}

                  <CloseIconButton
                    onClick={(event) => {
                      event.stopPropagation();
                      videoState.closeVideo();
                    }}
                  />
                </>
              }
            />
          </Card>
        </Slide>
      </Container>
    </div>
  );
};
