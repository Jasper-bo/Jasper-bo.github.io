import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Book, BookStatus } from "@/types";
import { Tag } from "@/components/shared/tag";

const statusLabelMap: Record<BookStatus, string> = {
  wishlist: "Wishlist",
  reading: "Reading",
  completed: "Completed"
};

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="group surface flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden border-b border-border/70 bg-muted">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap gap-2">
          <Tag variant="accent">{statusLabelMap[book.status]}</Tag>
          <Tag>{book.category}</Tag>
          {book.recommend ? <Tag variant="outline">Recommended</Tag> : null}
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">{book.title}</h3>
          <p className="text-sm font-medium text-muted-foreground">{book.author}</p>
        </div>

        <p className="text-sm leading-7 text-muted-foreground">{book.summary}</p>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">Core takeaways</p>
          <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
            {book.takeaways.map((takeaway) => (
              <li key={takeaway} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border/70 pt-5">
          <span className="text-sm font-medium text-foreground">
            Rating {book.rating.toFixed(1)} / 5
          </span>
          {book.noteUrl ? (
            <Link
              href={book.noteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition hover:text-accent"
            >
              Notes
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="text-sm text-muted-foreground">Notes coming</span>
          )}
        </div>
      </div>
    </article>
  );
}
