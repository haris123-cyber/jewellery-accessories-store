"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Shell } from "@/components/layout";

const posts = [
  {
    title: "10 Essential Jewelry Pieces Every Woman Needs",
    date: "October 5, 2026",
    excerpt: "Discover the foundational pieces that can elevate any outfit, from classic hoops to the perfect pendant necklace.",
    slug: "essential-jewelry",
    category: "Style Guide"
  },
  {
    title: "How to Care for Your Gold Vermeil Jewelry",
    date: "September 22, 2026",
    excerpt: "Keep your pieces looking brilliant for years with our comprehensive guide to cleaning and storing your favorite jewelry.",
    slug: "jewelry-care-guide",
    category: "Care"
  },
  {
    title: "The Story Behind Our Fall Collection",
    date: "September 10, 2026",
    excerpt: "Take an exclusive behind-the-scenes look at the inspiration and craftsmanship of our newest seasonal collection.",
    slug: "fall-collection-story",
    category: "Behind the Scenes"
  },
  {
    title: "Mixing Metals: How to Do It Right",
    date: "August 15, 2026",
    excerpt: "Break the old fashion rules and learn how to stylishly combine gold, silver, and rose gold pieces.",
    slug: "mixing-metals",
    category: "Style Guide"
  }
];

const categories = ["All", "Style Guide", "Care", "Behind the Scenes"];

export function BlogView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Shell>
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-5xl min-h-[70vh]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-gray-600 text-lg">
              Thoughts on design, styling tips, and the latest from the studio.
            </p>
          </div>
          
          <div className="w-full md:w-72 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black sm:text-sm transition duration-150 ease-in-out"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-gray-100">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? "bg-black text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="flex flex-col border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] bg-gray-100 w-full relative">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span className="text-sm uppercase tracking-widest">Image</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-semibold text-gray-800">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-medium text-gray-500 mb-3">{post.date}</span>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{post.title}</h2>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-primary hover:underline mt-auto inline-flex items-center">
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            <button 
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-6 text-black border border-black px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </Shell>
  );
}
