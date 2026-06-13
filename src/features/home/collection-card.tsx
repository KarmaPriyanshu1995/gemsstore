import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Collection } from "@/types/catalog";

type CollectionCardProps = {
  collection: Collection;
};

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{collection.name}</CardTitle>
          <Badge variant="accent">Collection</Badge>
        </div>
        <CardDescription>{collection.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          href={`/collections/${collection.slug}`}
          className="text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
        >
          View collection
        </Link>
      </CardFooter>
    </Card>
  );
}
