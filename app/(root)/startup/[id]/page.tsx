import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import View from "@/components/View";
// import View from "@/components/View";

const md = markdownit();

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  // Parallel  data  fetching
  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);
  if (!post) return notFound();

  const parseContent = md.render(post?.pitch || " ");
  return (
    <>
      <section className="pink_container !min-h-[230px] !py-12">
        <p className="tag mb-6">{formatDate(post?._createdAt)}</p>
        <h1 className="heading mb-4 md:text-4xl">{post.title}</h1>
        <p className="sub-heading !max-w-4xl mx-auto text-lg leading-relaxed">
          {post.description}
        </p>
      </section>

      <section>
        <img
          src={post.image}
          alt="thumbnail"
          className="w-[90%] mx-auto my-5 h-auto rounded-xl"
        />

        <div className="space-y-8 mt-12 max-w-4xl mx-auto px-4">
          <div className="flex flex-row justify-between items-center">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-4 items-center group"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg transition-transform group-hover:scale-105"
              />
              <div>
                <p className="text-20-medium group-hover:text-primary transition-colors">
                  {post.author.name}
                </p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.name}
                </p>
              </div>
            </Link>
            <p
              className="bg-primary/10 rounded-full text-center font-semibold
             text-primary px-6 py-2 transition-colors hover:bg-primary/20"
            >
              {post.category}
            </p>
          </div>
          <p className="text-30-bold border-b border-black/10 pb-4">
            Pitch Details
          </p>
          {parseContent ? (
            <article
              className="prose max-w-4xl font-work-sans prose-headings:font-semibold prose-p:text-base prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-black prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: parseContent }}
            />
          ) : (
            <p className="text-black-300 text-center py-8">
              No Details Provided
            </p>
          )}
        </div>

        <hr className="divider" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-30-bold border-b border-black/10 pb-4">
              Editor Picks
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editorPosts?.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
