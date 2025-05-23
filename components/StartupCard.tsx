import React from "react";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";
import { cn, formatDate } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

export const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    title,
    author,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="startup-card group mb-4">
      <div className="flex-between">
        <p className="startup_card_date  text-black">
          {formatDate(_createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary text-red-500" />
          <span className="text-16-  text-black">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>

          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-2">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image || "/placeholder-avatar.png"}
            alt={author?.name || "Author"}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card-desc text-black">{description}</p>
        <Image
          src={image || "/placeholder-startup.png"}
          alt={title || "Startup image"}
          width={800}
          height={400}
          className="startup-card_img"
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
