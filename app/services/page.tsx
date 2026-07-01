'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Brain, Cpu, Network, HardDrive, Lock, Wrench, Code, Server, Cloud, Bot, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';

interface Service {
  id: string;
  icon: any;
  name: string;
  description: string;
  features: string[];
  pricing: {
    monthly?: number;
    yearly?: number;
    oneTime?: number;
  };
  category: 'security' | 'ai' | 'infrastructure';
}

const services: Service[] = [
  {
    id: 'quantum-security',
    icon: Shield,
    name: 'Quantum Security Suite',
    description: 'Military-grade protection with quantum encryption protocols',
    features: [
      'Quantum Encryption',
      '24/7 AI Monitoring',
      'Neural Threat Detection',
      'Zero-Day Protection',
      'Incident Response Team'
    ],
    pricing: {
      monthly: 299.99,
      yearly: 2999.99
    },
    category: 'security'
  },
  {
    id: 'neural-ai',
    icon: Brain,
    name: 'Neural AI Integration',
    description: 'Advanced AI solutions powered by neural networks',
    features: [
      'Custom AI Models',
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Analytics',
      'AI Training Pipeline'
    ],
    pricing: {
      monthly: 499.99,
      yearly: 4999.99
    },
    category: 'ai'
  },
  {
    id: 'cyber-defense',
    icon: Lock,
    name: 'Advanced Cyber Defense',
    description: 'Comprehensive cybersecurity protection system',
    features: [
      'Firewall Management',
      'Penetration Testing',
      'Security Audits',
      'Employee Training',
      'Compliance Management'
    ],
    pricing: {
      monthly: 199.99,
      yearly: 1999.99
    },
    category: 'security'
  },
  {
    id: 'cloud-infrastructure',
    icon: Cloud,
    name: 'Quantum Cloud Infrastructure',
    description: 'Next-gen cloud solutions with quantum computing integration',
    features: [
      'Quantum Computing Access',
      'Hybrid Cloud Setup',
      'Auto-scaling',
      'Disaster Recovery',
      'Performance Optimization'
    ],
    pricing: {
      monthly: 399.99,
      yearly: 3999.99
    },
    category: 'infrastructure'
  },
  {
    id: 'network-optimization',
    icon: Network,
    name: 'Neural Network Optimization',
    description: 'AI-driven network performance enhancement',
    features: [
      'Traffic Analysis',
      'Load Balancing',
      'Bandwidth Optimization',
      'Latency Reduction',
      'Network Security'
    ],
    pricing: {
      monthly: 249.99,
      yearly: 2499.99
    },
    category: 'infrastructure'
  },
  {
    id: 'ai-automation',
    icon: Bot,
    name: 'AI Process Automation',
    description: 'Intelligent automation for business processes',
    features: [
      'Workflow Automation',
      'Document Processing',
      'Decision Support',
      'Task Scheduling',
      'Performance Analytics'
    ],
    pricing: {
      monthly: 349.99,
      yearly: 3499.99
    },
    category: 'ai'
  },
  {
    id: 'security-audit',
    icon: AlertTriangle,
    name: 'Security Assessment',
    description: 'Comprehensive security audit and vulnerability assessment',
    features: [
      'System Analysis',
      'Vulnerability Scanning',
      'Risk Assessment',
      'Compliance Check',
      'Security Report'
    ],
    pricing: {
      oneTime: 1499.99
    },
    category: 'security'
  },
  {
    id: 'dev-consulting',
    icon: Code,
    name: 'Development Consulting',
    description: 'Expert consulting for software development projects',
    features: [
      'Architecture Review',
      'Code Optimization',
      'Best Practices',
      'Performance Tuning',
      'Security Review'
    ],
    pricing: {
      oneTime: 999.99
    },
    category: 'infrastructure'
  }
];

export default function ServicesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const handleServiceClick = useCallback((service: Service) => {
    setSelectedService(service);
  }, []);

  const handlePurchase = useCallback((service: Service) => {
    if (!user) {
      router.push('/sign-in');
      return;
    }
    // Handle purchase logic
    console.log('Purchasing service:', service);
  }, [user, router]);

  const handleConsultation = useCallback((service: Service) => {
    if (!user) {
      router.push('/sign-in');
      return;
    }
    // Handle consultation booking
    console.log('Booking consultation for:', service);
  }, [user, router]);

  return (
    <div className="min-h-screen bg-[#1A1B2E] p-6 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/dashboard')}
            className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80 text-[#00E5FF]"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-4xl font-bold text-[#00E5FF]">Our Services</h1>
        </div>
        
        {/* Category Filter */}
        <div className="flex gap-4 flex-wrap">
          {['all', 'security', 'ai', 'infrastructure'].map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? 'bg-[#FF1B6B] hover:bg-[#FF1B6B]/80'
                  : 'bg-[#2A2B3F] hover:bg-[#2A2B3F]/80'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex items-center gap-4 justify-end">
          <span className="text-gray-400">Billing Cycle:</span>
          <div className="flex gap-2">
            <Button
              onClick={() => setBillingCycle('monthly')}
              className={`${
                billingCycle === 'monthly'
                  ? 'bg-[#FF1B6B] hover:bg-[#FF1B6B]/80'
                  : 'bg-[#2A2B3F] hover:bg-[#2A2B3F]/80'
              }`}
            >
              Monthly
            </Button>
            <Button
              onClick={() => setBillingCycle('yearly')}
              className={`${
                billingCycle === 'yearly'
                  ? 'bg-[#FF1B6B] hover:bg-[#FF1B6B]/80'
                  : 'bg-[#2A2B3F] hover:bg-[#2A2B3F]/80'
              }`}
            >
              Yearly (Save 15%)
            </Button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className="bg-[#232438] border-[#2A2B3F] p-6 relative overflow-hidden group cursor-pointer"
                onClick={() => handleServiceClick(service)}
              >
                <div className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20 bg-gradient-to-r from-[#FF1B6B] to-[#00E5FF]" />
                
                <service.icon className="w-8 h-8 mb-4 text-[#00E5FF]" />
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-300">
                      <Lock className="w-4 h-4 mr-2 text-[#FF1B6B]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  {service.pricing.oneTime ? (
                    <div className="text-2xl font-bold text-[#00E5FF]">
                      ${service.pricing.oneTime.toFixed(2)}
                      <span className="text-sm text-gray-400 ml-2">one-time</span>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-[#00E5FF]">
                      ${(billingCycle === 'yearly' 
                        ? service.pricing.yearly! / 12 
                        : service.pricing.monthly!
                      ).toFixed(2)}
                      <span className="text-sm text-gray-400 ml-2">/month</span>
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePurchase(service);
                      }}
                      className="flex-1 bg-[#FF1B6B] hover:bg-[#FF1B6B]/80"
                    >
                      Get Started
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConsultation(service);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Book Consultation
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Selected Service Modal */}
        {selectedService && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <Card className="bg-[#232438] border-[#2A2B3F] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#00E5FF] mb-2">
                    {selectedService.name}
                  </h2>
                  <p className="text-gray-400">{selectedService.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedService(null)}
                  className="bg-[#2A2B3F] hover:bg-[#2A2B3F]/80"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-3">Features</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <Lock className="w-4 h-4 mr-2 text-[#FF1B6B]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3">Pricing</h3>
                  {selectedService.pricing.oneTime ? (
                    <div className="text-3xl font-bold text-[#00E5FF]">
                      ${selectedService.pricing.oneTime.toFixed(2)}
                      <span className="text-sm text-gray-400 ml-2">one-time</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-[#00E5FF]">
                        ${selectedService.pricing.monthly!.toFixed(2)}
                        <span className="text-sm text-gray-400 ml-2">/month</span>
                      </div>
                      <div className="text-xl font-bold text-[#00E5FF]">
                        ${selectedService.pricing.yearly!.toFixed(2)}
                        <span className="text-sm text-gray-400 ml-2">/year</span>
                        <span className="text-sm text-emerald-400 ml-2">Save 15%</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-8">
                  <Button
                    onClick={() => handlePurchase(selectedService)}
                    className="flex-1 bg-[#FF1B6B] hover:bg-[#FF1B6B]/80"
                  >
                    Get Started Now
                  </Button>
                  <Button
                    onClick={() => handleConsultation(selectedService)}
                    variant="outline"
                    className="flex-1"
                  >
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}