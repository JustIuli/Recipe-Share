import styles from "../assets/css/topRatedRecipe.module.css";
type RecipeProps = {
    recipeSlug:string,
    thumbnailPhoto:string,
    title:string,
    numberOfIngredients:number,
    timeToPrepare:number,
    description:string,
    authorName:string,
    authorPhoto:string
}

const TopRatedRecipe = ({ recipeSlug, thumbnailPhoto, title, numberOfIngredients, timeToPrepare , description , authorName , authorPhoto}:RecipeProps) => {
    return (
        <article className={styles.container}>
            <a href={`/recipe/${recipeSlug}`} aria-label={`Read more about ${title}`} className={styles.imageLink}>
                <img
                    src={thumbnailPhoto}
                    alt={`Read more about ${title}`}
                    className={styles.image}
                />
            </a>

            <div className={styles.content}>
                <div className={styles.metadata}>
                    <div className={styles.rating}>TOP RATED</div>
                    <div className={styles.icons}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className={styles.icon}>
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span>{timeToPrepare} Minutes</span>
                    </div>
                    <div className={styles.icons}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className={styles.icon}>
                            <path d="m15 11-1 9"/>
                            <path d="m19 11-4-7"/>
                            <path d="M2 11h20"/>
                            <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/>
                            <path d="M4.5 15.5h15"/>
                            <path d="m5 11 4-7"/>
                            <path d="m9 11 1 9"/>
                        </svg>
                        <span>{numberOfIngredients} Ingredients</span>
                    </div>
                </div>
                <a href={`/recipe/${recipeSlug}`} className={styles.title}>{title}</a>
                <p className={styles.description}>{description}</p>
                <div className={styles.author}>
                    <img src={authorPhoto} alt={`Photo of author`} width={48} height={48}
                         className={styles.authorImage}/>
                    <p className={styles.authorName}>{authorName}</p>
                </div>
            </div>
        </article>
    );
};

export default TopRatedRecipe;