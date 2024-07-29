import Link from "next/link";
import Hero from "~/components/Hero";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {

  const posts = await db.query.posts.findMany();
  console.log(posts);
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#add8e6] to-[#00008b] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Hero />
        <h3 className="text-2xl font-bold">Lets play a little game</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
          <div>
          {
            posts.map((post) => {
              return (
                <div key={post.id} className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
                  <h3 className="text-2xl font-bold">{post.name}</h3>
                </div>
              );
            })          
          }
          </div>
        </div>
      </div>
    </main>
  );
}
