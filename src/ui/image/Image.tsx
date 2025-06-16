import { useState, type ImgHTMLAttributes } from "react";
import FallbackImage from "../../assets/fallbackImage.png";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};
export default function Image(props: ImageProps) {
  const { src, className, ...rest } = props;
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="relative overflow-hidden h-full w-full ">
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent" />
      )}
      <img
        className={`absolute top-0 left-0 object-cover w-full h-full transition-opacity duration-300 ${className} ${loaded ? 'opacity-100' : 'opacity-0'}`}
        src={error ? FallbackImage : src}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        decoding="async"
        loading="lazy"
        {...rest}
      />
    </div>
  );
}
