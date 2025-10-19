interface IImageProps {
  imageUrl: string;
  alt: string;
  className?: string;
}
const Image = (props: IImageProps) => {
  const { imageUrl, alt, className } = props;
  return <img src={imageUrl} alt={alt} className={className} />;
};
export default Image;
