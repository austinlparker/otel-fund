import DefaultHeader from "@/components/DefaultHeader";

export default function AboutPage() {
  return (
    <>
      <DefaultHeader />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">About Syzygetic</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            This platform is designed to advance the cause of native
            instrumentation with OpenTelemetry for open source and commercial
            platforms, libraries, frameworks, and other important parts of the
            software ecosystem. We aim to accomplish this by creating a public
            forum where users and developers can collaborate on targeted
            bounties to improve the quality and coverage of OpenTelemetry
            instrumentation.
          </p>
          <p className="mb-4">
            Our goal is to make it easier for users and developers to find and
            contribute to instrumentation projects, and for organizations that
            wish to financially support open source development to have a
            clearinghouse for discovering and funding important projects.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <p className="mb-4">
            Users can create bounties for specific features or improvements they
            want to see, as well as vote on bounties other users have submitted.
          </p>
          <p className="mb-4">
            Developers can work on open bounties to earn rewards and contribute
            to the OpenTelemetry community. Once a bounty is completed, the
            developer can submit their work for review and claim the reward.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="mb-4">
            This project was created by Austin Parker, a long-time OpenTelemetry
            contributor and maintainer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
          <p className="mb-4">
            There are many ways to contribute to the OpenTelemetry Fund
            community:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Create or vote on bounties</li>
            <li>Contribute to discussions</li>
            <li>Work on open bounties</li>
            <li>Spread the word about our platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions, suggestions, or would like to report an
            issue, please reach out! You can contact us on
            <a href="https://bsky.app/profile/aparker.io"> Bluesky</a>.
          </p>
        </section>
      </div>
    </>
  );
}
