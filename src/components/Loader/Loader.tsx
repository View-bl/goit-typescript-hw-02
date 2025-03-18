import { Oval } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <Oval
        height={50}
        width={50}
        color="#3f51b5"
        visible={true}
        ariaLabel="oval-loading"
      />
    </div>
  );
};

export default Loader;
