import { Card, CardContent } from "../ui/card";

import Image from "next/image";
import { Badge } from "../ui/badge";

import { Calendar, Play } from "lucide-react";

interface CardFileProps {
  id: number;
  mediaUrl: string;
  mediaType: string;
  mediaPoster?: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function CardFile({
  id,
  mediaUrl,
  mediaType,
  mediaPoster,
  title,
  description,
  createdAt,
}: CardFileProps) {
  return (
    <>
      <div className="space-y-8">
        <Card key={id} className="overflow-hidden hover:shadow-lg">
          <CardContent className="p-0">
            <div className="md:flex">
              <div className="relative md:w-1/2 h-64 md:h-80">
                <Image
                  src={mediaUrl || "/placeholder.svg"}
                  alt={title}
                  fill
                  className="object-cover"
                />
                {mediaType === "video/mp4" ? (
                  <video
                    src={mediaUrl}
                    controls
                    className="object-cover w-full h-full"
                    poster={mediaPoster || "/placeholder.svg"}
                  />
                ) : (
                  <Image
                    src={mediaUrl || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                )}
                {mediaType === "video/mp4" && (
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
                    {mediaType === "video/mp4" ? "Video" : "Photo"}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-2">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(createdAt).toLocaleDateString("pt-BR")}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
