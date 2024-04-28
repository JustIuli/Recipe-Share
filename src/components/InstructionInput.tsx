import {Button, Card, Container, Group, Stack, Text, Textarea} from "@mantine/core";
import {ChangeEvent} from "react";
import {RecipeStep} from "../types/recipe.ts";

type InstructionsInputProps = {
    steps: RecipeStep[],
    inputTextInstructions: string,
    handleInputChangeInstructions: (e: ChangeEvent<HTMLInputElement>) => void,
    handleAddStep: () => void,
    handleStepDelete: (s: string) => void,
}
export const InstructionsInput = ({steps , inputTextInstructions , handleInputChangeInstructions
                                      , handleAddStep , handleStepDelete}:InstructionsInputProps) => {
    return (
        <Stack gap={0}>
            <Text size='sm'>Recipe Instructions</Text>
            <Stack gap={5}>
                { /* @ts-expect-error: can't typehint this correctly */}
                <Textarea onChange={handleInputChangeInstructions}
                    withAsterisk
                    resize="vertical"
                    aria-label='Description of recipe'
                    placeholder="Introduce your recipe , add notes , cooking tips , serving , suggestions , etc..."
                    style={{width: '100%', marginRight: '5px'}}
                    value={inputTextInstructions}
                />
                <Button fullWidth onClick={handleAddStep} color='yellow'>Add</Button>
            </Stack>
            {steps.map((step, index) => (
                <Card key={index} mt='xs' p='xs'>
                    <Container p={0} style={{width: '100%'}}>
                        <Stack>
                                <Group justify='space-between'>
                                    <Text c='dimmed' fw={800}>Step {step.step}</Text>
                                    <Button onClick={() => handleStepDelete(step.content)} color='red'
                                            size='compact-sm' variant='transparent'>
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
                                <Text>{step.content}</Text>
                        </Stack>
                    </Container>
                </Card>
            ))}
        </Stack>
    );
}