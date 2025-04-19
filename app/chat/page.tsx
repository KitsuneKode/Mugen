import CTAChatbot from '@/components/call-to-action-chatbox';
import ChatBot from '@/components/chatbot';

export const revalidate = 60;

export default function ChatPage() {
  return (
    <div className="min-h-96 flex flex-col md:gap-4">
      <div className="flex-1 items-center justify-center flex flex-col">
        <div className="min-h-20" />
        <CTAChatbot />
        <ChatBot movement={false} />
      </div>

      <div className="my-8 mx-4 text-sm pb-0 pt-0.5 text-center">
        <span className="text-sm pb-0 pt-0.5 text-center">
          Your Second Brain assistant can access all your saved content to
          provide relevant answers.
        </span>
      </div>
    </div>
  );
}
