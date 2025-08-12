"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TripListCard from "@/components/trip-list-card";
import { TripI } from "@/types/trips";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supaBaseClient";

export default function Home() {
  const [trips, setTrips] = useState<TripI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrips() {
      setLoading(true);
      const { data, error } = await supabase
        .from("trip")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Erro ao buscar viagens:", error.message);
      } else if (data) {
        console.log(data);
        setTrips(data);
      }
      setLoading(false);
    }

    fetchTrips();
  }, []);

  return (
    <main className="flex flex-col w-[90%] m-auto pt-10 pb-10">
      <h1 className="text-4xl font-bold mb-4">Suas memórias de viagens</h1>
      <p className="text-muted-foreground mb-6">
        Explore suas aventuras e reviva esses momentos especiais
      </p>

      <div className="relative max-w-md mb-10">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input placeholder="Buscar viagens..." className="pl-10" />
      </div>

      <section className="flex flex-row flex-wrap gap-6 justify-center">
        {loading && <p>Carregando viagens...</p>}
        {!loading && trips.length === 0 && <p>Nenhuma viagem encontrada.</p>}
        {!loading &&
          trips.map((trip, idx) => (
            <TripListCard key={trip.id} trip={trip} index={idx} />
          ))}
      </section>
    </main>
  );
}
