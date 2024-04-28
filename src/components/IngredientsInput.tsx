import {Button, Card, Container, Group, Stack, Text, TextInput} from "@mantine/core";
import {capitalizeWords} from "../utils/capitalizeWords.ts";
import {ChangeEvent} from "react";
import {Ingredients} from "../types/recipe.ts";

type IngredientsInputProps = {
    ingredients:Ingredients[],
    inputTextIngredient:string,
    handleInputChangeIngredient:(e: ChangeEvent<HTMLInputElement>) => void,
    handleAddIngredient:() => void,
    handleIngredientDelete:(ingredient:string) => void,
}
const IngredientsInput = ({ingredients , inputTextIngredient ,
                              handleInputChangeIngredient , handleAddIngredient , handleIngredientDelete
                          }:IngredientsInputProps) => {
    return (
        <Stack gap={0}>
            <Text size='sm'>Recipe ingredients</Text>
            <div style={{marginTop:'5px' , display: 'flex', alignItems: 'center'}}>
                <TextInput
                    withAsterisk
                    style={{width: '100%' , marginRight:'5px'}}
                    type="text"
                    value={inputTextIngredient}
                    onChange={handleInputChangeIngredient}
                    placeholder="Add the name of the ingredient"
                />
                <Button onClick={handleAddIngredient} color='yellow'>Add</Button>
            </div>
            {ingredients.map((ingredient, index) => (
                <Card key={index} mt='xs'  p='xs'>
                    <Container p={0} style={{width: '100%'}}>
                        <Group justify='space-between'>
                            <Group>
                                <img style={{borderRadius:'10px'}} src={ingredient.imageUrl !== 'https://placehold.co/400x400?text=Not+Found' ? ingredient.imageUrl : 'https://placehold.co/400x400?text=Not+Found'} width={50} height={50}
                                     alt=""/>
                                {ingredient.quantity !== 'not specified' ? (
                                        <Stack gap={0}>
                                            <Text>{capitalizeWords(String(ingredient.name))}</Text>
                                            <Text c='dimmed' fw={800}>{capitalizeWords(String(ingredient.quantity))}</Text>
                                        </Stack>)
                                    :
                                    <Text>{capitalizeWords(ingredient.name)}</Text>
                                }
                            </Group>
                            <Button onClick={() => handleIngredientDelete(ingredient.name)} color='red' size='compact-sm' variant='transparent'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                     height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2"
                                     strokeLinecap="round"
                                     strokeLinejoin="round"
                                     className="text-neutral-500 transition-all duration-500 rounded-full hover:text-red-500 py-0.5 px-0.5">
                                    <path d="M18 6 6 18"/>
                                    <path d="m6 6 12 12"/>
                                </svg>
                            </Button>
                        </Group>
                    </Container>
                </Card>
            ))}
        </Stack>
    );
};

export default IngredientsInput;