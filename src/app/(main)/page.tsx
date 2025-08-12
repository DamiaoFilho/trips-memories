"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TripListCard from "@/components/trip-list-card";
import { TripI } from "@/types/trips";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supaBaseClient";
import { useUser } from "@/context/auth";

export default function Home() {
  const [trips, setTrips] = useState<TripI[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<TripI[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();

  useEffect(() => {
    async function fetchTrips() {
      if (!user) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("trip")
        .select("*, log(*)")
        .eq("user_id", user.id)
        .order("date", { ascending: false });
      if (error) {
        console.error("Erro ao buscar viagens:", error.message);
      } else if (data) {
        console.log(data);
        setTrips(data);
        setFilteredTrips(data);
      }
      setLoading(false);
    }

    fetchTrips();
  }, [user]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTrips(trips);
    } else {
      const filtered = trips.filter((trip) => {
        const matchesName = trip.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesDescription = trip.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesDate = new Date(trip.date)
          .toLocaleDateString("pt-BR")
          .includes(searchTerm);

        return matchesName || matchesDescription || matchesDate;
      });
      setFilteredTrips(filtered);
    }
  }, [searchTerm, trips]);

  return (
    <main className="flex flex-col w-[90%] m-auto pt-10 pb-10">
      <h1 className="text-4xl font-bold mb-4">Suas memórias de viagens</h1>
      <p className="text-muted-foreground mb-6">
        Explore suas aventuras e reviva esses momentos especiais
      </p>

      <div className="relative max-w-md mb-10">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Buscar por nome, descrição ou data..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <section className="flex flex-row flex-wrap gap-6 justify-center">
        {loading && <p>Carregando viagens...</p>}
        {!loading && filteredTrips.length === 0 && !searchTerm && (
          <p>Nenhuma viagem encontrada.</p>
        )}
        {!loading && filteredTrips.length === 0 && searchTerm && (
          <p>Nenhuma viagem encontrada para "{searchTerm}".</p>
        )}
        {!loading &&
          filteredTrips.map((trip, idx) => (
            <TripListCard key={trip.id} trip={trip} index={idx} />
          ))}
      </section>
    </main>
  );
}
