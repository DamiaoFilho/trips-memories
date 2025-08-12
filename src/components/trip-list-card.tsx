import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import placeholder from "../../public/elementor-placeholder-image.png"
import Image from "next/image"
import { TripI } from "@/types/trips"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface TripListCardProps {
    trip: TripI;
    index?: number;
}

export default function TripListCard({ trip, index = 0 }: TripListCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileFocus={{ 
                y: -8,
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            transition={{ 
                duration: 0.8, 
                delay: index * 0.3,
                ease: "easeOut" 
            }}
        >
            <Card className="pt-0 w-75 transition-shadow duration-300 hover:shadow-lg focus-within:shadow-lg">
                <Link href={`/trip/${trip.id}`}>
                    <CardHeader className="w-full p-0 m-0 rounded-md">
                        <CardTitle className="relative">
                            <Image
                                className="rounded-t-md"
                                width={400}
                                height={400}
                                blurDataURL={"/img-placeholder"}
                                placeholder="blur"
                                src={trip.coverImage as string}
                                alt="coverImg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <h1 className="text-xl md:text-xl font-bold mb-2">{trip.name}</h1>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground opacity-90 mb-2">{trip.description}</p>
                        <div className="flex flex-row w-full justify-between">
                            <div className="flex flex-row text-sm items-center gap-2">
                                <Calendar className="h-4 w-4"/>
                                {new Date(trip.createdAt).toLocaleDateString('pt-BR')}
                            </div>
                            <Badge variant={"secondary"}>2 memories</Badge>
                        </div>
                    </CardContent>
                </Link>
            </Card>
        </motion.div>
    )
}