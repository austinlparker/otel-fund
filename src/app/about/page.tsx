import DefaultHeader from "@/components/DefaultHeader";

export default function AboutPage() {
  return (
    <>
      <DefaultHeader />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About OpenTelemetry Fund</h1>
        <p className="mb-4">
          OpenTelemetry Fund is a community-driven platform that aims to support
          and prioritize the development of OpenTelemetry instrumentation
          libraries.
        </p>
        <p className="mb-4">
          Our mission is to empower developers and organizations to contribute
          to the OpenTelemetry ecosystem by voting on and funding critical
          instrumentation projects.
        </p>
        <p>
          Join us in shaping the future of observability and distributed tracing
          by participating in our bounty system and discussions.
        </p>
      </div>
    </>
  );
}
