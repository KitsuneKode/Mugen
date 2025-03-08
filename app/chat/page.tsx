import ChatBot from '@/components/chatbot';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import CTAChatbot from '@/components/call-to-action-chatbox';
export default async function ChatPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/signin');
  }

  return (
    <div className="min-h-[calc(100vh-0.5rem)] flex flex-col gap-4">
      <div className="flex-1 items-center justify-center flex flex-col">
        <CTAChatbot />
        <ChatBot movement={false} />
      </div>
      <span className="text-muted-foreground text-sm pb-0 pt-0.5 mb-0 text-center">
        Your Second Brain assistant can access all your saved content to provide
        relevant answers.
      </span>
    </div>
  );
}
