"use client";

import CardFile from "@/components/CardFile";
import { ModalAddFile } from "@/components/ModalAddFile";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, Calendar, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { supabase } from "../../../../../lib/supaBaseClient";
import { TripI, TripLogI } from "@/types/trips";

export default function CardImageContent() {
  const params = useParams();
  const router = useRouter();
  
  const [trip, setTrip] = useState<TripI | null>(null);
  const [logs, setLogs] = useState<TripLogI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tripId = params.id as string;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchLogs = async () => {
    try {
      const { data: logsData, error: logsError } = await supabase
        .from('log')
        .select('*')
        .eq('trip_id', tripId)
        .order('created_at', { ascending: false });

      if (logsError) {
        throw logsError;
      }

      setLogs(logsData || []);
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
  };

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        setLoading(true);
        
        const { data: tripData, error: tripError } = await supabase
          .from('trip')
          .select('*')
          .eq('id', tripId)
          .single();

        if (tripError) {
          throw tripError;
        }

        setTrip(tripData);

        await fetchLogs();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      fetchTripData();
    }
  }, [tripId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando viagem...</p>
        </div>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Viagem não encontrada'}</p>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para a página principal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="mb-4 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para a página principal
            </Button>
          </motion.div>

          <motion.div 
            className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Image
              src={
                trip.cover_img ||
                "/placeholder.svg?height=400&width=800&query=travel landscape"
              }
              alt={trip.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {trip.name}
              </h1>
              <p className="text-lg opacity-90">{trip.description}</p>
              <div className="flex items-center mt-4 text-sm opacity-75">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(trip.date).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          >
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                {logs.length} memórias
              </Badge>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicione uma memória
            </Button>
          </motion.div>

          <div className="space-y-8">
            {logs.map((log, index) => (
              <CardFile
                key={log.id}
                index={index}
                id={log.id}
                mediaUrl={log.url}
                mediaType={log.media_type}
                mediaPoster={log.media_type}
                title={log.title}
                description={log.description}
                createdAt={log.created_at}
              />
            ))}
          </div>

          <ModalAddFile
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            tripId={tripId}
            onLogAdded={fetchLogs}
          />
        </div>
      </div>
    </>
  );
}