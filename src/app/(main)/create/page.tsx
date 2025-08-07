"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import CreateForm from "@/components/create-form";
import { ImageIcon, Video, Upload } from "lucide-react";

export default function CreatePage() {
  return (
    <main className="flex flex-col w-[50%] m-auto pt-10 pb-10">
      <h1 className="text-4xl font-bold mb-4">Criar nova viagem</h1>
      <p className="text-muted-foreground mb-6">
        Comece documentando sua próxima aventura
      </p>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Guia de começo rápido
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <ImageIcon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Adicionar fotos</p>
                <p>Adicione imagens dos seus momentos favoritos</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Video className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Adicionar vídeos</p>
                <p>Adicione vídeos dos seus momentos favoritos</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Detalhes da viagem</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateForm />
        </CardContent>
      </Card>
    </main>
  );
}
