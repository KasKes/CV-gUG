import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const Youtube: React.FC<{ id: string; title: string; [key: string]: any }> = ({
  id,
  title,
  ...rest
}) => {
  return (
    <LiteYouTubeEmbed
      wrapperClass="yt-lite rounded-lg"
      id={id}
      title={title}
      {...rest}
    />
  );
};

export default Youtube;
