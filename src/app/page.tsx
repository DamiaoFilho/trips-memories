"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import TripListCard from "@/components/trip-list-card";
import { TripI } from "@/types/trips";

const trip: TripI = {
  id: "1",
  name: "Summer Vacation",
  description: "A wonderful trip to the beach with family.",
  createdAt: "2023-08-15T12:00:00Z",
  coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
}

export default function Home() {
  return (
    <main className="flex flex-col w-[90%] m-auto pt-10 pb-10">
      <h1 className="text-4xl font-bold mb-4">Your Trip Memories</h1>
      <p className="text-muted-foreground mb-6">Explore your adventures and relive those special moments</p>

      <div className="relative max-w-md mb-10">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search trips..."
          className="pl-10"
        />
      </div>

      <section className="flex flex-row">
        <TripListCard trip={trip}/>
      </section>

    </main>
  );
}
