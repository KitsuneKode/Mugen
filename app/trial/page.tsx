import ChatBot from '@/components/chatbot';
import { Redirect } from '@/components/redirect';
import { getServerSession } from 'next-auth';

export default async function () {
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
  const session = await getServerSession();

  if (!session?.user) {
    console.log('youpsjad;l');
    return <Redirect to="/signin" />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-1 ">
        <ChatBot movement={false} />
      </div>
    </div>
  );
}
