import { useState } from "react";
import { Card, CardContent } from "../ui/card";

import Image from "next/image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

import { Calendar, ImageIcon, Play } from "lucide-react";

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
      {/* Trip Logs */}
      {logs.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="mb-4">
              <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No memories yet</h3>
            <p className="text-muted-foreground mb-6">
              Start adding photos and videos to document your trip
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              Add Your First Memory
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {logs.map((log, index) => (
            <Card key={log.id} className="overflow-hidden hover:shadow-lg">
              <CardContent className="p-0">
                <div className="md:flex">
                  <div className="relative md:w-1/2 h-64 md:h-80">
                    <Image
                      src={log.media.url || "/placeholder.svg"}
                      alt={log.title}
                      fill
                      className="object-cover"
                    />
                    {log.media.type === "video/mp4" ? (
                      <video
                        src={log.media.url}
                        controls
                        className="object-cover w-full h-full"
                        poster={log.media.poster || "/placeholder.svg"}
                      />
                    ) : (
                      <Image
                        src={log.media.url || "/placeholder.svg"}
                        alt={log.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    {log.media.type === "video/mp4" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                        <div className="bg-white/90 rounded-full p-4">
                          <Play className="h-8 w-8 text-black" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:w-1/2 p-6 flex flex-col justify-center">
                    <div className="mb-4">
                      <Badge variant="outline" className="mb-2">
                        {log.media.type === "video/mp4" ? "Video" : "Photo"}
                      </Badge>
                      <h3 className="text-2xl font-bold mb-2">{log.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {log.description}
                      </p>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(log.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
