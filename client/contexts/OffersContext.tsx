import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  usageLimit?: number;
  usedCount: number;
  targetPlants?: string[]; // plant IDs
  targetCategories?: string[];
}

interface OffersContextType {
  offers: Offer[];
  activeOffers: Offer[];
  validateOffer: (code: string, orderTotal: number) => { valid: boolean; offer?: Offer; message: string };
  applyOffer: (code: string) => void;
  getDiscountAmount: (code: string, orderTotal: number) => number;
}

const OffersContext = createContext<OffersContextType | undefined>(undefined);

export function useOffers() {
  const context = useContext(OffersContext);
  if (context === undefined) {
    throw new Error('useOffers must be used within an OffersProvider');
  }
  return context;
}

interface OffersProviderProps {
  children: ReactNode;
}

export function OffersProvider({ children }: OffersProviderProps) {
  const [offers, setOffers] = useState<Offer[]>([]);

  // Initialize offers
  useEffect(() => {
    const now = new Date();
    const defaultOffers: Offer[] = [
      {
        id: 'welcome25',
        title: 'Welcome to HerbWise!',
        description: 'Get 25% off your first order',
        code: 'WELCOME25',
        discountType: 'percentage',
        discountValue: 25,
        minOrderAmount: 30,
        startDate: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        endDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true,
        usageLimit: 1000,
        usedCount: 0
      },
      {
        id: 'flash50',
        title: 'Flash Sale - Limited Time!',
        description: '$10 off orders over $50',
        code: 'FLASH10',
        discountType: 'fixed',
        discountValue: 10,
        minOrderAmount: 50,
        startDate: now,
        endDate: new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
        isActive: true,
        usageLimit: 100,
        usedCount: 0
      },
      {
        id: 'weekend15',
        title: 'Weekend Special',
        description: '15% off weekend orders',
        code: 'WEEKEND15',
        discountType: 'percentage',
        discountValue: 15,
        startDate: getThisWeekend(),
        endDate: getNextMonday(),
        isActive: isWeekend(),
        usageLimit: 500,
        usedCount: 0
      },
      {
        id: 'immune20',
        title: 'Immune Boost Special',
        description: '20% off immune-supporting herbs',
        code: 'IMMUNE20',
        discountType: 'percentage',
        discountValue: 20,
        startDate: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        endDate: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        isActive: true,
        targetCategories: ['Immune', 'Antiviral', 'Respiratory'],
        usageLimit: 200,
        usedCount: 0
      },
      {
        id: 'bulk30',
        title: 'Bulk Order Discount',
        description: '$30 off orders over $150',
        code: 'BULK30',
        discountType: 'fixed',
        discountValue: 30,
        minOrderAmount: 150,
        startDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        endDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        isActive: true,
        usageLimit: 50,
        usedCount: 0
      }
    ];

    setOffers(defaultOffers);
  }, []);

  // Helper functions
  function getThisWeekend(): Date {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilSaturday = (6 - dayOfWeek) % 7;
    const saturday = new Date(now);
    saturday.setDate(now.getDate() + daysUntilSaturday);
    saturday.setHours(0, 0, 0, 0);
    return saturday;
  }

  function getNextMonday(): Date {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    const monday = new Date(now);
    monday.setDate(now.getDate() + daysUntilMonday);
    monday.setHours(23, 59, 59, 999);
    return monday;
  }

  function isWeekend(): boolean {
    const dayOfWeek = new Date().getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
  }

  // Get currently active offers
  const activeOffers = offers.filter(offer => {
    const now = new Date();
    return offer.isActive &&
           now >= offer.startDate &&
           now <= offer.endDate &&
           (!offer.usageLimit || offer.usedCount < offer.usageLimit);
  });

  const validateOffer = (code: string, orderTotal: number): { valid: boolean; offer?: Offer; message: string } => {
    const offer = offers.find(o => o.code.toLowerCase() === code.toLowerCase());
    
    if (!offer) {
      return { valid: false, message: 'Invalid offer code' };
    }

    const now = new Date();
    
    if (!offer.isActive) {
      return { valid: false, message: 'This offer is no longer active' };
    }

    if (now < offer.startDate) {
      return { valid: false, message: 'This offer is not yet active' };
    }

    if (now > offer.endDate) {
      return { valid: false, message: 'This offer has expired' };
    }

    if (offer.usageLimit && offer.usedCount >= offer.usageLimit) {
      return { valid: false, message: 'This offer has reached its usage limit' };
    }

    if (offer.minOrderAmount && orderTotal < offer.minOrderAmount) {
      return { 
        valid: false, 
        message: `Minimum order amount of $${offer.minOrderAmount} required for this offer` 
      };
    }

    return { valid: true, offer, message: 'Offer applied successfully!' };
  };

  const applyOffer = (code: string) => {
    const offer = offers.find(o => o.code.toLowerCase() === code.toLowerCase());
    if (offer) {
      setOffers(offers.map(o => 
        o.id === offer.id ? { ...o, usedCount: o.usedCount + 1 } : o
      ));
    }
  };

  const getDiscountAmount = (code: string, orderTotal: number): number => {
    const validation = validateOffer(code, orderTotal);
    if (!validation.valid || !validation.offer) {
      return 0;
    }

    const offer = validation.offer;
    if (offer.discountType === 'percentage') {
      return Math.round(orderTotal * (offer.discountValue / 100) * 100) / 100;
    } else {
      return Math.min(offer.discountValue, orderTotal);
    }
  };

  const value: OffersContextType = {
    offers,
    activeOffers,
    validateOffer,
    applyOffer,
    getDiscountAmount
  };

  return (
    <OffersContext.Provider value={value}>
      {children}
    </OffersContext.Provider>
  );
}
