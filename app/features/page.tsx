'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Brain, Shield, Cpu, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function FeaturesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#1A1B2E] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto space-y-8"
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
          <h1 className="text-4xl font-bold text-[#00E5FF]">Core Technologies</h1>
        </div>

        {/* Neural Processing */}
        <section className="space-y-6">
          <Card className="bg-[#232438] border-[#2A2B3F] p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-[#FF1B6B] to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <Brain className="w-12 h-12 text-[#FF1B6B]" />
                <h2 className="text-3xl font-bold">Neural Processing</h2>
              </div>
              <p className="text-xl text-gray-300 mb-8">
                Advanced AI-driven analysis and decision making capabilities powered by state-of-the-art neural networks.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Deep Learning',
                    description: 'Multi-layered neural networks for complex pattern recognition'
                  },
                  {
                    title: 'Real-time Analysis',
                    description: 'Instant processing of vast data streams for immediate insights'
                  },
                  {
                    title: 'Adaptive Learning',
                    description: 'Self-improving algorithms that evolve with new data'
                  }
                ].map((feature, index) => (
                  <div key={index} className="p-4 bg-[#2A2B3F] rounded-lg">
                    <h3 className="text-lg font-bold text-[#FF1B6B] mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* Quantum Security */}
        <section className="space-y-6">
          <Card className="bg-[#232438] border-[#2A2B3F] p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-[#00E5FF] to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <Shield className="w-12 h-12 text-[#00E5FF]" />
                <h2 className="text-3xl font-bold">Quantum Security</h2>
              </div>
              <p className="text-xl text-gray-300 mb-8">
                Military-grade protection utilizing quantum encryption protocols and advanced threat detection.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Quantum Encryption',
                    description: 'Unbreakable encryption using quantum mechanical principles'
                  },
                  {
                    title: 'Neural Firewall',
                    description: 'AI-powered defense system that adapts to new threats'
                  },
                  {
                    title: 'Zero-Trust Architecture',
                    description: 'Continuous verification of every system access'
                  }
                ].map((feature, index) => (
                  <div key={index} className="p-4 bg-[#2A2B3F] rounded-lg">
                    <h3 className="text-lg font-bold text-[#00E5FF] mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* Synthetic Intelligence */}
        <section className="space-y-6">
          <Card className="bg-[#232438] border-[#2A2B3F] p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-[#A742FF] to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <Cpu className="w-12 h-12 text-[#A742FF]" />
                <h2 className="text-3xl font-bold">Synthetic Intelligence</h2>
              </div>
              <p className="text-xl text-gray-300 mb-8">
                Next-generation computational architecture combining traditional processing with AI acceleration.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Hybrid Processing',
                    description: 'Seamless integration of classical and quantum computing'
                  },
                  {
                    title: 'Neural Optimization',
                    description: 'Self-optimizing systems for maximum performance'
                  },
                  {
                    title: 'Distributed Intelligence',
                    description: 'Decentralized processing across neural networks'
                  }
                ].map((feature, index) => (
                  <div key={index} className="p-4 bg-[#2A2B3F] rounded-lg">
                    <h3 className="text-lg font-bold text-[#A742FF] mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>
      </motion.div>
    </div>
  );
}