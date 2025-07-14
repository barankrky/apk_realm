import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Added Link import
import { Download } from 'lucide-react';

interface AppCardProps {
    id: string; // Added for linking to detail page
    name: string;
    icon: string;
    version?: string;
}

const AppCard = ({ id, name, icon, version }: AppCardProps) => {
    return (
        <Link href={`/app/${id}`} className="group relative block">
            {/* Enhanced hover glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Card content with zoom animation */}
            <div className="relative w-full h-[120px] bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-lg 
                rounded-xl p-4 flex items-center gap-3 transition-all duration-300
                border border-white/10 group-hover:border-white/30
                shadow-md group-hover:shadow-lg group-hover:shadow-blue-500/20
                transform group-hover:scale-[1.03]">
                
                {/* App icon with subtle shine */}
                <div className="relative h-14 w-14 flex-shrink-0">
                    <div className="absolute inset-0 bg-white/10 rounded-xl blur-[2px]" />
                    <Image
                        src={icon}
                        alt={name}
                        width={56}
                        height={56}
                        className="rounded-xl relative z-10"
                    />
                </div>

                {/* App info */}
                <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate text-base">{name}</h3>
                    {version && (
                        <p className="text-gray-300 text-xs mt-1 font-mono tracking-tight">v{version}</p>
                    )}
                </div>

                {/* Enhanced download button */}
                <button className="bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 
                    text-white rounded-full p-2.5 transition-all duration-200 shadow-md
                    hover:shadow-blue-500/30 hover:scale-105 flex items-center justify-center">
                    <Download size={18} strokeWidth={2} />
                </button>
            </div>
        </Link>
    );
};

export default AppCard;
