import React from 'react';
import AppCard from './AppCard';

interface AppData {
    name: string;
    icon: string;
    developer: string;
    size: string;
    downloads: string;
}

const popularApps: AppData[] = [
    {
        name: 'Instagram',
        icon: 'https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM=w240-h480-rw',
        developer: 'Meta',
        size: '48MB',
        downloads: '1M+'
    },
    {
        name: 'WhatsApp',
        icon: 'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=w240-h480-rw',
        developer: 'Meta',
        size: '52MB',
        downloads: '5M+'
    },
    {
        name: 'Telegram',
        icon: 'https://play-lh.googleusercontent.com/ZU9cSsyIJZo6Oy7HTHiEPwZg0m2Crep-d5ZrfajqtsH-qgUXSqKpNA2FpPDTn-7qA5Q=w240-h480-rw',
        developer: 'Telegram FZ-LLC',
        size: '38MB',
        downloads: '500K+'
    },
    {
        name: 'X',
        icon: 'https://play-lh.googleusercontent.com/fb1LxG5fS9xORQoibPvw1NLGxFL6Kn1-pQS7IHoO8xo7OTJc0vHVfI8PPQix_hEgYA=w240-h480-rw',
        developer: 'X Corp.',
        size: '32MB',
        downloads: '100K+'
    }
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {popularApps.map((app) => (
                        <AppCard key={app.name} {...app} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularApps;
