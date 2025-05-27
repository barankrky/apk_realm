import React from 'react';
import { Search } from 'lucide-react';

const HeroSearchBox = () => {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="relative">
                <div className="flex items-center bg-white/10 rounded-full backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/15 hover:border-white/20">
                    <Search className="w-10 h-5 text-gray-400 ml-6" />
                    <input
                        type="text"
                        placeholder="Uygulama ara... (örn: Instagram) ↵"
                        className="w-full bg-transparent text-white placeholder-gray-400 px-4 py-4 focus:outline-none text-base"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSearchBox;
