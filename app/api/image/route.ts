import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

type Body = {
  prompt: string;
  amount: string;
  resolution: "256x256" | "512x512" | "1024x1024";
};

export async function POST(req: Request) {
  const defaultAmount = "1";
  const defaultResolution = "512x512";

  try {
    const { userId } = auth();
    const { prompt, amount = defaultAmount, resolution = defaultResolution }: Body = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!configuration.apiKey) {
      return NextResponse.json({ message: "OpenAI Api Key not configured" }, { status: 500 });
    }

    if (!prompt) {
      return NextResponse.json({ message: "Prompt is required" }, { status: 400 });
    }

    if (!amount) {
      return NextResponse.json({ message: "Amount is required" }, { status: 400 });
    }

    if (!resolution) {
      return NextResponse.json({ message: "Resolution is required" }, { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return NextResponse.json({ message: "Free trial has expired." }, { status: 403 });
    }

    const response = await openai.createImage({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
