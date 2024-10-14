import DefaultHeader from "@/components/DefaultHeader";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Syzygetic?",
      answer:
        "Syzygetic is a platform designed to advance the cause of native instrumentation with OpenTelemetry for open source and commercial platforms, libraries, frameworks, and other important parts of the software ecosystem. It provides a public forum where users and developers can collaborate on targeted bounties to improve the quality and coverage of OpenTelemetry instrumentation.",
    },
    {
      question: "What is the mission of Syzygetic?",
      answer:
        "Our mission is to make it easier for users and developers to find and contribute to instrumentation projects, and for organizations that wish to financially support open source development to have a clearinghouse for discovering and funding important projects.",
    },
    {
      question:
        "Is this project officially affiliated with OpenTelemetry or the CNCF?",
      answer:
        "No, this is an independent project that I built in my spare time. :)",
    },
    {
      question: "How does the platform work?",
      answer:
        "Users can create bounties for specific features or improvements they want to see, as well as vote on bounties other users have submitted. Developers can work on open bounties to earn rewards and contribute to the OpenTelemetry community. Once a bounty is completed, the developer can submit their work for review and claim the reward.",
    },
    {
      question: "How can I participate?",
      answer:
        "There are several ways to participate: you can create or vote on bounties, contribute to discussions, work on open bounties, or spread the word about our platform.",
    },
    {
      question: "How does the voting system work?",
      answer:
        "Users can upvote bounties they find important. The more votes a bounty receives, the higher its priority becomes. This helps in prioritizing the most important and impactful projects.",
    },
    {
      question: "Who created Syzygetic?",
      answer:
        "This project was created by Austin Parker, a long-time OpenTelemetry contributor and maintainer.",
    },
    {
      question: "How can developers claim bounties?",
      answer:
        "Developers can work on open bounties. Once they complete the work, they can submit it for review. If approved, they can claim the reward associated with the bounty.",
    },
    {
      question: "Is Syzygetic only for OpenTelemetry instrumentation?",
      answer:
        "Yes, Syzygetic is specifically focused on advancing native instrumentation with OpenTelemetry for various platforms, libraries, and frameworks in the software ecosystem.",
    },
    {
      question: "How can I contact the Syzygetic team?",
      answer:
        "If you have any questions, suggestions, or would like to report an issue, you can contact us on Bluesky at @aparker.io.",
    },
  ];

  return (
    <>
      <DefaultHeader />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-sapphire_blue-800 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold mb-3 text-sapphire_blue-900 dark:text-sapphire_blue-100">
                {faq.question}
              </h2>
              <p className="text-sapphire_blue-700 dark:text-sapphire_blue-200">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
