"use client";

import { useSermons } from "@/contexts/SermonsContext";
import { useEvents } from "@/contexts/EventsContext";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
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
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/heroo.jpg"
            alt="Church background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black/90 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-6 mx-auto text-center">
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          ></motion.div>

          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-4 font-serif text-5xl font-medium leading-tight md:text-6xl"
          >
            A Church Anchored in Faith, Hope and Love
          </motion.h1>

          <motion.p
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-10 text-lg text-gray-200 md:text-xl"
          >
            Join us in worship as we grow together in the grace of Christ.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col justify-center gap-6 sm:flex-row"
          >
            <a
              href="#sermons"
              className="px-10 py-4 text-lg font-medium transition-all bg-amber-300 text-slate-900 hover:bg-amber-400 hover:scale-105"
            >
              Listen to Sermons
            </a>
            <button
              onClick={scrollToContact}
              className="px-10 py-4 text-lg font-medium transition-all border-2 border-amber-300 hover:bg-amber-300 hover:text-slate-900"
            >
              Plan Your Visit
            </button>
          </motion.div>
        </div>
      </section>

      {/* Service Times - Style 1: Modern Cards */}
      <section className="py-24 text-white bg-black">
        <div className="container px-6 mx-auto">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-5xl font-light tracking-wide">
              Service Times
            </h2>
            <div className="w-24 h-1 mx-auto mb-6 bg-amber-300"></div>
            <p className="max-w-2xl mx-auto text-xl text-gray-300">
              Join our community for spiritual growth and fellowship
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Extended Timeline line */}
              <div className="absolute hidden w-1 h-[120%] transform -translate-x-1/2 -translate-y-[10%] left-1/2 bg-amber-300 md:block"></div>

              {/* Service items with increased spacing */}
              <div className="flex flex-col items-center mb-16 md:flex-row">
                <div className="mb-8 md:w-1/2 md:pr-12 md:mb-0 md:text-right">
                  <h3 className="mb-3 text-2xl font-medium">Sunday Worship</h3>
                  <p className="text-lg text-amber-300">8:00 AM & 10:30 AM</p>
                  <p className="mt-3 text-gray-400">
                    Traditional and contemporary services
                  </p>
                </div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-black border-4 rounded-full border-amber-300">
                  <Church className="w-6 h-6 text-amber-300" />
                </div>
                <div className="mt-8 md:w-1/2 md:pl-12 md:mt-0">
                  {/* Empty for alignment */}
                </div>
              </div>

              <div className="flex flex-col items-center mb-16 md:flex-row">
                <div className="mb-8 md:w-1/2 md:pr-12 md:mb-0 md:text-right">
                  {/* Empty for alignment */}
                </div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-black border-4 rounded-full border-amber-300">
                  <Users className="w-6 h-6 text-amber-300" />
                </div>
                <div className="mt-8 md:w-1/2 md:pl-12 md:mt-0">
                  <h3 className="mb-3 text-2xl font-medium">Bible Study</h3>
                  <p className="text-lg text-amber-300">Wednesday, 7:00 PM</p>
                  <p className="mt-3 text-gray-400">
                    Deep dive into scripture with discussion
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center md:flex-row">
                <div className="mb-8 md:w-1/2 md:pr-12 md:mb-0 md:text-right">
                  <h3 className="mb-3 text-2xl font-medium">
                    Youth Fellowship
                  </h3>
                  <p className="text-lg text-amber-300">Friday, 6:30 PM</p>
                  <p className="mt-3 text-gray-400">
                    Engaging activities for young members
                  </p>
                </div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-black border-4 rounded-full border-amber-300">
                  <Music className="w-6 h-6 text-amber-300" />
                </div>
                <div className="mt-8 md:w-1/2 md:pl-12 md:mt-0">
                  {/* Empty for alignment */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Section - Style 2: Media Focused */}
      <section id="sermons" className="relative py-24 overflow-hidden bg-black">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full w-72 h-72 bg-amber-300/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rounded-full w-96 h-96 bg-amber-300/5 blur-3xl"></div>

        <div className="container relative z-10 px-4 mx-auto">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 mr-4 rotate-45 rounded-lg bg-amber-300">
                <Play className="w-6 h-6 text-black -rotate-45" />
              </div>
              <h2 className="text-5xl font-light text-white">
                RECENT <span className="text-amber-300">SERMONS</span>
              </h2>
            </div>
            <div className="w-24 h-1 mx-auto mb-6 bg-amber-300"></div>
            <p className="text-xl font-light text-gray-300">
              Spiritual nourishment for your journey
            </p>
          </div>

          {/* Loading State */}
          {loadingSermons ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-8 text-center transition-all duration-500 border group bg-gray-900/50 backdrop-blur-sm border-amber-300/30 rounded-xl hover:border-amber-300 animate-pulse"
                >
                  <div className="h-64 mb-4 bg-gray-800 rounded-lg"></div>
                  <div className="w-3/4 h-4 mx-auto mb-2 bg-gray-700 rounded"></div>
                  <div className="w-1/2 h-4 mx-auto bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : recentSermons.length > 0 ? (
            // Sermons Grid
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentSermons.map((sermon) => (
                <div
                  key={sermon.id}
                  className="p-8 text-center transition-all duration-500 border group bg-gray-900/50 backdrop-blur-sm border-amber-300/30 rounded-xl hover:border-amber-300"
                >
                  <div className="text-white">
                    <SermonCard
                      sermon={sermon}
                      onPlay={() => handlePlaySermon(sermon)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="p-8 py-20 text-center transition-all duration-500 border group bg-gray-900/50 backdrop-blur-sm border-amber-300/30 rounded-xl hover:border-amber-300">
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 transition-colors duration-300 rounded-full bg-amber-300/10 group-hover:bg-amber-300">
                <Play className="w-10 h-10 transition-colors duration-300 text-amber-300 group-hover:text-black" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white">
                No Sermons Available
              </h3>
              <p className="max-w-md mx-auto text-gray-300">
                We're preparing new spiritual messages. Please check back soon
                for updates.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Image Break Section - Style 4: Full-width Image */}
      <section className="py-0 bg-slate-800">
        <div
          className="w-full bg-center bg-cover h-100 md:h-96"
          style={{
            backgroundImage: "url('/images/pray.png')",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(15, 23, 42, 0.3)",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="flex items-center justify-center w-full h-full bg-opacity-50">
            <div className="text-center text-white">
              <h2 className="text-4xl font-light">
                Experience God&apos;s presence and be part of a family that
                grows together in faith.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section - Style 3: Elegant Timeline */}
      <section id="events" className="relative py-24 overflow-hidden bg-black">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full w-72 h-72 bg-amber-300/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rounded-full w-96 h-96 bg-amber-300/5 blur-3xl"></div>

        <div className="container relative z-10 px-4 mx-auto">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 mr-4 rotate-45 rounded-lg bg-amber-300">
                <Calendar className="w-6 h-6 text-black -rotate-45" />
              </div>
              <h2 className="text-5xl font-light text-white">
                {upcomingEvents.length > 0 ? "UPCOMING" : "RECENT"}{" "}
                <span className="text-amber-300">EVENTS</span>
              </h2>
            </div>
            <div className="w-24 h-1 mx-auto mb-6 bg-amber-300"></div>
            <p className="text-xl font-light text-gray-300">
              Stay connected with our church community
            </p>
          </div>

          {/* Loading State */}
          {loadingEvents ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-8 text-center transition-all duration-500 border group bg-gray-900/50 backdrop-blur-sm border-amber-300/30 rounded-xl hover:border-amber-300 animate-pulse"
                >
                  <div className="h-48 mb-4 bg-gray-800 rounded-lg"></div>
                  <div className="w-3/4 h-6 mx-auto mb-2 bg-gray-700 rounded"></div>
                  <div className="w-1/2 h-4 mx-auto mb-2 bg-gray-700 rounded"></div>
                  <div className="w-2/3 h-4 mx-auto bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : eventsToShow.length > 0 ? (
            // Events Grid
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {eventsToShow.map((event) => (
                <div
                  key={event.id}
                  className="p-8 text-center transition-all duration-500 border group bg-gray-900/50 backdrop-blur-sm border-amber-300/30 rounded-xl hover:border-amber-300"
                >
                  <div className="flex items-center justify-center mx-auto mb-6 transition-colors duration-300 rounded-full w-14 h-14 bg-amber-300/10 group-hover:bg-amber-300">
                    <Calendar className="w-6 h-6 transition-colors duration-300 text-amber-300 group-hover:text-black" />
                  </div>
                  <div className="text-white">
                    <EventCard event={event} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="p-8 py-20 text-center transition-all duration-500 border group bg-gray-900/50 backdrop-blur-sm border-amber-300/30 rounded-xl hover:border-amber-300">
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 transition-colors duration-300 rounded-full bg-amber-300/10 group-hover:bg-amber-300">
                <Calendar className="w-10 h-10 transition-colors duration-300 text-amber-300 group-hover:text-black" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white">
                No Events Found
              </h3>
              <p className="max-w-md mx-auto text-gray-300">
                Check back soon for upcoming events and gatherings.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact - Style 5: Minimal Contact Cards */}
      <section id="contact" className="relative py-24 overflow-hidden bg-black">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full w-72 h-72 bg-amber-300/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rounded-full w-96 h-96 bg-amber-300/5 blur-3xl"></div>

        <div className="container relative z-10 px-4 mx-auto">
          <div className="mb-20 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 mr-4 rotate-45 rounded-lg bg-amber-300">
                <MapPin className="w-6 h-6 text-black -rotate-45" />
              </div>
              <h2 className="text-5xl font-light text-white">
                GET IN <span className="text-amber-300">TOUCH</span>
              </h2>
            </div>
            <div className="w-24 h-1 mx-auto mb-6 bg-amber-300"></div>
            <p className="text-xl font-light text-gray-300">
              We'd love to hear from you and welcome you to our community
            </p>
          </div>

          <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
            <div className="p-8 text-center transition-all duration-500 border group bg-gray-900/50 backdrop-blur-sm border-amber-300/30 rounded-xl hover:border-amber-300">
              <div className="flex items-center justify-center mx-auto mb-6 transition-colors duration-300 rounded-full w-14 h-14 bg-amber-300/10 group-hover:bg-amber-300">
                <MapPin className="w-6 h-6 transition-colors duration-300 text-amber-300 group-hover:text-black" />
              </div>
              <h3 className="mb-4 text-lg font-bold text-white">
                Our Location
              </h3>
              <p className="mb-2 text-gray-300">123 Church Street</p>
              <p className="text-gray-300">City, State 12345</p>
            </div>

            <div className="p-8 text-center transition-all duration-500 border group bg-gray-900/50 backdrop-blur-sm border-amber-300/30 rounded-xl hover:border-amber-300">
              <div className="flex items-center justify-center mx-auto mb-6 transition-colors duration-300 rounded-full w-14 h-14 bg-amber-300/10 group-hover:bg-amber-300">
                <Phone className="w-6 h-6 transition-colors duration-300 text-amber-300 group-hover:text-black" />
              </div>
              <h3 className="mb-4 text-lg font-bold text-white">Phone</h3>
              <p className="text-lg font-medium text-gray-300">
                (555) 123-4567
              </p>
              <p className="mt-1 text-sm text-gray-400">Mon-Fri 9AM-5PM</p>
            </div>

            <div className="p-8 text-center transition-all duration-500 border group bg-gray-900/50 backdrop-blur-sm border-amber-300/30 rounded-xl hover:border-amber-300">
              <div className="flex items-center justify-center mx-auto mb-6 transition-colors duration-300 rounded-full w-14 h-14 bg-amber-300/10 group-hover:bg-amber-300">
                <Mail className="w-6 h-6 transition-colors duration-300 text-amber-300 group-hover:text-black" />
              </div>
              <h3 className="mb-4 text-lg font-bold text-white">Email</h3>
              <p className="text-lg font-medium text-gray-300">
                info@gracechurch.com
              </p>
              <p className="mt-1 text-sm text-gray-400">24-hour response</p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-16 text-center">
            <p className="mb-8 text-gray-500">
              Have questions about our services or community?
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 overflow-hidden bg-black">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 rounded-full w-80 h-80 bg-amber-300/5 blur-3xl"></div>

        {/* Admin/Pastor Portal Access */}
        {/* Added 'text-center' here */}
        <div className="max-w-md p-4 mx-auto mb-8 text-center border rounded-lg bg-gray-900/50 backdrop-blur-sm border-amber-300/30">
          <p className="mb-3 text-sm text-gray-300">
            Are you a church administrator or pastor?
          </p>
          <a
            href="/login"
            className="inline-flex items-center px-6 py-2 text-sm font-medium text-black transition-colors duration-300 rounded-lg bg-amber-300 hover:bg-amber-400"
          >
            <span>Access Admin Portal</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        {/* Additional Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <a
            href="#sermons"
            className="transition-colors duration-300 hover:text-amber-300"
          >
            Sermons
          </a>
          <a
            href="#events"
            className="transition-colors duration-300 hover:text-amber-300"
          >
            Events
          </a>
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
