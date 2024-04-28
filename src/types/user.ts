import {Recipe} from './recipe';

export interface User {
    recipes: Recipe[];
    savedRecipes: Recipe[];
    email: string;
    authProvider: 'local' | 'google';
    profilePhoto: string;
    uid: string;
    following:Partial<User[]>;
    followers:Partial<User[]>;
    description:string;
    likedRecipes: Recipe[];
    dislikedRecipes: Recipe[];
    name: string;
}