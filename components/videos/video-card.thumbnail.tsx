import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React from "react";
import { IVideo } from "../../lib/contracts";
import { SEO_KEYWORD } from "../meta";
import { VideoThumbnail } from "./video-thumbnail";

type IVideoThumbnailCardProps = {
  onClick: () => void;
  video: IVideo;
};

const useStylesCardHeader = makeStyles(() => ({
  root: {
    overflow: "hidden",
  },
  content: {
    overflow: "hidden",
  },
}));

export const VideoThumbnailCard = (props: IVideoThumbnailCardProps) => {
  const { video, onClick } = props;

  const classesCardHeader = useStylesCardHeader();

  return (
    <Card onClick={onClick}>
      <CardHeader
        classes={classesCardHeader}
        titleTypographyProps={{ noWrap: true }}
        title={video.name}
        subheader="Video"
        action={
          <IconButton aria-label={`play video ${SEO_KEYWORD}`}>
            <PlayArrowIcon />
          </IconButton>
        }
      />

      <VideoThumbnail video={video} />
    </Card>
  );
};