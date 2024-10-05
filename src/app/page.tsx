import FeatureList from "@/components/FeatureList";
import SearchFilter from "@/components/SearchFilter";
import AddFeatureButton from "@/components/AddFeatureButton";

export default function Home() {
  return (
    <div className="space-y-8 pl-28 pr-28">
      <div className="flex justify-between items-center">
        <SearchFilter />
        <AddFeatureButton />
      </div>
      <FeatureList />
    </div>
  );
}
