import { NextResponse } from 'next/server';

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

const mockApps: App[] = [
  {
    id: '1',
    name: 'Example App 1',
    icon: '/next.svg',
    developer: 'Dev Company A',
    size: '50 MB',
    downloads: '1M+',
    description: 'This is a detailed description for Example App 1. It showcases various features and functionalities. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    features: [
      'Advanced photo editing tools',
      'AI-powered filters',
      'Cloud sync across devices',
      'Collaborative editing'
    ],
    screenshots: ['/vercel.svg', '/next.svg', '/globe.svg'],
    version: '1.0.0',
    rating: 4.2,
    reviews: [
      {
        user: 'JohnDoe',
        rating: 5,
        comment: 'This app revolutionized my workflow!'
      },
      {
        user: 'JaneSmith',
        rating: 4,
        comment: 'Great features but could use better tutorials'
      }
    ],
    category: 'Productivity',
    lastUpdated: '2025-06-10'
  },
  {
    id: '2',
    name: 'Another Great App',
    icon: '/vercel.svg',
    developer: 'Innovative Solutions',
    size: '75 MB',
    downloads: '500K+',
    description: 'Another Great App offers amazing tools for productivity. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    features: [
      'Real-time collaboration',
      'Version history',
      'Custom templates',
      'Offline mode'
    ],
    screenshots: ['/globe.svg', '/file.svg', '/window.svg'],
    version: '2.1.0',
    rating: 4.8,
    reviews: [
      {
        user: 'AlexW',
        rating: 5,
        comment: 'The best app in its category!'
      }
    ],
    category: 'Utilities',
    lastUpdated: '2025-05-25'
  },
  {
    id: '3',
    name: 'Instagram',
    icon: 'https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM=w240-h480-rw',
    developer: 'Meta',
    size: '48MB',
    downloads: '1B+',
    description: 'Instagram is a simple, fun & creative way to make and share photos, videos, and stories with your friends and family.',
    features: [
      'Photo and video sharing',
      'Stories and Reels',
      'Direct messaging',
      'Explore page'
    ],
    screenshots: [],
    version: '289.0',
    rating: 4.5,
    reviews: [],
    category: 'Social',
    lastUpdated: '2025-06-15'
  }
];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const app = mockApps.find(app => app.id === id);

  if (app) {
    return NextResponse.json(app);
  } else {
    return new NextResponse('App not found', { status: 404 });
  }
}