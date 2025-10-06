"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Donation, DonationSummary } from "@/types";

interface DonationsContextType {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, "id">) => void;
  updateDonation: (id: string, updates: Partial<Donation>) => void;
  deleteDonation: (id: string) => void;
  getMemberDonations: (memberId: string) => Donation[];
  getDonationSummary: () => DonationSummary;
  isLoading: boolean;
}

const DonationsContext = createContext<DonationsContextType | undefined>(
  undefined
);

export function DonationsProvider({ children }: { children: ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const storedDonations = localStorage.getItem("church-donations");
        if (storedDonations) {
          setDonations(JSON.parse(storedDonations));
        } else {
          // Add sample donations for demonstration
          const sampleDonations: Donation[] = [
            {
              id: "1",
              memberId: "1",
              amount: 100,
              type: "tithe",
              date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              method: "cash",
              description: "Weekly tithe",
              recordedBy: "1",
              status: "completed",
            },
            {
              id: "2",
              memberId: "2",
              amount: 50,
              type: "offering",
              date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
              method: "check",
              checkNumber: "12345",
              description: "Thanksgiving offering",
              recordedBy: "1",
              status: "completed",
            },
            {
              id: "3",
              memberId: "1",
              amount: 200,
              type: "building",
              date: new Date(),
              method: "online",
              description: "Building fund donation",
              recordedBy: "1",
              status: "completed",
            },
          ];
          setDonations(sampleDonations);
          localStorage.setItem(
            "church-donations",
            JSON.stringify(sampleDonations)
          );
        }
      } catch (error) {
        console.error("Error loading donations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("church-donations", JSON.stringify(donations));
    }
  }, [donations, isLoading]);

  const addDonation = (donationData: Omit<Donation, "id">) => {
    const newDonation: Donation = {
      ...donationData,
      id: Math.random().toString(36).substr(2, 9),
    };

    setDonations((prev) => [...prev, newDonation]);
    return newDonation;
  };

  const updateDonation = (id: string, updates: Partial<Donation>) => {
    setDonations((prev) =>
      prev.map((donation) =>
        donation.id === id ? { ...donation, ...updates } : donation
      )
    );
  };

  const deleteDonation = (id: string) => {
    setDonations((prev) => prev.filter((donation) => donation.id !== id));
  };

  const getMemberDonations = (memberId: string): Donation[] => {
    return donations.filter((donation) => donation.memberId === memberId);
  };

  const getDonationSummary = (): DonationSummary => {
    const totalDonations = donations.reduce(
      (sum, donation) => sum + donation.amount,
      0
    );
    const totalTithes = donations
      .filter((d) => d.type === "tithe")
      .reduce((sum, donation) => sum + donation.amount, 0);
    const totalOfferings = donations
      .filter((d) => d.type === "offering")
      .reduce((sum, donation) => sum + donation.amount, 0);
    const totalPledges = donations
      .filter((d) => d.type === "pledge")
      .reduce((sum, donation) => sum + donation.amount, 0);

    // Monthly breakdown (last 6 months)
    const monthlyBreakdown = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });

      const monthDonations = donations.filter((d) => {
        const donationDate = new Date(d.date);
        return (
          donationDate.getMonth() === date.getMonth() &&
          donationDate.getFullYear() === date.getFullYear()
        );
      });

      const amount = monthDonations.reduce((sum, d) => sum + d.amount, 0);

      return { month: monthKey, amount };
    }).reverse();

    // Recent donations (last 5)
    const recentDonations = donations
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    // Top donors
    const donorMap = donations.reduce((acc, donation) => {
      if (!acc[donation.memberId]) {
        acc[donation.memberId] = 0;
      }
      acc[donation.memberId] += donation.amount;
      return acc;
    }, {} as { [key: string]: number });

    const topDonors = Object.entries(donorMap)
      .map(([memberId, total]) => ({ memberId, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    return {
      totalDonations,
      totalTithes,
      totalOfferings,
      totalPledges,
      monthlyBreakdown,
      recentDonations,
      topDonors,
    };
  };

  return (
    <DonationsContext.Provider
      value={{
        donations,
        addDonation,
        updateDonation,
        deleteDonation,
        getMemberDonations,
        getDonationSummary,
        isLoading,
      }}
    >
      {children}
    </DonationsContext.Provider>
  );
}

export function useDonations() {
  const context = useContext(DonationsContext);
  if (context === undefined) {
    throw new Error("useDonations must be used within a DonationsProvider");
  }
  return context;
}
