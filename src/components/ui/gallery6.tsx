"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface GalleryItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  image: string;
}

interface Gallery6Props {
  heading?: string;
  items?: GalleryItem[];
}

const Gallery6 = ({
  heading = "Gallery",
  items = [],
}: Gallery6Props) => {
  return (
    <section className="pt-16 md:pt-20 pb-10 md:pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Left aligned, tight typography */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.1] tracking-[-0.03em] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-500 bg-clip-text text-transparent">
            {heading}
          </h2>
        </div>

        {/* Grid with vertical dividers - technical dashboard style */}
        <div className="border-y border-gray-200/80 py-10 sm:py-12 lg:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`
                  ${index < 2 ? 'sm:border-r sm:border-gray-200/60' : ''}
                  ${index > 0 ? 'border-t sm:border-t-0 border-gray-200/60 pt-8 sm:pt-0' : ''}
                  sm:px-8 first:sm:pl-0 last:sm:pr-0
                `}
              >
                <Link
                  href={item.url}
                  className="group flex flex-col h-full"
                >
                  {/* Image - no background, no rounded corners */}
                  <div className="relative aspect-[4/3] mb-5 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    {/* Title - dark, no purple hover */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 min-h-[40px]">
                      {item.summary}
                    </p>

                    {/* Link - purple accent */}
                    <span className="inline-flex items-center text-sm font-medium text-violet-600 group-hover:text-violet-700 mt-auto">
                      Learn more
                      <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Gallery6 };
export type { Gallery6Props, GalleryItem };
