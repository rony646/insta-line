import { openaiClient } from "./client";

interface GenerateCaptionInput {
    description: string;
    imageUrls: string[];
}

interface GenerationCaptionResponse {
    caption: string;
}

export async function generateCaption({
    description,
    imageUrls,
}: GenerateCaptionInput): Promise<GenerationCaptionResponse> {
    const response = await openaiClient.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            {
                role: 'user',
                content: [
                    {
                      type: "text",
                      text: `Create an Instagram caption for this description: ${description} and the attached images`,
                    },
                    ...imageUrls.map((url) => ({
                      type: "image_url" as const,
                      image_url: { url },
                    })),
                  ],
            }
        ],
        store: false,
    });

    const caption = response.choices[0].message.content;

    if(!caption) {
        throw new Error("No caption returned by OpenAI");
    }

    return { caption };
}