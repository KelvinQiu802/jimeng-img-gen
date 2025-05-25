import axios from "axios";

export async function generateImage(prompt: string) {
    const response = await axios.post('https://api.302.ai/v1/images/generations', {
        model: "gpt-image-1",
        prompt,
        size: '1536x1024',
        n: 1,
        quality: 'low',
    }, {
        headers: {
            Authorization: 'Bearer sk-wp4P3rH43eTaunPBZXIGFxEB2uqjOHkUjsC5kZGhHywYeTWT',
            'Content-Type': 'application/json',
        },
        params: {
            response_format: 'url'
        }
    });

    return response.data;
}

export async function editImage(image_url: string, prompt: string) {
    try {
        // 下载图片
        const res = await fetch(image_url);
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 构建 File 对象（可选，FormData 支持 Buffer/File/Blob）
        const fileName = image_url.split('/').pop();
        const imageType = image_url.split('.').pop();
        const file = new File([buffer], fileName || 'image.jpg', { type: `image/${imageType}` });

        // 创建FormData
        const formData = new FormData();

        // 直接使用blob数据，让浏览器自动处理文件类型
        formData.append('image', file);
        formData.append('prompt', prompt);
        formData.append('model', 'gpt-image-1');
        formData.append('quality', 'low');
        formData.append('size', '1536x1024');
        formData.append('n', '1');

        const response = await axios.post('https://api.302ai.cn/v1/images/edits', formData, {
            headers: {
                Authorization: 'Bearer sk-wp4P3rH43eTaunPBZXIGFxEB2uqjOHkUjsC5kZGhHywYeTWT',
            },
            params: {
                response_format: 'url'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Edit image error:', error);
    }

    return null;
}