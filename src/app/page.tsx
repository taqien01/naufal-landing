
"use client";

import React, { useState, useEffect } from 'react';
import { UserProfile, SocialLink, DigitalProduct } from '@/types/profile';
import { ProfileEditor } from '@/components/profile-editor';
import { ProfilePreview } from '@/components/profile-preview';
import { Toaster } from '@/components/ui/toaster';
import { Sword, Layout, Share2, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const DEFAULT_PROFILE: UserProfile = {
  username: 'future_hokage',
  displayName: 'Uzumaki Dev',
  bio: 'Just a shinobi coder on a mission to become the best in the leaf village. Specializing in Ninjutsu and React.',
  avatarUrl: PlaceHolderImages[2].imageUrl,
  bannerUrl: PlaceHolderImages[1].imageUrl,
  themeId: 'naruto',
  socialLinks: [
    { id: '1', platform: 'discord', url: 'https://discord.gg/hero' },
    { id: '2', platform: 'instagram', url: 'https://instagram.com/hero' }
  ],
  products: [
    {
      id: 'p1',
      title: 'Legendary Sword Asset',
      description: 'High-quality 3D model of a cursed flame blade.',
      price: '$15',
      imageUrl: PlaceHolderImages[3].imageUrl,
      link: '#'
    }
  ]
};

export default function HeroProfileApp() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const { toast } = useToast();

  const handleShare = () => {
    const url = `https://heroprofile.app/${profile.username}`;
    navigator.clipboard.writeText(url);
    toast({
      title: "Hero URL Copied!",
      description: `Your custom link is ready to share: ${url}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <header className="border-b border-primary/10 bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg rotate-[-12deg] group-hover:rotate-0 transition-transform">
              <Sword className="text-primary-foreground h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tighter uppercase italic">
              Hero<span className="text-primary">Profile</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
             <Button 
              variant={viewMode === 'edit' ? 'primary' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('edit')}
              className={viewMode === 'edit' ? 'btn-hero' : ''}
            >
              <Layout className="w-4 h-4 mr-2" />
              Build
            </Button>
            <Button 
              variant={viewMode === 'preview' ? 'primary' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('preview')}
              className={viewMode === 'preview' ? 'btn-hero' : ''}
            >
              <Rocket className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShare}
              className="border-primary/50 text-primary hover:bg-primary/10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col md:flex-row">
          {/* Editor Side - Only visible in edit mode or desktop */}
          <div className={`w-full md:w-1/2 lg:w-[450px] border-r border-primary/10 bg-card/30 overflow-y-auto ${viewMode === 'preview' ? 'hidden md:block' : 'block'}`}>
            <ProfileEditor profile={profile} setProfile={setProfile} />
          </div>

          {/* Preview Side */}
          <div className={`flex-1 bg-background/50 overflow-y-auto relative ${viewMode === 'edit' ? 'hidden md:block' : 'block'}`}>
            <div className="max-w-[480px] mx-auto min-h-full shadow-2xl bg-background border-x border-primary/5">
              <ProfilePreview profile={profile} />
            </div>
          </div>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
