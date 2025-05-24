import axios from "axios";
import 'dotenv/config'

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

const PROMPT = "木偶安静的坐在窗台上,轻微摆动着身体，风轻轻吹动着窗帘，镜头慢慢向前推进";
const IMAGE_URL = "https://pic1.imgdb.cn/item/6830042458cb8da5c809375a.png";
const PARAM = '--rt keep_ratio --rs 720p --dur 5';

async function createVideo() {
    const response = await axios.post(
        `/doubao/doubao-seaweed`,
        {
            content: [
                {
                    type: "text",
                    text: `${PROMPT} ${PARAM}`
                },
                {
                    type: "image_url",
                    image_url: {
                        url: IMAGE_URL
                    }
                }
            ]
        },
        {
            baseURL: BASE_URL,
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
}

async function getResult(taskId: string) {
    const response = await axios.get(
        `/doubao/doubao-seaweed/${taskId}`,
        {
            baseURL: BASE_URL,
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
}

async function main() {
    try {
        const data = await getResult('cgt-20250523132144-s89xx');
        console.log(data);
    } catch (error) {
        console.error("Error creating video:", error);
    }
}

main();
