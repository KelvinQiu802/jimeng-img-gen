import axios from "axios";
import 'dotenv/config'
import fs from 'fs';
import path from "path";

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

const PROMPT = `
坐在窗台上的木偶,慢慢转头看向窗户外面。房间内射进一束阳光，照在餐桌上
`;
const IMAGE = "image.png";

export async function createKlingVideo() {
    const imgPath = path.join(process.cwd(), 'images', IMAGE);
    const imgBuffer = fs.readFileSync(imgPath);
    const imgBlob = new Blob([imgBuffer]);

    const formdata = new FormData();
    formdata.append("input_image", imgBlob);
    formdata.append("prompt", PROMPT);
    formdata.append("negative_prompt", "");
    formdata.append("cfg", "0.3"); // 视频创意程度，取值[0 , 1]，0代表最高的创意度，1代表完全按照提示词创作
    formdata.append("aspect_ratio", "16:9");

    const response = await axios.post(
        '/klingai/m2v_16_img2video_5s',
        formdata,
        {
            baseURL: BASE_URL,
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
            }
        }
    );
    return response.data;
}

export async function getKlingResult(taskId: string) {
    const response = await axios.get(
        `/klingai/task/${taskId}/fetch`,
        {
            baseURL: BASE_URL,
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
            }
        }
    );
    return response.data;
}
