import './youtube.module.css';

/* eslint-disable-next-line */
export interface YoutubeProps {
  title: string;
  uid: string;
}

export function Youtube(props: YoutubeProps) {
  return (
    <iframe
      className="w-full aspect-video"
      title={props.title}
      src={`https://www.youtube.com/embed/${props.uid}`}
      frameBorder="0"
      allow="acceleromater; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}

export default Youtube;
