import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { auth } from "../auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  // Server-side logging in Next.js
  if (session?.id) {
    console.log("Session ID:", session.id);
  } else {
    console.log("No active session");
  }

  //Fetching Data from sanity schema.
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <div>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          {" "}
          Submit Ideas, Vote of Pitches, and get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Results for ${query}` : "Latest Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts && posts.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Results Found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </div>
  );
}
