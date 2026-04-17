import HumbleSidebar from "@/components/HumbleSidebar";
import ConversationTabs from "@/components/ConversationTabs";

export default function Conversations() {
  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-4 md:p-8">
        <ConversationTabs />
      </main>
    </div>
  );
}
