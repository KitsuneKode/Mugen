'use client';

import { XEmbed } from 'react-social-media-embed';
export default function () {
  // const session = useSession();
  // async function getData() {
  //   const response = await axios.post(
  //     '/api/content',
  //     {
  //       type: 'reddit',
  //       link: 'https://example.com',
  //       tags: ['productivity', 'trial'],
  //       title: 'Baby shark',
  //     },
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //     }
  //   );

  //   return response;
  // }
  // const session = await getServerSession();

  // if (!session?.user) {
  //   console.log('youpsjad;l');
  //   return <Redirect to="/signin" />;
  // }

  // const publicBrain = await getPublicBrains();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 ">
        <XEmbed url="https://x.com/KitsuneKode/status/1876303242549952533" />
        <div className="flex-1 h-full w-full text-5xl text-center justify-center items-center flex"></div>
        {/* <ChatBot movement={false} /> */}
      </div>
    </div>
  );
}
