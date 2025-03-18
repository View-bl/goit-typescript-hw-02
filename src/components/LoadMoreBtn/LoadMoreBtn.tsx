import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button className={styles.loadMoreBtn} onClick={onClick}>
      Завантажити більше
    </button>
  );
};

export default LoadMoreBtn;
