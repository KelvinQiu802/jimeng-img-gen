import { createKlingVideo, getKlingResult } from './kling';

async function main() {
    // const response = await createKlingVideo();
    // console.log(response);
    const result = await getKlingResult('kling_86e9b3a1e070');
    console.log(JSON.stringify(result.data.works, null, 2));
}

main();