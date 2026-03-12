
"use client";

import React from 'react';
import Image from 'next/image';
import { UserProfile } from '@/types/profile';
import { Instagram, Youtube, Twitter, Github, Music2, MessageSquare, ExternalLink, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfilePreviewProps {
  profile: UserProfile;
}

export function ProfilePreview({ profile }: ProfilePreviewProps) {
  // Theme styling logic
  const getThemeStyles = () => {
    switch (profile.themeId) {
      case 'naruto':
        return {
          bg: 'bg-[#1a1a1a]',
          accent: 'text-[#FFBC0E]',
          btn: 'bg-[#FFBC0E] text-black hover:bg-[#ffcc4d]',
          card: 'border-[#FFBC0E]/20 bg-[#252525]',
          border: 'border-[#FFBC0E]',
          icon: <ShieldCheck className="text-[#FFBC0E]" />
        };
      case 'one-piece':
        return {
          bg: 'bg-[#0f172a]',
          accent: 'text-[#ef4444]',
          btn: 'bg-[#ef4444] text-white hover:bg-[#f87171]',
          card: 'border-[#ef4444]/20 bg-[#1e293b]',
          border: 'border-[#ef4444]',
          icon: <Zap className="text-[#ef4444]" />
        };
      case 'cyber':
        return {
          bg: 'bg-[#000814]',
          accent: 'text-[#00f5d4]',
          btn: 'bg-[#00f5d4] text-black hover:bg-[#00ffd4]',
          card: 'border-[#00f5d4]/20 bg-[#001d3d]',
          border: 'border-[#00f5d4]',
          icon: <Zap className="text-[#00f5d4]" />
        };
      default:
        return {
          bg: 'bg-background',
          accent: 'text-primary',
          btn: 'bg-primary text-primary-foreground',
          card: 'border-primary/20 bg-card',
          border: 'border-primary',
          icon: <Zap className="text-primary" />
        };
    }
  };

  const styles = getThemeStyles();

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'github': return <Github className="w-5 h-5" />;
      case 'tiktok': return <Music2 className="w-5 h-5" />;
      case 'discord': return <MessageSquare className="w-5 h-5" />;
      case 'lynk': return <MessageSquare className="w-5 h-5" />;
      default: return <ExternalLink className="w-5 h-5" />;
    }
  };

  return (
    <div className={`w-full min-h-full pb-20 ${styles.bg}`}>
      {/* Banner */}
      <div className="relative h-48 w-full overflow-hidden group">
        <Image 
          src={profile.bannerUrl} 
          alt="Banner" 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-700" 
          unoptimized 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
      </div>

      {/* Profile Header */}
      <div className="px-6 -mt-16 relative z-10 text-center">
        <div className="relative inline-block">
          <div className={`w-32 h-32 rounded-2xl overflow-hidden border-4 ${styles.border} shadow-2xl rotate-3 hover:rotate-0 transition-transform`}>
            <Image src={profile.avatarUrl} alt="Avatar" fill className="object-cover" unoptimized />
          </div>
          <div className={`absolute -bottom-2 -right-2 p-1.5 rounded-full ${styles.btn}`}>
            {styles.icon}
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase flex items-center justify-center gap-2">
            {profile.displayName}
          </h2>
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">@{profile.username}</p>
        </div>

        <div className={`mt-4 p-4 rounded-xl border-2 ${styles.card} relative overflow-hidden group`}>
           <div className="absolute top-0 right-0 p-2 opacity-5">
              <ShieldCheck className="w-20 h-20" />
           </div>
           <p className="text-sm leading-relaxed relative z-10 italic">"{profile.bio}"</p>
        </div>
      </div>

      {/* Social Links Hub */}
      <div className="px-6 mt-8 space-y-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${styles.btn}`} /> Social Signal
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {profile.socialLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-4 p-4 rounded-xl border-2 ${styles.card} hover:-translate-y-1 transition-all duration-300 group`}
            >
              <div className={`${styles.accent} group-hover:scale-125 transition-transform`}>
                {getSocialIcon(link.platform)}
              </div>
              <span className="flex-1 font-bold text-sm capitalize">{link.platform}</span>
              <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100" />
            </a>
          ))}
        </div>
      </div>

      {/* Digital Loot Showcase */}
      <div className="px-6 mt-10 space-y-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${styles.btn}`} /> Secret Loot
        </h3>
        <div className="grid grid-cols-1 gap-6">
          {profile.products.map((product) => (
            <div key={product.id} className={`manga-card group p-1 rounded-2xl`}>
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4">
                <Image src={product.imageUrl} alt={product.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" unoptimized />
                <div className="absolute top-2 right-2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg font-black italic border border-primary/20">
                  {product.price}
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h4 className="font-black text-xl italic uppercase tracking-tighter">{product.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <Button className={`w-full mt-4 btn-hero ${styles.btn}`} asChild>
                  <a href={product.link}>
                    Get Item <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-black uppercase tracking-widest">Built with HeroProfile ⚡️ Shonen Style</p>
      </footer>
    </div>
  );
}
