import styles from "./ImageCard.module.css";
import { Image } from "../../types";

interface ImageCardProps {
  image: Image;
  onImageClick: (image: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onImageClick }) => {
  return (
    <div className={styles.card} onClick={() => onImageClick(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description || "Image"}
        className={styles.image}
      />
      <div className={styles.info}>
        <p className={styles.author}>Author: {image.user.name}</p>
      </div>
    </div>
  );
};

export default ImageCard;
