
"use client";

import React from 'react';
import { UserProfile, SocialLink, DigitalProduct } from '@/types/profile';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Instagram, Youtube, Twitter, Github, Music2, MessageSquare, Layout } from 'lucide-react';

interface ProfileEditorProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

export function ProfileEditor({ profile, setProfile }: ProfileEditorProps) {

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile({ ...profile, ...updates });
  };

  const addSocial = () => {
    const newLink: SocialLink = { id: Date.now().toString(), platform: 'other', url: '' };
    updateProfile({ socialLinks: [...profile.socialLinks, newLink] });
  };

  const removeSocial = (id: string) => {
    updateProfile({ socialLinks: profile.socialLinks.filter(l => l.id !== id) });
  };

  const addProduct = () => {
    const newProduct: DigitalProduct = { 
      id: Date.now().toString(), 
      title: 'New Creation', 
      description: 'Describe your digital loot...', 
      price: '$0', 
      imageUrl: 'https://picsum.photos/seed/newproduct/400/400',
      link: '#' 
    };
    updateProfile({ products: [...profile.products, newProduct] });
  };

  const removeProduct = (id: string) => {
    updateProfile({ products: profile.products.filter(p => p.id !== id) });
  };

  return (
    <div className="p-6 space-y-8 pb-24">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-primary">Customize Your Hero</h2>
        <p className="text-sm text-muted-foreground">Power up your landing page with epic details.</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-secondary/50">
          <TabsTrigger value="profile">Identity</TabsTrigger>
          <TabsTrigger value="theme">Style</TabsTrigger>
          <TabsTrigger value="socials">Links</TabsTrigger>
          <TabsTrigger value="shop">Loot</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Input 
                value={profile.displayName} 
                onChange={(e) => updateProfile({ displayName: e.target.value })}
                placeholder="The Ninja King"
                className="bg-secondary/30 border-primary/20 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label>Hero Bio</Label>
              <Textarea 
                value={profile.bio} 
                onChange={(e) => updateProfile({ bio: e.target.value })}
                placeholder="Write your epic journey..."
                className="min-h-[100px] bg-secondary/30 border-primary/20 focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <Label>Avatar URL</Label>
                <Input 
                  value={profile.avatarUrl} 
                  onChange={(e) => updateProfile({ avatarUrl: e.target.value })}
                  className="bg-secondary/30 border-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label>Banner URL</Label>
                <Input 
                  value={profile.bannerUrl} 
                  onChange={(e) => updateProfile({ bannerUrl: e.target.value })}
                  className="bg-secondary/30 border-primary/20"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="theme" className="space-y-4 pt-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'one-piece', name: 'Straw Hat', color: 'bg-red-600' },
              { id: 'naruto', name: 'Hidden Leaf', color: 'bg-orange-500' },
              { id: 'cyber', name: 'Cyber Hero', color: 'bg-cyan-500' },
              { id: 'dark', name: 'Deep Void', color: 'bg-zinc-800' }
            ].map(theme => (
              <button
                key={theme.id}
                onClick={() => updateProfile({ themeId: theme.id })}
                className={`p-4 rounded-lg border-2 text-left transition-all ${profile.themeId === theme.id ? 'border-primary bg-primary/10' : 'border-primary/10 bg-secondary/20 hover:border-primary/30'}`}
              >
                <div className={`w-8 h-8 rounded-md mb-2 ${theme.color}`} />
                <span className="font-bold text-sm block">{theme.name}</span>
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="socials" className="space-y-4 pt-6">
          {profile.socialLinks.map((link, index) => (
            <Card key={link.id} className="bg-secondary/20 border-primary/10">
              <CardContent className="p-3 flex items-center gap-2">
                <div className="bg-primary/20 p-2 rounded">
                  {link.platform === 'instagram' && <Instagram className="w-4 h-4" />}
                  {link.platform === 'youtube' && <Youtube className="w-4 h-4" />}
                  {link.platform === 'twitter' && <Twitter className="w-4 h-4" />}
                  {link.platform === 'github' && <Github className="w-4 h-4" />}
                  {link.platform === 'tiktok' && <Music2 className="w-4 h-4" />}
                  {link.platform === 'discord' && <MessageSquare className="w-4 h-4" />}
                  {link.platform === 'other' && <Layout className="w-4 h-4" />}
                </div>
                <Input 
                  value={link.url}
                  onChange={(e) => {
                    const newLinks = [...profile.socialLinks];
                    newLinks[index].url = e.target.value;
                    updateProfile({ socialLinks: newLinks });
                  }}
                  placeholder="URL link..."
                  className="flex-1 bg-transparent border-none focus-visible:ring-0 h-8"
                />
                <Button variant="ghost" size="icon" onClick={() => removeSocial(link.id)} className="h-8 w-8 text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" className="w-full border-dashed border-primary/40 hover:bg-primary/5" onClick={addSocial}>
            <Plus className="w-4 h-4 mr-2" />
            Add Social Link
          </Button>
        </TabsContent>

        <TabsContent value="shop" className="space-y-4 pt-6">
           {profile.products.map((product, index) => (
            <Card key={product.id} className="bg-secondary/20 border-primary/10">
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <Input 
                    value={product.title}
                    onChange={(e) => {
                      const newProducts = [...profile.products];
                      newProducts[index].title = e.target.value;
                      updateProfile({ products: newProducts });
                    }}
                    className="font-bold bg-transparent border-none focus-visible:ring-0 p-0 text-base"
                  />
                   <Button variant="ghost" size="icon" onClick={() => removeProduct(product.id)} className="h-8 w-8 text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <Input 
                   value={product.price}
                   onChange={(e) => {
                     const newProducts = [...profile.products];
                     newProducts[index].price = e.target.value;
                     updateProfile({ products: newProducts });
                   }}
                   placeholder="Price"
                   className="h-8 bg-secondary/30 border-primary/10 w-24"
                />
                <Textarea 
                  value={product.description}
                  onChange={(e) => {
                    const newProducts = [...profile.products];
                    newProducts[index].description = e.target.value;
                    updateProfile({ products: newProducts });
                  }}
                  className="text-sm bg-secondary/30 border-primary/10 min-h-[60px]"
                />
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" className="w-full border-dashed border-primary/40 hover:bg-primary/5" onClick={addProduct}>
            <Plus className="w-4 h-4 mr-2" />
            Add Digital Product
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
