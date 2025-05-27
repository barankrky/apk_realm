import React from 'react';
import Image from 'next/image';
import { Download } from 'lucide-react';

interface AppCardProps {
    name: string;
    icon: string;
    developer: string;
    size: string;
    downloads: string;
}

const AppCard = ({ name, icon, developer, size, downloads }: AppCardProps) => {
    return (
        <div className="group relative">
            {/* Hover glow effect */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-white/10 to-white/5 opacity-0 
                group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:duration-200" />

            {/* Card content */}
            <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-4 
                hover:bg-white/10 transition-all duration-300 border border-white/5 
                hover:border-white/20 hover:shadow-2xl hover:shadow-white/5">

                <div className="flex items-start space-x-4">
                    {/* App icon with hover effect */}
                    <div className="relative h-16 w-16 flex-shrink-0 transform group-hover:scale-105 
                        transition-transform duration-300">
                        <div className="absolute inset-0 bg-white/10 rounded-xl blur-lg 
                            opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                        <Image
                            src={icon}
                            alt={name}
                            width={64}
                            height={64}
                            className="rounded-xl relative z-10"
                        />
                    </div>

                    {/* App details */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate group-hover:text-transparent 
                            group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 
                            group-hover:bg-clip-text transition-all duration-300">{name}</h3>
                        <p className="text-gray-400 text-sm truncate">{developer}</p>
                        <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-gray-500">{size}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Download size={12} className="opacity-75" />
                                {downloads}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Download button - appears on hover */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 
                    transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <button className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 
                        transition-all duration-200">
                        <Download size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppCard;
