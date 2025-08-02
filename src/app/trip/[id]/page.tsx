"use client";

import CardFile from "@/components/CardFile";
import { ModalAddFile } from "@/components/ModalAddFile";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CardImageContent() {
  const params = useParams();
  const tripId = params.id as string;

  const logs = [
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-end p-5 mr-10">
        <Button className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          Adicione uma memória
        </Button>
      </div>

      <div className="space-y-8">
        {logs.map((log, index) => (
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
    </>
  );
}
