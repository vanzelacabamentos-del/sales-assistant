import HumbleSidebar from "@/components/HumbleSidebar";
import SalesFunnelPipeline from "@/components/SalesFunnelPipeline";

export default function SalesFunnel() {
  return (
    <div className="flex min-h-screen bg-background">
      <HumbleSidebar />
      <main className="flex-1 p-0">
        <SalesFunnelPipeline />
      </main>
    </div>
  );
}
