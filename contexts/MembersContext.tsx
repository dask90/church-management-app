"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Member } from "../types";

interface MembersContextType {
  members: Member[];
  addMember: (member: Omit<Member, "id">) => void;
  updateMember: (id: string, updates: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  isLoading: boolean;
  totalMembers: number;
  recentMembers: Member[];
}

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export function MembersProvider({ children }: { children: ReactNode }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load members from localStorage on initial render
  useEffect(() => {
    const loadMembers = () => {
      try {
        const storedMembers = localStorage.getItem("church-members");
        if (storedMembers) {
          setMembers(JSON.parse(storedMembers));
        } else {
          // Initialize with some sample data
          const sampleMembers: Member[] = [
            {
              id: "1",
              firstName: "John",
              lastName: "Doe",
              email: "john@church.org",
              phone: "+1234567890",
              branch: "Main Campus", // NEW
              address: "123 Main St, City, State 12345", // NEW
              birthDate: new Date("1985-05-15"), // NEW
              maritalStatus: "married", // NEW
              occupation: "Software Engineer", // NEW
              joinDate: new Date("2024-01-15"),
              familyMembers: [],
              groups: ["Worship Team"],
              attendance: [],
            },
          ];
          setMembers(sampleMembers);
          localStorage.setItem("church-members", JSON.stringify(sampleMembers));
        }
      } catch (error) {
        console.error("Error loading members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMembers();
  }, []);

  // Save to localStorage whenever members change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("church-members", JSON.stringify(members));
    }
  }, [members, isLoading]);

  const addMember = (memberData: Omit<Member, "id">) => {
    const newMember: Member = {
      ...memberData,
      id: Math.random().toString(36).substr(2, 9), // Simple ID generation
      joinDate: new Date(),
      familyMembers: memberData.familyMembers || [],
      groups: memberData.groups || [],
      attendance: memberData.attendance || [],
    };

    setMembers((prev) => [...prev, newMember]);
    return newMember;
  };

  const updateMember = (id: string, updates: Partial<Member>) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, ...updates } : member
      )
    );
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  // Calculate derived data
  const totalMembers = members.length;
  const recentMembers = members
    .sort(
      (a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
    )
    .slice(0, 5);

  return (
    <MembersContext.Provider
      value={{
        members,
        addMember,
        updateMember,
        deleteMember,
        isLoading,
        totalMembers,
        recentMembers,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
}

export function useMembers() {
  const context = useContext(MembersContext);
  if (context === undefined) {
    throw new Error("useMembers must be used within a MembersProvider");
  }
  return context;
}
