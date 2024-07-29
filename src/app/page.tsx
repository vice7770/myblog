import Link from "next/link";
import { CardWithForm } from "~/components/CardWithForm";
import Hero from "~/components/Hero";
import { Button } from "~/components/ui/button";
import { WeatherChart } from "~/components/WeatherChart";
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
        <div className="grid grid-cols-1 gap-4 md:gap-8 w-full">
          <div className="flex justify-center items-center w-full space-x-4">
            <Button className="mb-2 h-[50px] w-[250px] rounded-3xl bg-blue-500 px-4 py-2 text-lg text-white">
              Overview
            </Button>        
            <Button className="mb-2 h-[50px] w-[250px] rounded-3xl bg-blue-500 px-4 py-2 text-lg text-white">
              Show me the weather
            </Button>
          </div>
          <div className=" flex justify-center items-center h-[500px] w-full rounded-xl bg-gradient-to-br from-surface-brand to-[#3b5998] p-xl mt-[76px]">
           <WeatherChart />
          </div>
        </div>
      </div>
    </main>
  );
}
