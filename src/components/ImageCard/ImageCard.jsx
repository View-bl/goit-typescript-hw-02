import styles from "./ImageCard.module.css";

const ImageCard = ({ image, onImageClick }) => {
  return (
    <div className={styles.card} onClick={() => onImageClick(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={styles.image}
      />
      <div className={styles.info}>
        <p className={styles.author}>Author: {image.user.name}</p>
      </div>
    </div>
  );
};

export default ImageCard;
