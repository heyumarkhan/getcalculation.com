import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read GetCalculation's privacy policy to understand how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6 text-sm">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At GetCalculation, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use 
              our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Automatically Collected Information</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              When you visit GetCalculation, we may automatically collect certain information about your device, 
              including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Google Analytics</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We use Google Analytics to understand how visitors interact with our website. This service 
              uses cookies and similar technologies to collect and analyze information about website usage. 
              You can learn more about how Google uses data at{" "}
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#820ECC] hover:underline"
              >
                Google's Privacy Policy
              </a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Improve our website and user experience</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Understand which calculators are most popular</li>
              <li>Ensure website security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our website and store 
              certain information. Cookies are small data files stored on your device. You can instruct your 
              browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do 
              not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our website may contain links to third-party websites or services. We are not responsible for 
              the privacy practices of these third parties. We encourage you to read the privacy policies of 
              any third-party sites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal 
              information. However, no method of transmission over the Internet or electronic storage is 
              100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our website is not intended for children under the age of 13. We do not knowingly collect 
              personal information from children under 13. If you are a parent or guardian and believe your 
              child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last updated" date. You are 
              advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us through our website.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

