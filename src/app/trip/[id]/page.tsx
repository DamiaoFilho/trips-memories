"use client";

import CardFile from "@/components/CardFile";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CardImageContent() {
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
      {logs.length === 0 ? (
        <Button onClick={() => setIsModalOpen(true)}>
          Adicione sua primeira memória
        </Button>
      ) : (
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
      )}
    </>
  );
}
