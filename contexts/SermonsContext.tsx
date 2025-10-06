"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Sermon } from "@/types";

interface SermonsContextType {
  sermons: Sermon[];
  addSermon: (sermon: Omit<Sermon, "id" | "createdAt" | "updatedAt">) => void;
  updateSermon: (id: string, updates: Partial<Sermon>) => void;
  deleteSermon: (id: string) => void;
  isLoading: boolean;
}

const SermonsContext = createContext<SermonsContextType | undefined>(undefined);

export function SermonsProvider({ children }: { children: ReactNode }) {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const storedSermons = localStorage.getItem("church-sermons");
        if (storedSermons) {
          setSermons(JSON.parse(storedSermons));
        } else {
          // Add sample sermons for demonstration
          const sampleSermons: Sermon[] = [
            {
              id: "1",
              title: "The Grace of God",
              preacher: "Pastor John Smith",
              date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              description: "Exploring the depths of God's grace in our lives.",
              mediaUrl: "https://example.com/sermon1",
              mediaType: "audio",
              duration: 45,
              series: "Grace Series",
              tags: ["grace", "salvation"],
              createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            },
            {
              id: "2",
              title: "Faith in Action",
              preacher: "Pastor Jane Doe",
              date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
              description: "How to live out our faith in daily life.",
              mediaUrl: "https://example.com/sermon2",
              mediaType: "video",
              duration: 52,
              series: "Faith Series",
              tags: ["faith", "works"],
              createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
              updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            },
          ];
          setSermons(sampleSermons);
          localStorage.setItem("church-sermons", JSON.stringify(sampleSermons));
        }
      } catch (error) {
        console.error("Error loading sermons:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("church-sermons", JSON.stringify(sermons));
    }
  }, [sermons, isLoading]);

  const addSermon = (
    sermonData: Omit<Sermon, "id" | "createdAt" | "updatedAt">
  ) => {
    const newSermon: Sermon = {
      ...sermonData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setSermons((prev) => [...prev, newSermon]);
    return newSermon;
  };

  const updateSermon = (id: string, updates: Partial<Sermon>) => {
    setSermons((prev) =>
      prev.map((sermon) =>
        sermon.id === id
          ? { ...sermon, ...updates, updatedAt: new Date() }
          : sermon
      )
    );
  };

  const deleteSermon = (id: string) => {
    setSermons((prev) => prev.filter((sermon) => sermon.id !== id));
  };

  return (
    <SermonsContext.Provider
      value={{
        sermons,
        addSermon,
        updateSermon,
        deleteSermon,
        isLoading,
      }}
    >
      {children}
    </SermonsContext.Provider>
  );
}

export function useSermons() {
  const context = useContext(SermonsContext);
  if (context === undefined) {
    throw new Error("useSermons must be used within a SermonsProvider");
  }
  return context;
}
