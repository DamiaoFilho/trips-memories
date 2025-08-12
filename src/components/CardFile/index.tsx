import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Calendar, Play, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { supabase } from "../../../lib/supaBaseClient";
import { toast } from "sonner";

interface CardFileProps {
  id: number;
  mediaUrl: string;
  mediaType: string;
  mediaPoster?: string;
  title: string;
  description: string;
  createdAt: string;
  index?: number;
  onDelete?: () => void;
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
  onDelete,
}: CardFileProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('log')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast.success("Memória excluída com sucesso!");
      
      if (onDelete) {
        onDelete();
      }
    } catch (error: any) {
      console.error("Error deleting log:", error);
      toast.error(`Erro ao excluir memória: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

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
        <Card key={id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 relative">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 z-10 h-8 w-8"
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir memória</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir a memória "{title}"? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Excluindo..." : "Excluir"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

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
                    blurDataURL="/img-placeholder.png"
                    placeholder="blur"
                    src={mediaUrl}
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