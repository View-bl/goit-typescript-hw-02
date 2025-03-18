import styles from "./ImageGallery.module.css";
import { Image } from "../../types";

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li
          key={image.id}
          className={styles.imageItem}
          onClick={() => onImageClick(image)}
        >
          <img
            src={image.urls.small}
            alt={image.alt_description || "Image"}
            className={styles.image}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
