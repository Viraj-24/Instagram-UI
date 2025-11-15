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
  if (!story) return <div className="text-white p-4">Story not found</div>;

  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  
  const viewerId =
    "device_" + (typeof window !== "undefined" ? crypto.randomUUID() : "_server");

  
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
  useEffect(() => {
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          nextStory();
          return 0;
        }
        return p + 1;
      });
    }, story.items[current].duration / 100);

    return () => clearInterval(interval);
  }, [current]);

  const nextStory = () => {
    if (current < story.items.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      const index = stories.findIndex((s) => s.user.id === id);
      const next = stories[index + 1];

      if (next) router.push(`/story/${next.user.id}`);
      else router.push("/");
    }
  };

  const prevStory = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
    }
  };

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden">

      
      {story.items[current] && (
        <Image
          src={story.items[current].mediaUrl}
          alt="story"
          fill
          unoptimized
          className="object-cover"
        />
      )}

      
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

      <div className="absolute top-10 left-4 z-[60] flex items-center gap-3">
        <Image
          src={story.user.avatar}
          width={40}
          height={40}
          alt="avatar"
          className="rounded-full border border-white/40 object-cover"
        />

        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-sm">{story.user.name}</span>
          <span className="text-xs text-gray-300">
            {Math.floor(
              (Date.now() - new Date(story.createdAt).getTime()) / 60000
            )}{" "}
            min ago
          </span>
        </div>
      </div>

    
      <div
        onClick={() => router.push("/")}
        className="absolute top-10 right-4 z-[60] text-3xl font-bold cursor-pointer"
      >
        ×
      </div>

      
      <div className="absolute left-0 w-1/2 h-full z-40" onClick={prevStory} />
      <div className="absolute right-0 w-1/2 h-full z-40" onClick={nextStory} />

      
      <div className="absolute bottom-20 w-full text-center text-sm z-50">
        Viewed by: {viewCount}
      </div>

      
      <div className="absolute bottom-4 left-4 right-4 z-[60] flex items-center gap-3">
        <div className="flex-1 bg-white/20 text-white px-4 py-2 rounded-full text-sm opacity-90">
          Send message...
        </div>

        <div className="flex gap-2 text-2xl">
          <span>❤️</span>
          <span>😂</span>
          <span>🔥</span>
          <span>😮</span>
        </div>
      </div>
    </div>
  );
}
