import DefaultHeader from "@/components/DefaultHeader";

export default function PrivacyPolicyPage() {
  return (
    <>
      <DefaultHeader />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Syzygetic (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is
            committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you visit our website [www.syzygetic.dev] and use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <p className="mb-4">
            We collect information that you provide directly to us, such as when
            you create an account, post bounties, or communicate with us. This
            may include your name, email address, and any other information you
            choose to provide.
          </p>
          <p className="mb-4">
            We also automatically collect certain information about your device
            and how you interact with our services, including IP address,
            browser type, and usage data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Your Information
          </h2>
          <p className="mb-4">
            We use the information we collect to provide, maintain, and improve
            our services, to communicate with you, and to comply with legal
            obligations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Sharing of Information
          </h2>
          <p className="mb-4">
            We do not sell your personal information. We may share your
            information with third-party service providers who perform services
            on our behalf, or when required by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="mb-4">
            You have the right to access, correct, or delete your personal
            information. You may also have additional rights depending on your
            jurisdiction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Changes to This Privacy Policy
          </h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
        </section>
      </div>
    </>
  );
}
