import { editImage, generateImage } from './image-1';

const PROMPT = `
把图片中的比熊犬换成一只英短蓝白猫
`

async function main() {
    const response = await editImage('https://file.302.ai/gpt/imgs/20250525/bc78f9f5921141c0ad7d0ef2bc829ec2.png', PROMPT);
    console.log(response);
}

main();