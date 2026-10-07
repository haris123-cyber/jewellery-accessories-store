import type { Metadata } from "next";
import { Shell } from "@/components/layout";

export const metadata: Metadata = {
  title: "Return Policy",
  description: "Information about returns and refunds.",
};
export default function ReturnPage() {
  return (
    <Shell>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl min-h-[70vh]">
        <h1 className="text-4xl font-bold text-[#111827] mb-8">Return & Refund Policy</h1>

        <div className="text-[15px] text-gray-600 leading-relaxed">
          <div className="space-y-4 mb-12">
            <p><strong>Store:</strong> Mini Mart</p>
            <p><strong>Support Email:</strong> info@woxly.in</p>
            <p><strong>Support Phone:</strong> +9173063 47297</p>
            <p><strong>Return Address:</strong> [INSERT RETURN ADDRESS]</p>
            <p><strong>Support Hours:</strong> Monday to Sunday, 9:00 AM to 8:00 PM</p>
          </div>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Return Window</h2>
          <p className="mb-12">
            Customers can request a return within 30 days of delivery, unless an item is marked as non-returnable.
          </p>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Eligibility</h2>
          <ul className="list-disc pl-5 space-y-2 mb-12">
            <li>Item must be unused and in original condition.</li>
            <li>Original packaging, tags, and proof of purchase are required.</li>
            <li>Customized, perishable, digital, and gift card items may be excluded.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Return Process</h2>
          <p className="mb-12">
            To request a return, contact us using the support details above. Approved requests receive step-by-step return instructions.
          </p>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Refund Timeline</h2>
          <p className="mb-12">
            Once inspected and approved, refunds are processed to the original payment method within 5-10 business days.
          </p>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Need Help?</h2>
          <p className="mb-12">
            For return-related questions, contact info@woxly.in
          </p>
        </div>
      </div>
    </Shell>
  );
}
