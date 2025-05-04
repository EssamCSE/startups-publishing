import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts =[
    {
    _createdAt: new Date(),
    views: 55,
    author:{
      _id:"1",
      name: "Essam"
    },
    description:"This is a description",
    image:"https://cdn.pixabay.com/photo/2023/07/17/20/41/ai-illustration-8133524_960_720.jpg",
    category:"AI",
    title:"Title"
  },
    {
    _createdAt: new Date(),
    views: 55,
    author:{
      _id:"1",
      name: "Essam"
    },
    description:"This is a description",
    image:"https://cdn.pixabay.com/photo/2023/07/17/20/41/ai-illustration-8133524_960_720.jpg",
    category:"AI",
    title:"Title"
  },
    {
    _createdAt: new Date(),
    views: 55,
    author:{
      _id:"1",
      name: "Essam"
    },
    description:"This is a description",
    image:"https://cdn.pixabay.com/photo/2023/07/17/20/41/ai-illustration-8133524_960_720.jpg",
    category:"AI",
    title:"Title"
  },


]

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
        <SearchForm query={query}/>
      </section>


      <section className="section_container" >
        <p className="text-30-semibold">
          {query ? `Search Results for ${query}` : "Latest Startups"}
        </p>


        <ul className="mt-7 card_grid" >
          {posts?.length >0  ? (
            posts.map((post: StartupCardType, index: number)=>(
              <StartupCard key={post?._id} post={post}/>
            ))
          ):(
            <p className="no-results">No Results Found</p>
          )}
        </ul>
      </section>
    </div>
  );
}
