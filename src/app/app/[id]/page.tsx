"use client";

import Image from 'next/image';
import Header from "@/components/Header";
import { CheckIcon, DownloadIcon, StarIcon, UserIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
  Slide, // Import Slide
  ContainerRect, // Import ContainerRect
} from "yet-another-react-lightbox";

// Define an interface for the props that NextJsImage expects
interface CustomSlideRenderProps {
  slide: Slide;
  offset: number;
  rect: ContainerRect;
}

// Custom Next.js Image component for the lightbox
function NextJsImage({ slide, offset, rect }: CustomSlideRenderProps) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isImageSlide(slide)) return undefined; // Ensure it's an image slide

  // Safely access width and height, assuming they exist on slide for image slides
  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / (slide.height || 1)) * (slide.width || 1)),
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / (slide.width || 1)) * (slide.height || 1)),
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={slide.src}
        loading="eager"
        draggable={false}
        // Remove blurDataURL as it's not directly on SlideImage type
        // placeholder={slide.blurDataURL ? "blur" : undefined}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface App {
  id: string;
  name: string;
  icon: string;
  developer: string;
  size: string;
  downloads: string;
  description: string;
  features: string[];
  screenshots: string[];
  version?: string;
  rating?: number;
  reviews?: Review[];
  category?: string;
  lastUpdated?: string;
}

async function getAppData(id: string): Promise<App | null> {
  const res = await fetch(`http://localhost:3000/api/apps/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch app data');
  }
  return res.json();
}

export default function AppDetailPage({ params }: { params: { id: string } }) {
  const [app, setApp] = useState<App | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Unwrap params using React.use() as recommended by Next.js feedback
        // Note: React.use is a new hook for unwrapping Promises in React components
        const resolvedParams = await Promise.resolve(params); // Ensure params is treated as a Promise
        const data = await getAppData(resolvedParams.id);
        setApp(data);
      } catch (error) {
        console.error('Error fetching app data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]); // Depend on params object itself, not params.id directly

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        App not found!
      </div>
    );
  }

  const slides = app.screenshots.map(src => ({ src, width: 1280, height: 720 })); // Add width/height for NextJsImage

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto p-8">
        {/* Sticky download button */}
        <div className="sticky bottom-8 z-10 flex justify-end mr-8">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-blue-500/20">
            <DownloadIcon size={20} />
            Download
          </button>
        </div>

        {/* App header section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative h-48 w-48 flex-shrink-0">
            <Image
              src={app.icon}
              alt={`${app.name} icon`}
              fill
              className="rounded-xl"
              priority
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{app.name}</h1>
                <p className="text-lg text-gray-400 mb-4">Developer: {app.developer}</p>
              </div>
              {app.rating && (
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
                  <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{app.rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mt-2 text-gray-300">
              <span>Size: {app.size}</span>
              <span>Downloads: {app.downloads}</span>
              {app.version && <span>Version: {app.version}</span>}
              {app.category && <span>Category: {app.category}</span>}
              {app.lastUpdated && <span>Updated: {app.lastUpdated}</span>}
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        {app.features && app.features.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {app.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <CheckIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Description */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Description</h2>
          <p className="text-gray-300 leading-relaxed">{app.description}</p>
        </section>

        {/* User reviews */}
        {app.reviews && app.reviews.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-bold mb-6">User Reviews</h2>
            <div className="space-y-6">
              {app.reviews.map((review, index) => (
                <div key={index} className="p-6 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">{review.user}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Enhanced screenshot gallery */}
        {app.screenshots && app.screenshots.length > 0 && (
          <section className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {app.screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="relative w-full aspect-video rounded-lg overflow-hidden cursor-zoom-in hover:scale-[1.02] transition-transform duration-300"
                  onClick={() => {
                    setPhotoIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <Image
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Lightbox for screenshots */}
        <Lightbox
          open={lightboxOpen} // Always render, control visibility with 'open' prop
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={photoIndex}
          render={{ slide: NextJsImage }}
          on={{
            view: ({ index: currentIndex }) => setPhotoIndex(currentIndex),
          }}
        />
      </main>
    </div>
  );
}