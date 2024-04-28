
import type {Dispatch} from "react";
import {allIngredients} from "../constants/allIngredients.ts";
import {Ingredients} from "../types/recipe.ts";

export function addIngredient(setIngredients:Dispatch<Ingredients[]>,
                              setInputTextIngredient:Dispatch<string>,
                              ingredients: Ingredients[],
                              inputTextIngredient:string):void{
    if (inputTextIngredient.trim() !== '') {
        let quantity = 'not specified';
        let name = inputTextIngredient.trim();

        const regex = /^(\d+(\.\d+)?)\s*(\S*)\s*(.*)/;
        const match = inputTextIngredient.match(regex);

        if (match) {
            quantity = match[1] + (match[3] ? ' ' + match[3] : ''); // Append unit if present
            name = match[4];
        }

        const officialIngredient = allIngredients.find(
            (ingredient) => ingredient.value.toLowerCase() === name.toLowerCase()
        );

        const newIngredient = {
            name: name,
            quantity: quantity,
            imageUrl: officialIngredient ? officialIngredient.imageUrl : 'https://placehold.co/400x400?text=Not+Found',
        };

        setIngredients([...ingredients, newIngredient]);
        setInputTextIngredient('');
    }
}