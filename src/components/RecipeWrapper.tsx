import {ReactNode} from "react";
import styles from "../assets/css/recipeWrapper.module.css";

const RecipeWrapper = ({children}:{children:ReactNode}) => {
    return (
        <div className={styles.gridContainer}>
            {children}
        </div>
    );
};

export default RecipeWrapper;