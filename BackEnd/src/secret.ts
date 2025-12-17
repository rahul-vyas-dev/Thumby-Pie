export function ModifiedPrompt(prompt:string) {
    return 'Create an ultra-realistic, high-resolution image with accurate lighting, textures, proportions, and clean geometry. Use reference images to match faces, clothing, colors, shadows, and environment. Final output must be sharp, detailed, coherent, and distortion-free. User requirement: "' + prompt + '".';
}

export function ModifiedPromptForEditImage(prompt:string) {
    return 'Edit the given image to perfectly match the user description while maintaining ultra-realism and high resolution. Ensure accurate lighting, textures, proportions, and clean geometry. Use reference images to align faces, clothing, colors, shadows, and environment with the description. Final output must be sharp, detailed, coherent, and distortion-free. User requirement: "' + prompt + '".'; 
}