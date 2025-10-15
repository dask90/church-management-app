"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AttendanceRecord, Service } from "@/types";

interface AttendanceContextType {
  attendanceRecords: AttendanceRecord[];
  services: Service[];
  markAttendance: (records: Omit<AttendanceRecord, "id">[]) => void;
  createService: (
    service: Omit<Service, "id" | "totalPresent" | "totalMembers">
  ) => Service;
  getMemberAttendance: (memberId: string) => AttendanceRecord[];
  getServiceAttendance: (serviceId: string) => AttendanceRecord[];
  getAttendanceStats: (totalMembers: number) => {
    totalServices: number;
    averageAttendance: number;
    recentAttendance: { date: string; present: number; total: number }[];
  };
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(
  undefined
);

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const storedRecords = localStorage.getItem("church-attendance");
        const storedServices = localStorage.getItem("church-services");

        if (storedRecords) setAttendanceRecords(JSON.parse(storedRecords));
        if (storedServices) setServices(JSON.parse(storedServices));
      } catch (error) {
        console.error("Error loading attendance data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(
        "church-attendance",
        JSON.stringify(attendanceRecords)
      );
      localStorage.setItem("church-services", JSON.stringify(services));
    }
  }, [attendanceRecords, services, isLoading]);

  const markAttendance = (records: Omit<AttendanceRecord, "id">[]) => {
    const newRecords: AttendanceRecord[] = records.map((record) => ({
      ...record,
      id: Math.random().toString(36).substr(2, 9),
    }));
    setAttendanceRecords((prev) => [...prev, ...newRecords]);
  };

  const createService = (
    serviceData: Omit<Service, "id" | "totalPresent" | "totalMembers">
  ): Service => {
    const newService: Service = {
      ...serviceData,
      id: Math.random().toString(36).substr(2, 9),
      totalPresent: 0,
      totalMembers: 0,
    };
    setServices((prev) => [...prev, newService]);
    return newService;
  };

  const getMemberAttendance = (memberId: string): AttendanceRecord[] =>
    attendanceRecords.filter((record) => record.memberId === memberId);

  const getServiceAttendance = (serviceId: string): AttendanceRecord[] =>
    attendanceRecords.filter((record) => {
      const service = services.find((s) => s.id === serviceId);
      return (
        service &&
        record.serviceDate === service.date &&
        record.serviceType === service.type
      );
    });

  const getAttendanceStats = (totalMembers: number) => {
    const totalServices = services.length;
    const totalPresent = attendanceRecords.filter((r) => r.present).length;

    const averageAttendance =
      totalServices > 0 && totalMembers > 0
        ? Math.round((totalPresent / (totalServices * totalMembers)) * 100)
        : 0;

    const recentServices = services
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4);

    const recentAttendance = recentServices.map((service) => {
      const serviceRecords = getServiceAttendance(service.id);
      const present = serviceRecords.filter((r) => r.present).length;
      const total = serviceRecords.length;

      return {
        date: new Date(service.date).toLocaleDateString(),
        present,
        total,
      };
    });

    return {
      totalServices,
      averageAttendance,
      recentAttendance,
    };
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendanceRecords,
        services,
        markAttendance,
        createService,
        getMemberAttendance,
        getServiceAttendance,
        getAttendanceStats,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (context === undefined)
    throw new Error("useAttendance must be used within an AttendanceProvider");
  return context;
}
