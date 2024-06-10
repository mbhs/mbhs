import React from "react";

interface YouTubeVideoProps {
  url: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ url }) => {
  const getEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return `https://www.youtube.com/embed/${match && match[2].length === 11 ? match[2] : null}`;
  };

  return (
    <div className="w-full aspect-video">
      <iframe
        src={getEmbedUrl(url)}
        frameBorder="0"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default YouTubeVideo;