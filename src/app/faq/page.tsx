import DefaultHeader from "@/components/DefaultHeader";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is OpenTelemetry Fund?",
      answer:
        "OpenTelemetry Fund is a platform for the community to vote on and fund OpenTelemetry instrumentation library projects.",
    },
    {
      question: "How can I participate?",
      answer:
        "You can participate by creating an account, voting on existing bounties, or creating new bounty requests for instrumentation libraries.",
    },
    {
      question: "How does the voting system work?",
      answer:
        "Users can upvote bounties they find important. The more votes a bounty receives, the higher its priority becomes.",
    },
    // Add more FAQs as needed
  ];

  return (
    <>
      <DefaultHeader />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
