"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react";
import TripListCard from "@/components/trip-list-card";
import { TripI } from "@/types/trips";

const trip: TripI = {
  id: "6",
  name: "Férias de verão",
  description: "Uma viagem na praia com a família.",
  created_at: "2023-08-15T12:00:00Z",
  cover_img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  user_id: 1,
  date: "2023-08-15T12:00:00Z"
}

export default function Home() {
  return (
    <main className="flex flex-col w-[90%] m-auto pt-10 pb-10">
      <h1 className="text-4xl font-bold mb-4">Suas memórias de viagens</h1>
      <p className="text-muted-foreground mb-6">Explore suas aventuras e reviva esses momentos especiais</p>

      <div className="relative max-w-md mb-10">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar viagens..."
          className="pl-10"
        />
      </div>
      <section className="flex flex-row flex-wrap gap-6 justify-center">
        {Array.from({ length: 3 }).map((_, idx) => (
          <TripListCard key={idx} trip={trip} index={idx} />
        ))}
      </section>

    </main>
  );
}
