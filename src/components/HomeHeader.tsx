"use client";

import { useSearchParams } from "next/navigation";
import Header from "./Header";

export default function HomePageHeader() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  return <Header showSearch={true} initialQuery={initialQuery} />;
}
