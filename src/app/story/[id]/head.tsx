import { stories } from "../../data/stories";

export default function Head({ params }: any) {
  const story = stories.find((s) => s.user.id === params.id)!;

  return (
    <>
      <title>{story.user.name}'s Story</title>
      <meta name="description" content="Instagram-like story viewer" />

      <meta property="og:title" content={`${story.user.name}'s Story`} />
      <meta property="og:description" content="View story preview" />
      <meta property="og:image" content={story.items[0].mediaUrl} />
      <meta property="og:type" content="website" />
    </>
  );
}
