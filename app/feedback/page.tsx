"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Shell } from "@/components/layout";

export default function FeedbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState("General Feedback");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thank you for your feedback!");
      (e.target as HTMLFormElement).reset();
      setCategory("General Feedback");
    }, 1000);
  };

  return (
    <Shell>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-2xl min-h-[70vh]">
      <div className="flex flex-col mb-10 text-center items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">We Value Your Feedback</h1>
        <p className="text-gray-600 text-[15px] max-w-lg">
          Help us improve your experience. Whether it's a suggestion, a compliment, or something we can do better, we'd love to hear from you.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              id="name" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
              placeholder="Your name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              id="email" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-gray-700">Category</label>
            <select 
              id="category" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all bg-white"
            >
              <option value="General Feedback">General Feedback</option>
              <option value="Product Suggestion">Product Suggestion</option>
              <option value="Website Issue">Website Issue</option>
              <option value="Customer Service Experience">Customer Service Experience</option>
              <option value="Other">Other...</option>
            </select>
            
            {category === "Other" && (
              <div className="pt-2 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2">
                <label htmlFor="otherCategory" className="sr-only">Specify Other Category</label>
                <input 
                  type="text" 
                  id="otherCategory" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                  placeholder="Please specify your category"
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">Your Message</label>
            <textarea 
              id="message" 
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all resize-y"
              placeholder="Tell us what you think..."
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-black text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
    </Shell>
  );
}
