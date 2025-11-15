import Image from "next/image";
import Link from "next/link";
import { stories } from "./data/stories";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white relative">

      {/* TOP NAVBAR */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-white/10">
        <Image
  src="/logo.png"
  width={130}
  height={40}
  alt="Instagram Logo"
  className="object-contain mt-1"
/>


        <div className="flex gap-6 text-3xl">
          <span>🤍</span> {/* Heart */}
          <span>💬</span> {/* Message */}
        </div>
      </div>

      {/* STORIES BAR */}
      <div className="p-4 flex gap-4 overflow-x-auto no-scrollbar">
        {stories.map((story) => (
          <Link href={`/story/${story.user.id}`} key={story.user.id}>
            <div className="flex flex-col items-center cursor-pointer">
              <div className="w-[70px] h-[70px] rounded-full border-4 border-pink-500 overflow-hidden">
                <Image
                  src={story.user.avatar}
                  width={70}
                  height={70}
                  alt="avatar"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-sm mt-2">{story.user.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* POSTS FEED */}
      <div className="mt-4 space-y-10 pb-28">

        {/* POST 1 */}
        <div className="border-b border-white/10 pb-10">
          <div className="flex items-center gap-3 px-4">
            <Image
              src="/rahul.jpg"
              width={45}
              height={45}
              className="rounded-full object-cover"
              alt=""
            />
            <span className="font-semibold text-lg">Rahul</span>
          </div>

          <div className="w-full h-auto mt-3">
            <Image
              src="/rahul1.jpg"
              alt="post"
              width={800}
              height={1200}
              className="w-full object-cover"
            />
          </div>

          <div className="flex justify-between items-center px-4 py-3 text-2xl text-white/90">
            <div className="flex gap-4">
              <span>❤️</span>
              <span>💬</span>
              <span>📤</span>
            </div>
            <span>🔖</span>
          </div>

          <p className="px-4 font-semibold">120 likes</p>
          <p className="px-4 text-sm mt-1">
            <span className="font-semibold">Rahul</span> Enjoying the view 🌄
          </p>

          <p className="px-4 text-sm text-white/70 mt-1">View all 12 comments</p>
          <p className="px-4 text-sm mt-1">
            <span className="font-semibold">Sneha</span> Wow beautiful 😍
          </p>
        </div>

        {/* POST 2 */}
        <div className="border-b border-white/10 pb-10">
          <div className="flex items-center gap-3 px-4">
            <Image
              src="/sneha.jpg"
              width={45}
              height={45}
              className="rounded-full object-cover"
              alt=""
            />
            <span className="font-semibold text-lg">Sneha</span>
          </div>

          <div className="w-full h-auto mt-3">
            <Image
              src="/sneha1.jpg"
              alt="post"
              width={800}
              height={1200}
              className="w-full object-cover"
            />
          </div>

          <div className="flex justify-between items-center px-4 py-3 text-2xl text-white/90">
            <div className="flex gap-4">
              <span>❤️</span>
              <span>💬</span>
              <span>📤</span>
            </div>
            <span>🔖</span>
          </div>

          <p className="px-4 font-semibold">300 likes</p>
          <p className="px-4 text-sm mt-1">
            <span className="font-semibold">Sneha</span> Love this place 💖
          </p>

          <p className="px-4 text-sm text-white/70 mt-1">View all 18 comments</p>
          <p className="px-4 text-sm mt-1">
            <span className="font-semibold">Rahul</span> Amazing 📸
          </p>
        </div>

      </div>

      {/* BOTTOM NAVBAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 py-3 flex justify-around text-3xl">
        <span>🏠</span>
        <span>🔍</span>
        <span>➕</span>
        <span>🎬</span>
        <Image
          src="/profile.jpg"
          width={35}
          height={35}
          className="rounded-full object-cover"
          alt="profile"
        />
      </div>
    </div>
  );
}
