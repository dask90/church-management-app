"use client";

import { useSermons } from "@/contexts/SermonsContext";
import { useEvents } from "@/contexts/EventsContext";
import { MEDIA_TYPES } from "@/types";
import {
  Play,
  FileText,
  Clock,
  MapPin,
  User,
  Calendar,
  Phone,
  Mail,
  Map,
  Church,
  Users,
  Clock4,
  Music,
} from "lucide-react";

export default function PublicChurchWebsite() {
  const { sermons, isLoading: loadingSermons } = useSermons();
  const { upcomingEvents, pastEvents, isLoading: loadingEvents } = useEvents();

  const recentSermons = sermons.slice(0, 6);
  const eventsToShow =
    upcomingEvents.length > 0 ? upcomingEvents : pastEvents.slice(0, 6);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-16 text-white md:py-24"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
        }}
      >
        <div className="container px-4 mx-auto text-center">
          <Church className="w-16 h-16 mx-auto mb-6 text-amber-300" />
          <h1 className="mb-8 font-serif text-4xl font-bold md:text-5xl">
            Grace Church
          </h1>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#sermons"
              className="px-8 py-4 text-lg font-semibold transition-all duration-200 rounded-lg bg-amber-300 text-slate-800 hover:bg-amber-400 hover:scale-105"
            >
              Listen to Sermons
            </a>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 text-lg font-semibold text-white transition-all duration-200 border-2 rounded-lg border-amber-300 hover:bg-amber-300 hover:text-slate-800"
            >
              Plan Your Visit
            </button>
          </div>
        </div>
      </section>

      {/* Service Times - Style 1: Modern Cards */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 mx-auto text-center">
          <div className="flex items-center justify-center mb-2">
            <h2 className="text-3xl font-bold text-slate-800">Service Times</h2>
          </div>
          <p className="mb-8 text-gray-600">
            Join us for worship and fellowship
          </p>

          <div className="grid max-w-4xl grid-cols-1 gap-6 mx-auto md:grid-cols-3">
            <div className="p-8 transition-all duration-200 bg-white border-l-4 rounded-lg shadow-lg hover:shadow-xl border-amber-300">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-amber-50">
                <Church className="w-6 h-6 text-amber-300" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-800">
                Sunday Services
              </h3>
              <p className="text-gray-600">8:00 AM & 10:30 AM</p>
            </div>

            <div className="p-8 transition-all duration-200 bg-white border-l-4 rounded-lg shadow-lg hover:shadow-xl border-amber-300">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-amber-50">
                <Users className="w-6 h-6 text-amber-300" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-800">
                Bible Study
              </h3>
              <p className="text-gray-600">Wednesday, 7:00 PM</p>
            </div>

            <div className="p-8 transition-all duration-200 bg-white border-l-4 rounded-lg shadow-lg hover:shadow-xl border-amber-300">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-amber-50">
                <Music className="w-6 h-6 text-amber-300" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-800">
                Youth Service
              </h3>
              <p className="text-gray-600">Friday, 6:30 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Section - Style 2: Media Focused */}
      <section id="sermons" className="py-16 bg-slate-800">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center mb-2">
              <Play className="w-6 h-6 mr-2 text-amber-300" />
              <h2 className="text-3xl font-bold text-white">Recent Sermons</h2>
            </div>
            <p className="text-gray-300">
              Inspiring messages from our services
            </p>
          </div>

          {loadingSermons ? (
            <div className="py-8 text-center text-gray-300">
              Loading sermons...
            </div>
          ) : recentSermons.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentSermons.map((sermon) => (
                <SermonCard key={sermon.id} sermon={sermon} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center rounded-lg bg-slate-700">
              <p className="text-gray-300">No sermons available yet</p>
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-400">
              Church administrators:{" "}
              <a
                href="/login"
                className="font-medium text-amber-300 hover:text-amber-200"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Events Section - Style 3: Elegant Timeline */}
      <section id="events" className="py-16 bg-amber-50">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6 mr-2 text-slate-800" />
              <h2 className="text-3xl font-bold text-slate-800">
                {upcomingEvents.length > 0
                  ? "Upcoming Events"
                  : "Recent Events"}
              </h2>
            </div>
            <p className="text-gray-600">
              Stay connected with our church community
            </p>
          </div>

          {loadingEvents ? (
            <div className="py-8 text-center text-gray-600">
              Loading events...
            </div>
          ) : eventsToShow.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {eventsToShow.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center bg-white rounded-lg">
              <p className="text-gray-500">No events found</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Break Section - Style 4: Full-width Image */}
      <section className="py-0 bg-slate-800">
        <div
          className="w-full h-64 bg-center bg-cover md:h-96"
          style={{
            backgroundImage: "url('/community-bg.jpg')",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(15, 23, 42, 0.3)",
          }}
        >
          <div className="flex items-center justify-center w-full h-full bg-opacity-50">
            <div className="text-center text-white">
              <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                Join Our Community
              </h3>
              <p className="text-lg">Growing together in faith and love</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact - Style 5: Minimal Contact Cards */}
      <section id="contact" className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="w-6 h-6 mr-2 text-amber-300" />
              <h2 className="text-3xl font-bold text-slate-800">
                Get In Touch
              </h2>
            </div>
            <p className="text-gray-600">We'd love to hear from you</p>
          </div>

          <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
            <div className="p-6 text-center transition-all duration-200 bg-white rounded-lg shadow-md hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-amber-50">
                <MapPin className="w-6 h-6 text-amber-300" />
              </div>
              <h3 className="mb-3 font-semibold text-slate-800">Visit Us</h3>
              <p className="text-gray-600">
                123 Church Street
                <br />
                City, State 12345
              </p>
            </div>

            <div className="p-6 text-center transition-all duration-200 bg-white rounded-lg shadow-md hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-amber-50">
                <Phone className="w-6 h-6 text-amber-300" />
              </div>
              <h3 className="mb-3 font-semibold text-slate-800">Call Us</h3>
              <p className="text-gray-600">(555) 123-4567</p>
            </div>

            <div className="p-6 text-center transition-all duration-200 bg-white rounded-lg shadow-md hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-amber-50">
                <Mail className="w-6 h-6 text-amber-300" />
              </div>
              <h3 className="mb-3 font-semibold text-slate-800">Email Us</h3>
              <p className="text-gray-600">info@gracechurch.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-white bg-slate-800">
        <div className="container px-4 mx-auto text-center">
          <Church className="w-8 h-8 mx-auto mb-4 text-amber-300" />
          <p className="mb-2">
            &copy; {new Date().getFullYear()} Grace Church. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            A community of faith, hope, and love
          </p>
        </div>
      </footer>
    </div>
  );
}

function SermonCard({ sermon }: { sermon: any }) {
  const mediaType = MEDIA_TYPES.find((t) => t.value === sermon.mediaType);

  return (
    <div className="overflow-hidden transition-all duration-200 bg-white border border-gray-100 rounded-lg shadow-md hover:shadow-lg hover:scale-105">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-slate-800">
            {mediaType?.icon === "audio" && <Play className="w-3 h-3 mr-1" />}
            {mediaType?.icon === "video" && <Play className="w-3 h-3 mr-1" />}
            {mediaType?.icon === "text" && (
              <FileText className="w-3 h-3 mr-1" />
            )}
            {mediaType?.label}
          </span>
          {sermon.duration && (
            <span className="flex items-center text-sm text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              {sermon.duration} min
            </span>
          )}
        </div>

        <h3 className="mb-3 text-lg font-semibold text-slate-800 line-clamp-2">
          {sermon.title}
        </h3>

        {sermon.series && (
          <p className="mb-3 text-sm font-medium text-amber-600">
            Series: {sermon.series}
          </p>
        )}

        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {sermon.description}
        </p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2 text-amber-300" />
            <span className="mr-2 font-medium">Preacher:</span>
            <span>{sermon.preacher}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-amber-300" />
            <span className="mr-2 font-medium">Date:</span>
            <span>{new Date(sermon.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 bg-slate-50">
        {sermon.mediaType === "audio" && (
          <audio controls className="w-full rounded">
            <source src={sermon.mediaUrl} type="audio/mpeg" />
          </audio>
        )}
        {sermon.mediaType === "video" && (
          <video controls className="w-full rounded">
            <source src={sermon.mediaUrl} type="video/mp4" />
          </video>
        )}
        {sermon.mediaType === "text" && (
          <a
            href={sermon.mediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition-colors rounded-md bg-slate-800 hover:bg-slate-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            Read Sermon Text
          </a>
        )}
      </div>
    </div>
  );
}

function EventCard({ event }: { event: any }) {
  return (
    <div className="overflow-hidden transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="pr-2 text-xl font-semibold text-slate-800">
            {event.title}
          </h3>
          <div className="flex-shrink-0 p-2 rounded-full bg-amber-50">
            <Calendar className="w-4 h-4 text-amber-300" />
          </div>
        </div>

        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-amber-300" />
            <span className="font-medium">Date:</span>
            <span className="ml-2">
              {new Date(event.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-amber-300" />
            <span className="font-medium">Time:</span>
            <span className="ml-2">
              {event.startTime} - {event.endTime}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-amber-300" />
            <span className="font-medium">Venue:</span>
            <span className="ml-2">{event.venue}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2 text-amber-300" />
            <span className="font-medium">Organizer:</span>
            <span className="ml-2">{event.organizer}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
