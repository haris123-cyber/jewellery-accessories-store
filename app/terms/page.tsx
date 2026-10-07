import type { Metadata } from "next";
import { Shell } from "@/components/layout";
import Link from 'next/link';

export default function TermsPage() {
  const sections = [
    { id: "overview", title: "Overview" },
    { id: "section-1", title: "Section 1 - Access and Account" },
    { id: "section-2", title: "Section 2 - Our Products" },
    { id: "section-3", title: "Section 3 - Orders" },
    { id: "section-4", title: "Section 4 - Prices and Billing" },
    { id: "section-5", title: "Section 5 - Shipping and Delivery" },
    { id: "section-6", title: "Section 6 - Intellectual Property" },
    { id: "section-7", title: "Section 7 - Third-Party Links" },
    { id: "section-8", title: "Section 8 - Feedback" },
    { id: "section-9", title: "Section 9 - Prohibited Uses" },
    { id: "section-10", title: "Section 10 - Termination" },
    { id: "section-11", title: "Section 11 - Disclaimer of Warranties" },
    { id: "section-12", title: "Section 12 - Limitation of Liability" },
    { id: "section-13", title: "Section 13 - Indemnification" },
    { id: "section-14", title: "Section 14 - Governing Law" },
    { id: "section-15", title: "Section 15 - Changes to Terms of Service" },
    { id: "section-16", title: "Section 16 - Contact Information" },
  ];

  return (
    <Shell>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-6xl min-h-[70vh]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">

          {/* Left Sidebar - Navigation */}
          <div className="hidden lg:block w-48 shrink-0">
            <div className="sticky top-24">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-6">On this page</h3>
              <ul className="space-y-5">
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link href={`#${section.id}`} className="text-[13px] text-gray-500 hover:text-black transition-colors leading-relaxed block">
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 max-w-3xl text-[15px] text-gray-600 leading-relaxed">
            <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-8 tracking-tight">Terms & Conditions</h1>

            <div className="space-y-4 mb-16">
              <p><strong>Store:</strong> Mini Mart</p>
              <p><strong>Support Email:</strong> info@woxly.in</p>
              <p><strong>Support Phone:</strong> +9173063 47297</p>
            </div>

            <section id="overview" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Overview</h2>
              <div className="space-y-4">
                <p>Welcome to Mini Mart. These terms define the rules for using our storefront, placing orders, and accessing services.</p>
                <p>The below terms and conditions, together with any policies referenced herein, describe your rights and responsibilities when you use the Services.</p>
                <p>By visiting, interacting with or using our Services, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
              </div>
            </section>

            <section id="section-1" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 1 &ndash; Access and Account</h2>
              <div className="space-y-4">
                <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, and you have given us your consent to allow any of your minor dependents to use the Services on devices you own, purchase or manage.</p>
                <p>To use the Services, you may be asked to provide certain information such as your email address, billing, payment and shipping information. You represent and warrant that all information you provide is correct, current and complete.</p>
                <p>You are solely responsible for maintaining the security of your account credentials and for all of your account activity.</p>
              </div>
            </section>

            <section id="section-2" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 2 &ndash; Our Products</h2>
              <div className="space-y-4">
                <p>We have made every effort to provide an accurate representation of our products and services in our online stores. Colors or appearance may differ based on your device and settings.</p>
                <p>All descriptions of products are subject to change at any time without notice at our sole discretion. We reserve the right to discontinue any product at any time and may limit quantities.</p>
              </div>
            </section>

            <section id="section-3" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 3 &ndash; Orders</h2>
              <div className="space-y-4">
                <p>When you place an order, you are making an offer to purchase. Mini Mart reserves the right to accept or decline your order for any reason at its discretion. Your order is not accepted until we confirm acceptance.</p>
                <p>Your purchases are subject to return or exchange solely in accordance with our Return and Refund Policy.</p>
              </div>
            </section>

            <section id="section-4" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 4 &ndash; Prices and Billing</h2>
              <div className="space-y-4">
                <p>Prices, discounts and promotions are subject to change without notice. Unless otherwise stated, posted prices do not include taxes, shipping, handling, customs or import charges.</p>
                <p>You agree to provide current, complete and accurate purchase, payment and account information for all purchases made through our store.</p>
              </div>
            </section>

            <section id="section-5" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 5 &ndash; Shipping and Delivery</h2>
              <div className="space-y-4">
                <p>We are not liable for shipping and delivery delays. All delivery times are estimates only and are not guaranteed.</p>
              </div>
            </section>

            <section id="section-6" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 6 &ndash; Intellectual Property</h2>
              <div className="space-y-4">
                <p>Our Services, including all trademarks, brands, text, displays, images, graphics, videos and audio, are owned by Mini Mart, its affiliates or licensors and are protected by applicable intellectual property laws.</p>
              </div>
            </section>

            <section id="section-7" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 7 &ndash; Third-Party Links</h2>
              <div className="space-y-4">
                <p>The Services may contain links to websites operated by third parties. We are not responsible for examining or evaluating the content or accuracy of any third-party materials or websites.</p>
              </div>
            </section>

            <section id="section-8" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 8 &ndash; Feedback</h2>
              <div className="space-y-4">
                <p>If you submit feedback to us, you grant us a worldwide, royalty-free license to use, reproduce, modify, publish and distribute such feedback for operating and improving the Services.</p>
              </div>
            </section>

            <section id="section-9" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 9 &ndash; Prohibited Uses</h2>
              <div className="space-y-4">
                <p>You may access and use the Services for lawful purposes only. You must not engage in unlawful use, infringement, harassment, malicious code distribution, scraping, or attempts to bypass security features.</p>
              </div>
            </section>

            <section id="section-10" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 10 &ndash; Termination</h2>
              <div className="space-y-4">
                <p>We may terminate this agreement or your access to the Services in our sole discretion at any time without notice.</p>
              </div>
            </section>

            <section id="section-11" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 11 &ndash; Disclaimer of Warranties</h2>
              <div className="space-y-4">
                <p>The Services and all products offered through the Services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied.</p>
              </div>
            </section>

            <section id="section-12" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 12 &ndash; Limitation of Liability</h2>
              <div className="space-y-4">
                <p>To the fullest extent permitted by law, Mini Mart, its partners, directors, officers, employees, affiliates, agents, contractors, service providers or licensors are not liable for indirect, incidental, punitive, special, or consequential damages arising from your use of the Services.</p>
              </div>
            </section>

            <section id="section-13" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 13 &ndash; Indemnification</h2>
              <div className="space-y-4">
                <p>You agree to indemnify, defend and hold harmless Mini Mart and its affiliates, partners, officers, directors, employees, agents, contractors, licensors, and service providers from losses, damages, liabilities or claims arising out of your breach of these Terms or your use of the Services.</p>
              </div>
            </section>

            <section id="section-14" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 14 &ndash; Governing Law</h2>
              <div className="space-y-4">
                <p>These Terms are governed by and construed in accordance with the laws in the jurisdiction where Mini Mart is headquartered.</p>
              </div>
            </section>

            <section id="section-15" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 15 &ndash; Changes to Terms of Service</h2>
              <div className="space-y-4">
                <p>We reserve the right to update or change these Terms by posting updates on this website. Your continued use of the Services after changes are posted constitutes acceptance of those changes.</p>
              </div>
            </section>

            <section id="section-16" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-[#111827] mb-4">Section 16 &ndash; Contact Information</h2>
              <div className="space-y-4 mb-12">
                <p><strong>Email:</strong> info@woxly.in</p>
                <p><strong>Phone:</strong> +9173063 47297</p>
                <p><strong>Address:</strong> [INSERT RETURN ADDRESS]</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Shell>
  );
}
