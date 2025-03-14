'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Upload, ArrowLeft, Download, Trash2, LogOut, Lock, Save } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function SettingsPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (!user) {
      router.push('/sign-in');
    }
  }, [user, router]);

  const [avatar, setAvatar] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [preferences, setPreferences] = useState({
    neuralProcessing: false,
    quantumSecurity: false,
    notifications: false
  });

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local storage
      const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
      savedUser.displayName = formData.displayName;
      localStorage.setItem('user', JSON.stringify(savedUser));
      
      // Show success feedback
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle password update logic here
    alert('Password updated successfully');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Delete account logic here
      signOut();
      router.push('/');
    }
  };

  const handleDownloadData = () => {
    const data = {
      profile: formData,
      conversations: [], // Add actual conversation data here
      settings: preferences
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'augi-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/dashboard')}
          className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80 text-[#00E5FF]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-[#00E5FF]">System Settings</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#232438] border-[#2A2B3F] p-6">
          <h3 className="text-xl font-bold mb-6">Profile Settings</h3>
          {!user ? (
            <div className="text-center py-8">
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Sign in to access profile settings</p>
              <Button
                onClick={() => router.push('/sign-in')}
                className="bg-[#FF1B6B] hover:bg-[#FF1B6B]/80"
              >
                Sign In
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#2A2B3F]">
                  {avatar ? (
                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Upload className="w-6 h-6 text-white" />
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
              <div>
                <h4 className="font-medium mb-1">Profile Image</h4>
                <p className="text-sm text-gray-400">Upload a new profile picture</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Display Name</Label>
                <Input
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="bg-[#2A2B3F] border-[#3A3B4F]"
                />
              </div>
              <Button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="bg-[#00E5FF] hover:bg-[#00E5FF]/80 mt-4 w-full flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Profile'}
              </Button>
              <div>
                <Label>Email</Label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-[#2A2B3F] border-[#3A3B4F]"
                  type="email"
                />
              </div>
            </div>
          </div>
          )}
        </Card>

        <Card className="bg-[#232438] border-[#2A2B3F] p-6">
          <h3 className="text-xl font-bold mb-6">Account Management</h3>
          
          <div className="space-y-6">
            {!user ? (
              <>
                <Button
                  onClick={() => router.push('/pricing')}
                  className="w-full bg-[#FF1B6B] hover:bg-[#FF1B6B]/80"
                >
                  Upgrade to Premium
                </Button>
                <Button
                  onClick={() => router.push('/sign-up')}
                  className="w-full bg-[#00E5FF] hover:bg-[#00E5FF]/80"
                >
                  Create Account
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => router.push('/pricing')}
                  className="w-full bg-[#FF1B6B] hover:bg-[#FF1B6B]/80"
                >
                  Upgrade to Premium
                </Button>
                
                <Button
                  onClick={handleDownloadData}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download My Data
                </Button>
                
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
                
                <Button
                  onClick={handleDeleteAccount}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </Button>
              </>
            )}
          </div>
        </Card>

        <div className="lg:col-span-2">
          <Card className="bg-[#232438] border-[#2A2B3F] p-6">
            <h3 className="text-xl font-bold mb-6">Security Settings</h3>
            
            {!user ? (
              <div className="text-center py-8">
                <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Sign in to access security settings</p>
                <Button
                  onClick={() => router.push('/sign-in')}
                  className="bg-[#FF1B6B] hover:bg-[#FF1B6B]/80"
                >
                  Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handlePasswordUpdate}>
              <div className="space-y-4">
                <div>
                  <Label>Current Password</Label>
                  <Input
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="bg-[#2A2B3F] border-[#3A3B4F]"
                    type="password"
                  />
                </div>
                <div>
                  <Label>New Password</Label>
                  <Input
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="bg-[#2A2B3F] border-[#3A3B4F]"
                    type="password"
                  />
                </div>
                <div>
                  <Label>Confirm Password</Label>
                  <Input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-[#2A2B3F] border-[#3A3B4F]"
                    type="password"
                  />
                </div>
                <div>
                  <Label>Reset Password</Label>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/reset-password')}
                    className="w-full mt-2"
                  >
                    Forgot Password?
                  </Button>
                </div>
                <Button type="submit" className="bg-[#FF1B6B] hover:bg-[#FF1B6B]/80">
                  Update Password
                </Button>
              </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}