import React from 'react';
import AppCard from './AppCard';

interface AppData {
    id: string;
    name: string;
    icon: string;
    developer: string;
    size: string;
    downloads: string;
    version?: string;
    rating?: number;
    category?: string;
}

const popularApps: AppData[] = [
    {
        id: '1',
        name: 'Example App 1',
        icon: '/next.svg',
        developer: 'Dev Company A',
        size: '50 MB',
        downloads: '1M+'
    },
    {
        id: '2',
        name: 'Another Great App',
        icon: '/vercel.svg',
        developer: 'Innovative Solutions',
        size: '75 MB',
        downloads: '500K+'
    },
    {
        id: '3',
        name: 'Instagram',
        icon: 'https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM=w240-h480-rw',
        developer: 'Meta',
        size: '48MB',
        downloads: '1B+'
    },
    {
        id: '4',
        name: 'WhatsApp',
        icon: 'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=w240-h480-rw',
        developer: 'Meta',
        size: '52MB',
        downloads: '5B+',
        version: '2.24.12.78'
    },
    {
        id: '5',
        name: 'YouTube',
        icon: 'https://play-lh.googleusercontent.com/lMoItBgdPPVDJsNOVtP26EKHePkwBg-PkuYjNjiFBhnoD1R6mmnZ-Z4b8qkNaq6zq2s=w240-h480-rw',
        developer: 'Google LLC',
        size: '78MB',
        downloads: '10B+',
        version: '19.24.36'
    },
    {
        id: '6',
        name: 'TikTok',
        icon: 'https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM=w240-h480-rw',
        developer: 'ByteDance',
        size: '120MB',
        downloads: '3B+',
        version: '32.7.3'
    },
    {
        id: '7',
        name: 'Spotify',
        icon: 'https://play-lh.googleusercontent.com/P2VMEenhpIsubG2oWbvuLGrs0GyyVLNiZE_vRi9EdHVRd5g2UalDzq-6XeHu7r1XbA=w240-h480-rw',
        developer: 'Spotify Ltd',
        size: '65MB',
        downloads: '1B+',
        version: '8.9.16'
    },
    {
        id: '8',
        name: 'Netflix',
        icon: 'https://play-lh.googleusercontent.com/TBRwjS_qfJCSjNmMNS5WQVftvURUtky9XOFKA4F1R5vRah1O1J4X_YTMf8I4zzM54r0=w240-h480-rw',
        developer: 'Netflix Inc',
        size: '28MB',
        downloads: '500M+',
        version: '8.92.0'
    },
    {
        id: '9',
        name: 'Twitter',
        icon: 'https://play-lh.googleusercontent.com/wIf3HtczQDjHzHuu7vezhqNs0zXAG85F7VmP7nhsTxO3OH71gCWPTtmApCLOXWVK1oA=w240-h480-rw',
        developer: 'X Corp',
        size: '95MB',
        downloads: '500M+',
        version: '10.32.0'
    },
    {
        id: '10',
        name: 'Telegram',
        icon: 'https://play-lh.googleusercontent.com/ZU9cSsyIJZo6Oy7HTHiEPwZg0m2Crep-d5ZrfajqtsH-qgUXSqKpNA2FpPDTn-7qA5Q=w240-h480-rw',
        developer: 'Telegram FZ-LLC',
        size: '45MB',
        downloads: '1B+',
        version: '10.3.2'
    },
];

const PopularApps = () => {
    return (
        <section className="w-full bg-black py-16">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">Popüler Uygulamalar</h2>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200">
                        Tümünü Gör →
                    </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                    {popularApps.map((app) => (
                        <AppCard key={app.id} {...app} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularApps;
