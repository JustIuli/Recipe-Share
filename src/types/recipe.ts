export interface Recipe {
    author:RecipeAuthor;
    comments:RecipeComments[];
    cookTime:PrepTime,
    prepTime:PrepTime,
    ingredients:Ingredients[],
    cuisineType:string,
    dietType:string,
    mealType:string,
    ratings:RecipeRatings,
    slug:string,
    steps:RecipeStep[],
    thumbnailPhoto:string,
    title:string,
    description:string,
    id?:string,
}

export interface NewRecipe {
    author: RecipeAuthor
    comments: RecipeComments[];
    cookTime: PrepTime
    cuisineType: string | undefined;
    description: string;
    dietType: string | undefined;
    ingredients: Ingredients[];
    mealType: string | undefined;
    prepTime: PrepTime
    ratings: RecipeRatings
    slug: string;
    steps: RecipeStep[];
    thumbnailPhoto: string ;
    title: string;
}

export interface RecipeFormValues {
    title: string;
    description: string;
    servings: number;
    cuisineType: string | undefined;
    mealType: string | undefined;
    dietType: string | undefined;
    prepTimeHours: number;
    prepTimeMinutes: number;
    cookTimeHours: number;
    cookTimeMinutes: number;
    recipeThumbnail: File;
}

export interface RecipeRatings {
    downvotes:number,
    upvotes:number,
}

export interface RecipeAuthor {
    name:string,
    photo:string,
    uid:string,
}

export interface RecipeComments {
    author:RecipeAuthor;
    content:string
}
export interface PrepTime {
    hours: number;
    minutes: number;
}

export interface Ingredients {
    name:string,
    quantity:string,
    imageUrl: string
}

export interface RecipeStep {
    step:number,
    content:string,

}