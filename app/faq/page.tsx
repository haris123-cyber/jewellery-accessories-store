import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Metadata } from "next";
import { Shell } from "@/components/layout";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Woxly.",
};

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. Follow the on-screen instructions to enter your shipping and payment details.",
  },
  {
    question: "Can I edit or cancel my order after placing it?",
    answer:
      "You can edit or cancel your order within 30 minutes of placing it. After that, we begin processing and packing it, so changes might not be possible. Please contact support for urgent requests.",
  },
  {
    question: "Which payment methods are supported?",
    answer:
      "We support a wide range of payment methods including Credit/Debit cards, UPI, Net Banking, and popular wallets like Google Pay and PhonePe. Cash on delivery is also available in select areas.",
  },
  {
    question: "How do refunds work?",
    answer:
      "Refunds are initiated within 24 hours of successful order cancellation or return. The amount will be credited back to the original payment method within 3-5 business days depending on your bank.",
  },
  {
    question: "How do I track my delivery?",
    answer:
      "Once your order is dispatched, you will receive an SMS and email with a tracking link. You can also track the real-time status in the 'Orders' section of your account.",
  },
  {
    question: "What items are not eligible for returns?",
    answer:
      "Perishable items, unsealed personal care products, and items marked as 'Non-returnable' on the product page cannot be returned. Please refer to our return policy for more details.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach out to our support team via the Contact Us page, email us at info@woxly.in, or WhatsApp us directly using the link in the footer. Our team is available 9:00 AM - 9:00 PM.",
  },
];

export default function FaqsPage() {
  return (
    <Shell>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl min-h-[70vh]">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-3xl font-bold text-[#111827] mb-3 self-start">FAQs</h1>
        <p className="text-gray-500 text-[15px] self-start">
          Answers about orders, delivery, returns, and payments at <span className="font-semibold text-gray-800">Woxly</span>.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg bg-white px-5 shadow-sm overflow-hidden"
            >
              <AccordionTrigger className="text-[15px] font-semibold text-gray-800 py-4 hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[14px] text-gray-600 leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
    </Shell>
  );
}
