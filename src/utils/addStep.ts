import type {Dispatch, SetStateAction} from "react";
import {RecipeStep} from "../types/recipe.ts";

export function addStep(inputTextInstruction:string , setSteps:Dispatch<RecipeStep[]> , steps:RecipeStep[] , stepsLength:number , setInputTextInstruction:Dispatch<string> , setStepsLength:Dispatch<SetStateAction<number>>){
    if (inputTextInstruction.trim() !== '') {
        setSteps([...steps, {
            "step": stepsLength + 1,
            "content":inputTextInstruction,
        }]);
        setInputTextInstruction('');
    }
    setStepsLength((stepsLength:number) => stepsLength + 1)
}