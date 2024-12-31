import * as React from "react";

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  title: string;
  width?: number;
  height?: number | "auto";
  src: string;
  style: any;
  role: any;
  [key: string]: any;
}

const Video: React.FC<VideoProps> = ({
  title,
  width = 500,
  height = "auto",
  src,
  ...rest
}) => {
  return (
    <video
      className="overflow-hidden rounded-lg"
      width={width}
      height={height}
      controls
      {...rest}>
      <source
        src={src.match(/^http/) ? src : `/videos/${src}`}
        type="video/mp4"
      />
      {title}
    </video>
  );
};

export default Video;
