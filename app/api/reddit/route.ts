import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { link } = await req.json();

  try {
    const { data } = await axios.get(
      `https://www.reddit.com/oembed?url=${link}`
    );
    return NextResponse.json({
      html: data.html,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      data: link,
    });
  }
};
