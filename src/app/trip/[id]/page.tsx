"use client";

import CardFile from "@/components/CardFile";
import { ModalAddFile } from "@/components/ModalAddFile";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Calendar, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CardImageContent() {
  const params = useParams();
  const router = useRouter();

  const tripId = params.id as string;

  // ##########################################################################
  // ESSES DADOS ABAIXO FUTURAMENTE VIRÃO DO CONTEXTO TRIP
  const nameTrip = "Viagem à Praia de Santos/SP";
  const descriptionTrip = "Com os amigos da faculdade";
  const coverImage =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb";
  const dateTrip = new Date("2025-07-10T09:00:00Z");

  const filesTrip = [
    {
      id: 1,
      title: "Viagem à Praia",
      description: "Um dia incrível na praia com amigos.",
      createdAt: "2025-07-15T10:30:00Z",
      media: {
        type: "photo",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      },
    },
    {
      id: 2,
      title: "Trilha na Montanha",
      description: "Aventura e belas paisagens durante a trilha.",
      createdAt: "2025-06-20T08:00:00Z",
      media: {
        type: "video/mp4",
        url: "/videos/music_video.mp4",
        poster: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      },
    },
  ];
  // ##########################################################################

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-4 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para a página principal
          </Button>

          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6">
            <Image
              src={
                coverImage ||
                "/placeholder.svg?height=400&width=800&query=travel landscape"
              }
              alt={nameTrip}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {nameTrip}
              </h1>
              <p className="text-lg opacity-90">{descriptionTrip}</p>
              <div className="flex items-center mt-4 text-sm opacity-75">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(dateTrip).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                {filesTrip.length} memórias
              </Badge>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicione uma memória
            </Button>
          </div>

          <div className="space-y-8">
            {filesTrip.map((log, index) => (
              <CardFile
                key={index}
                id={log.id}
                mediaUrl={log.media.url}
                mediaType={log.media.type}
                mediaPoster={log.media.poster}
                title={log.title}
                description={log.description}
                createdAt={log.createdAt}
              />
            ))}
          </div>

          <ModalAddFile
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            tripId={tripId}
          />
        </div>
      </div>
    </>
  );
}
