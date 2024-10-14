import DefaultHeader from "@/components/DefaultHeader";

export default function TermsOfServicePage() {
  return (
    <>
      <DefaultHeader />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By accessing or using Syzygetic&apos;s services, you agree to be
            bound by these Terms of Service and all applicable laws and
            regulations. If you do not agree with any part of these terms, you
            may not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
          <p className="mb-4">
            You may use our services only for lawful purposes and in accordance
            with these Terms. You agree not to use our services in any way that
            violates any applicable local, state, national, or international law
            or regulation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="mb-4">
            When you create an account with us, you must provide accurate and
            complete information. You are solely responsible for the activity
            that occurs on your account, and you must keep your account password
            secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Content</h2>
          <p className="mb-4">
            You retain all rights to any content you submit, post, or display on
            or through our services. By submitting, posting, or displaying
            content, you grant us a worldwide, non-exclusive, royalty-free
            license to use, reproduce, modify, and distribute such content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Intellectual Property
          </h2>
          <p className="mb-4">
            Our services and their entire contents, features, and functionality
            are owned by the authors and are protected by international
            copyright, trademark, patent, trade secret, and other intellectual
            property or proprietary rights laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account and bar access to our
            services immediately, without prior notice or liability, for any
            reason whatsoever, including without limitation if you breach the
            Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Limitation of Liability
          </h2>
          <p className="mb-4">
            In no event shall this website, nor its directors, employees,
            partners, agents, suppliers, or affiliates, be liable for any
            indirect, incidental, special, consequential or punitive damages,
            including without limitation, loss of profits, data, use, goodwill,
            or other intangible losses, resulting from your access to or use of
            or inability to access or use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will provide
            at least 30 days&apos; notice prior to any new terms taking effect.
          </p>
        </section>
      </div>
    </>
  );
}
