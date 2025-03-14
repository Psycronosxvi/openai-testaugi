'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Basic access to AUGI features',
    features: [
      '30 minutes daily chat time',
      'Basic neural processing',
      'Standard response time',
      'Community support'
    ],
    color: '#00E5FF'
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: 'monthly',
    description: 'Enhanced capabilities and priority access',
    features: [
      'Unlimited chat time',
      'Advanced neural processing',
      'Priority response time',
      'Dedicated support',
      'Custom avatar uploads',
      'Advanced security features',
      'API access',
      'Chat history export'
    ],
    color: '#FF1B6B'
  }
];

export default function PricingPage() {
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
          <h1 className="text-4xl font-bold text-[#00E5FF]">Upgrade AUGI</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className="bg-[#232438] border-[#2A2B3F] p-8 relative overflow-hidden group"
            >
              <div
                className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                style={{
                  background: `linear-gradient(45deg, transparent, ${plan.color})`
                }}
              />
              
              <div className="relative z-10">
                <h2 className="text-2xl font-bold" style={{ color: plan.color }}>
                  {plan.name}
                </h2>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="ml-2 text-gray-400">/{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-gray-400">{plan.description}</p>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5" style={{ color: plan.color }} />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full mt-8 relative overflow-hidden group"
                  style={{
                    backgroundColor: plan.color,
                    color: 'white'
                  }}
                  onClick={() => router.push('/settings')}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {plan.name === 'Premium' ? (
                      <>
                        Upgrade Now
                        <Zap className="w-4 h-4" />
                      </>
                    ) : (
                      'Current Plan'
                    )}
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{
                      background: `linear-gradient(45deg, transparent, white)`
                    }}
                  />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}