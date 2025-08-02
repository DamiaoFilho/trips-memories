"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import CreateForm from "@/components/create-form";
import { ImageIcon, Video, Upload } from "lucide-react";

export default function CreatePage() {

    return (
        <main className="flex flex-col w-[50%] m-auto pt-10 pb-10">
            <h1 className="text-4xl font-bold mb-4">Create New Trip</h1>
            <p className="text-muted-foreground mb-6">Start documenting your next adventure</p>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Upload className="h-5 w-5 mr-2" />
                        Quick Start Guide
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <div className="flex items-start space-x-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                                <ImageIcon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">Add Photos</p>
                                <p>Upload images to capture your favorite moments</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                                <Video className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium text-foreground">Record Videos</p>
                                <p>Share video memories of your adventures</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Trip Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <CreateForm />
                </CardContent>
            </Card>
        </main>
    );
}
