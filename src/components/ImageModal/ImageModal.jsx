import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ image, onClose }) => {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <img
        src={image?.urls.regular}
        alt={image?.alt_description || "Image"}
        className={styles.image}
      />
      <div className={styles.textContainer}>
        <p className={styles.description}>
          {image?.alt_description || "No description available"}
        </p>
        <p className={styles.author}>
          <strong>Author:</strong> {image?.user.name || "Unknown"}
        </p>
        <p className={styles.likes}>
          <strong>Likes:</strong> {image?.likes || 0}
        </p>
      </div>
    </Modal>
  );
};

export default ImageModal;
