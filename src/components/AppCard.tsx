import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Added Link import
import { Download } from 'lucide-react';

interface AppCardProps {
    id: string; // Added for linking to detail page
    name: string;
    icon: string;
    size: string;
    downloads: string;
    version?: string;
    developer: string; // Re-added developer prop
}

const AppCard = ({ id, name, icon, developer, size, downloads, version }: AppCardProps) => {
    return (
        <Link href={`/app/${id}`} className="group relative">
            {/* Hover glow effect */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white/10 to-white/5 opacity-0
                group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:duration-200" />

            {/* Card content */}
            <div className="relative w-[120px] h-[150px] bg-white/5 backdrop-blur-sm rounded-xl p-3
                flex flex-col items-center justify-center text-center
                hover:bg-white/10 transition-all duration-300 border border-white/5
                hover:border-white/20 hover:shadow-2xl hover:shadow-white/5">

                {/* App icon */}
                <div className="relative h-14 w-14 flex-shrink-0 transform group-hover:scale-110
                    transition-transform duration-300 mb-2">
                    <div className="absolute inset-0 bg-white/10 rounded-xl blur-lg
                        opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                    <Image
                        src={icon}
                        alt={name}
                        width={56}
                        height={56}
                        className="rounded-xl relative z-10"
                    />
                </div>

                {/* App name */}
                <h3 className="text-white text-sm font-medium truncate w-full px-1
                    group-hover:text-transparent group-hover:bg-gradient-to-r
                    group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text
                    transition-all duration-300">{name}</h3>

                {/* Version info */}
                {version && <p className="text-gray-400 text-xs mt-1 truncate w-full px-1">v{version}</p>}

                {/* Download button - appears on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 bg-black/50 rounded-xl">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2
                        transition-all duration-200 flex items-center justify-center">
                        <Download size={20} />
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default AppCard;
