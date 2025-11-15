"use client";

import { stories } from "../../data/stories";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StoryViewer() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const story = stories.find((s) => s.user.id === id);

  if (!story) return <div className="text-white">Story not found</div>;

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  // Unique viewer ID
  const viewerId =
    "device_" +
    (typeof window !== "undefined"
      ? window.crypto.randomUUID()
      : "0");

  useEffect(() => {
    if (typeof window === "undefined") return;

    let views = JSON.parse(localStorage.getItem("uniqueStoryViews") || "{}");

    if (!views[story.user.id]) {
      views[story.user.id] = [];
    }

    if (!views[story.user.id].includes(viewerId)) {
      views[story.user.id].push(viewerId);
      localStorage.setItem("uniqueStoryViews", JSON.stringify(views));
    }

    setViewCount(views[story.user.id].length);
  }, []);

  // Progress bar
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
      router.push("/");
    }
  };

  const prevStory = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
    }
  };

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden">

      {/* Full image */}
      <Image
        src={story.items[current].mediaUrl}
        alt="story"
        fill
        unoptimized
        className="object-cover"
      />

      {/* Progress bars */}
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

      {/* Tap zones */}
      <div className="absolute left-0 w-1/2 h-full z-50" onClick={prevStory}></div>
      <div className="absolute right-0 w-1/2 h-full z-50" onClick={nextStory}></div>

      {/* Viewer count */}
      <div className="absolute bottom-8 text-center w-full z-50 text-sm">
        Viewed by: {viewCount}
      </div>
    </div>
  );
}
