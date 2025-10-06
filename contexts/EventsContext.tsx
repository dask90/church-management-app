"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Event } from "../types";

interface EventsContextType {
  events: Event[];
  addEvent: (event: Omit<Event, "id" | "createdAt" | "updatedAt">) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEvent: (id: string) => Event | undefined;
  isLoading: boolean;
  upcomingEvents: Event[];
  pastEvents: Event[];
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load events from localStorage on initial render
  useEffect(() => {
    const loadEvents = () => {
      try {
        const storedEvents = localStorage.getItem("church-events");
        if (storedEvents) {
          setEvents(JSON.parse(storedEvents));
        } else {
          // Initialize with sample data
          const sampleEvents: Event[] = [
            {
              id: "1",
              title: "Sunday Worship Service",
              description:
                "Join us for our weekly Sunday worship service with communion",
              date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
              startTime: "10:00",
              endTime: "12:00",
              venue: "Main Sanctuary",
              organizer: "Pastor John",
              type: "service",
              capacity: 300,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              id: "2",
              title: "Youth Fellowship",
              description:
                "Monthly youth gathering with games, worship, and Bible study",
              date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
              startTime: "18:00",
              endTime: "20:00",
              venue: "Youth Hall",
              organizer: "Youth Pastor Mike",
              type: "social",
              capacity: 100,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ];
          setEvents(sampleEvents);
          localStorage.setItem("church-events", JSON.stringify(sampleEvents));
        }
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Save to localStorage whenever events change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("church-events", JSON.stringify(events));
    }
  }, [events, isLoading]);

  const addEvent = (
    eventData: Omit<Event, "id" | "createdAt" | "updatedAt">
  ) => {
    const newEvent: Event = {
      ...eventData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  };

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? { ...event, ...updates, updatedAt: new Date() }
          : event
      )
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const getEvent = (id: string) => {
    return events.find((event) => event.id === id);
  };

  // Calculate derived data
  const now = new Date();
  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = events
    .filter((event) => new Date(event.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <EventsContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        getEvent,
        isLoading,
        upcomingEvents,
        pastEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
}
