import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about GetCalculation - your trusted source for free online calculators and educational tools.",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to GetCalculation</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              GetCalculation is a comprehensive platform offering free online calculators and educational tools 
              for mathematics, physics, finance, and more. Our mission is to make complex calculations 
              accessible to everyone, from students and educators to professionals and enthusiasts.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We believe that everyone should have access to powerful, easy-to-use calculation tools without 
              barriers. Whether you're solving geometry problems, working on physics equations, or making 
              financial calculations, GetCalculation provides the tools you need to succeed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Free, easy-to-use calculators for a wide range of topics</li>
              <li>Embeddable calculator widgets for your website</li>
              <li>Clear explanations and step-by-step solutions</li>
              <li>Regular updates with new calculators and features</li>
              <li>A user-friendly interface designed for all skill levels</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At GetCalculation, we are committed to providing accurate, reliable, and free tools that help 
              users solve problems efficiently. We continuously work to improve our platform, add new 
              calculators, and enhance the user experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              If you have questions, suggestions, or feedback, we'd love to hear from you. Your input helps 
              us make GetCalculation better for everyone.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

