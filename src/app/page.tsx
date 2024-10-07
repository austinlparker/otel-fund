import BountyList from "@/components/BountyList";
import AddBountyForm from "@/components/AddBountyForm";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">OpenTelemetry Fund Bounties</h1>
      <AddBountyForm />
      <div className="mt-8">
        <BountyList />
      </div>
    </div>
  );
}
