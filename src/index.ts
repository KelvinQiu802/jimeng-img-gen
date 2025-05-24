import { createKlingVideo, getKlingResult } from './kling';

async function main() {
    try {
        const data = await getKlingResult('kling_0e612f5c5494');
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error creating video:", error);
    }
}

main();