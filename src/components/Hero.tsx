import React from 'react';
import HeroSearchBox from './HeroSearchBox';

const Hero = () => {
    return (
        <section className="bg-black text-white min-h-[50vh] flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
            <div className="container mx-auto px-4 z-10">
                <div className="flex flex-col items-center text-center space-y-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in block mt-2 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                        APK Realm'e Hoş Geldiniz
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl text-gray-300 leading-relaxed">
                        Android uygulamalarınızı farklı kaynaklardan indirmek ve yüklemek için
                        <span className="block">en güvenilir platformunuz</span>
                    </p>
                    <div className="w-full animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <HeroSearchBox />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
