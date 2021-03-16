import CardHeader from "@material-ui/core/CardHeader";
import Dialog from "@material-ui/core/Dialog";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { IVideo } from "../../lib/data-access";
import { CloseIconButton } from "../shared/close-icon-button";
import { SlideUp } from "../shared/transitions";
import { toSubtitle } from "./video";
import { VideoPlayer } from "./video-player";
import { useVideoState } from "./video-state";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    top: 0,
    width: "100%",
    maxWidth: theme.breakpoints.width("md"),
    margin: 0,
  },
}));

export const VideoPlayerModalMaximized = ({
  currentVideo,
}: {
  currentVideo: IVideo;
}) => {
  const classes = useStyles();
  const videoState = useVideoState();

  return (
    <Dialog
      TransitionComponent={SlideUp}
      open={videoState.modalState === "opened"}
      onClose={() => {
        videoState.setModalState("minimized");
      }}
      classes={{ paper: classes.paper }}
      keepMounted={videoState.modalState === "minimized"}
    >
      <VideoPlayer currentVideo={currentVideo} />

      <CardHeader
        title={currentVideo.name}
        titleTypographyProps={{ variant: "subtitle1" }}
        subheader={toSubtitle(currentVideo)}
        subheaderTypographyProps={{ variant: "subtitle2" }}
        action={
          <CloseIconButton
            onClick={() => {
              videoState.closeVideo();
            }}
          />
        }
      />
    </Dialog>
  );
};
