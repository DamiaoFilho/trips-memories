import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Calendar, Play } from "lucide-react";
import { motion } from "framer-motion";

interface CardFileProps {
  id: number;
  mediaUrl: string;
  mediaType: string;
  mediaPoster?: string;
  title: string;
  description: string;
  createdAt: string;
  index?: number;
}

export default function CardFile({
  id,
  mediaUrl,
  mediaType,
  mediaPoster,
  title,
  description,
  createdAt,
  index = 0,
}: CardFileProps) {
  return (
    <>
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.2,
          ease: "easeOut" 
        }}
      >
        <Card key={id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-0">
            <div className="md:flex">
              <motion.div 
                className="relative md:w-1/2 h-64 md:h-80"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.2 + 0.2,
                  ease: "easeOut" 
                }}
              >
                {mediaType === "video" ? (
                  <video
                    src={mediaUrl}
                    controls
                    className="object-cover w-full h-full rounded-2xl p-2"
                    poster={mediaPoster || "/placeholder.svg"}
                  />
                ) : (
                  <Image
                    src={mediaUrl || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover p-2 rounded-2xl"
                  />
                )}
              </motion.div>

              <motion.div 
                className="md:w-1/2 p-6 flex flex-col justify-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 + 0.3,
                  ease: "easeOut" 
                }}
              >
                <div className="mb-4">
                  <Badge variant="outline" className="mb-2">
                    {mediaType === "video" ? "Video" : "Foto"}
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
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}