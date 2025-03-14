'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { MapPin, Phone, Mail, ExternalLink, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#1A1B2E] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard')}
            className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80 text-[#00E5FF]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-4xl font-bold text-[#00E5FF]">Contact Us</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#232438] border-[#2A2B3F] p-6 hover:border-[#00E5FF] transition-colors">
            <MapPin className="w-8 h-8 text-[#FF1B6B] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Location</h3>
            <p className="text-gray-400">
              xAlgorithmx Security<br />
              Mobile, Alabama
            </p>
          </Card>

          <Card className="bg-[#232438] border-[#2A2B3F] p-6 hover:border-[#00E5FF] transition-colors">
            <Phone className="w-8 h-8 text-[#FF1B6B] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
            <p className="text-gray-400">(251) 394-2784</p>
            <p className="text-sm text-gray-500 mt-2">24/7 Support Available</p>
          </Card>

          <Card className="bg-[#232438] border-[#2A2B3F] p-6 hover:border-[#00E5FF] transition-colors">
            <Mail className="w-8 h-8 text-[#FF1B6B] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Email</h3>
            <p className="text-gray-400">x.xalgorithm@gmail.com</p>
            <a 
              href="mailto:x.xalgorithm@gmail.com"
              className="inline-flex items-center text-[#00E5FF] mt-2 hover:text-[#00E5FF]/80 transition-colors"
            >
              Send email <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </Card>
        </div>

        {/* Privacy Policy */}
        <Card className="bg-[#232438] border-[#2A2B3F] p-8">
          <h2 className="text-2xl font-bold text-[#00E5FF] mb-6">Privacy Policy</h2>
          <div className="space-y-6 text-gray-300">
            <section>
              <h3 className="text-xl font-bold mb-3">1. Information Collection</h3>
              <p className="leading-relaxed">
                We collect information that you provide directly to us when using our services, including:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>Contact information (name, email, phone number)</li>
                <li>System and device information</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-bold mb-3">2. Data Security</h3>
              <p className="leading-relaxed">
                We implement military-grade security measures to protect your information:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>Quantum encryption protocols</li>
                <li>Neural network-based threat detection</li>
                <li>24/7 AI-powered security monitoring</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-bold mb-3">3. Data Usage</h3>
              <p className="leading-relaxed">
                Your data is used solely for:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>Service optimization and improvement</li>
                <li>Security threat analysis and prevention</li>
                <li>Communication regarding our services</li>
              </ul>
            </section>
          </div>
        </Card>

        {/* Terms of Service */}
        <Card className="bg-[#232438] border-[#2A2B3F] p-8">
          <h2 className="text-2xl font-bold text-[#00E5FF] mb-6">Terms of Service</h2>
          <div className="space-y-6 text-gray-300">
            <section>
              <h3 className="text-xl font-bold mb-3">1. Service Usage</h3>
              <p className="leading-relaxed">
                By using our services, you agree to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>Comply with all applicable laws and regulations</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use the services only for authorized purposes</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-bold mb-3">2. Liability</h3>
              <p className="leading-relaxed">
                xAlgorithmx Security:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>Provides services "as is" without warranties</li>
                <li>Is not liable for indirect or consequential damages</li>
                <li>Reserves the right to modify services without notice</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-xl font-bold mb-3">3. Termination</h3>
              <p className="leading-relaxed">
                We reserve the right to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>Suspend or terminate services for violations</li>
                <li>Modify terms with reasonable notice</li>
                <li>Refuse service at our discretion</li>
              </ul>
            </section>
          </div>
        </Card>

        <Card className="bg-[#232438] border-[#2A2B3F] p-8">
          <h2 className="text-2xl font-bold text-[#00E5FF] mb-6">About Us</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            xAlgorithmx Security is a cutting-edge cybersecurity firm specializing in advanced AI-driven security solutions. Based in Mobile, Alabama, we provide state-of-the-art protection for your digital assets using our proprietary A.U.G.I System technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Operating Hours</h3>
              <p className="text-gray-400">24/7 Emergency Support</p>
              <p className="text-gray-400">Regular Business Hours: 9AM - 5PM CST</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Service Area</h3>
              <p className="text-gray-400">Global Remote Services</p>
              <p className="text-gray-400">Local Support in Mobile, AL</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}