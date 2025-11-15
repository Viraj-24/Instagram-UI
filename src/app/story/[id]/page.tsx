"use client";

import { stories } from "../../data/stories";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function StoryViewer({ params }: { params: { id: string } }) {
  const { id } = params;

  const story = stories.find((s) => s.user.id === id)!;

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  // 👉 Get or create device ID (only once per browser)
  const getDeviceId = () => {
    if (typeof window === "undefined") return "server";

    let deviceId = localStorage.getItem("deviceId");

    if (!deviceId) {
      deviceId = "device_" + crypto.randomUUID();
      localStorage.setItem("deviceId", deviceId);
    }

    return deviceId;
  };

  const viewerId = getDeviceId();

  // ⭐ Unique View Counter
  useEffect(() => {
    if (typeof window === "undefined") return;

    let views = JSON.parse(localStorage.getItem("uniqueStoryViews") || "{}");

    if (!views[story.user.id]) {
      views[story.user.id] = [];
    }

    // Add viewer only if new
    if (!views[story.user.id].includes(viewerId)) {
      views[story.user.id].push(viewerId);
      localStorage.setItem("uniqueStoryViews", JSON.stringify(views));
    }

    setViewCount(views[story.user.id].length);
  }, []);

  // Auto progress bar
  useEffect(() => {
    setProgress(0);

    const duration = story.items[current]?.duration ?? 2000;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          nextStory();
          return 0;
        }
        return p + 1;
      });
    }, duration / 100);

    return () => clearInterval(interval);
  }, [current]);

  const nextStory = () => {
    if (current < story.items.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      window.location.href = "/";
    }
  };

  const prevStory = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden">

      {/* Full Image */}
      {story.items[current] && (
        <div className="absolute inset-0 z-10">
          <Image
            src={story.items[current].mediaUrl}
            alt="story"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      )}

      {/* Progress Bars */}
      <div className="absolute top-4 left-4 right-4 z-50 flex gap-2">
        {story.items.map((_, i) => (
          <div key={i} className="h-1 w-full bg-white/20 rounded">
            <div
              className="h-full bg-white rounded"
              style={{
                width:
                  i === current ? `${progress}%` : i < current ? "100%" : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Tap Zones */}
      <div className="absolute left-0 w-1/2 h-full z-50" onClick={prevStory}></div>
      <div className="absolute right-0 w-1/2 h-full z-50" onClick={nextStory}></div>

      {/* Viewer Counter */}
      <div className="absolute bottom-8 text-center w-full z-50 text-sm">
        Viewed by: {viewCount}
      </div>
    </div>
  );
}
