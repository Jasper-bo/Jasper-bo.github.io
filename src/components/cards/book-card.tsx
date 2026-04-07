import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Book } from "@/types";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { Tag } from "@/components/shared/tag";

interface BookCardProps {
  book: Book;
  locale: Locale;
}

export function BookCard({ book, locale }: BookCardProps) {
  const dictionary = getDictionary(locale);
  const hasRating = typeof book.rating === "number";
  const compactTakeaways = book.takeaways.slice(0, 2);

  return (
    <article
      data-liquid
      className="group surface surface-strong h-full overflow-hidden sm:grid sm:grid-cols-[108px_minmax(0,1fr)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden border-b border-white/25 bg-white/18 sm:aspect-auto sm:h-full sm:min-h-[188px] sm:border-b-0 sm:border-r">
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 18vw"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap gap-1.5">
          <Tag variant="accent">{dictionary.bookStatuses[book.status]}</Tag>
          <Tag>{book.category}</Tag>
          {book.recommend ? <Tag variant="outline">{dictionary.bookCard.recommended}</Tag> : null}
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground">{book.title}</h3>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {book.author}
          </p>
        </div>

        <p
          className="text-sm leading-6 text-muted-foreground"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
        >
          {book.summary}
        </p>

        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
            {dictionary.bookCard.coreTakeaways}
          </p>
          <ul className="space-y-1.5 text-sm leading-6 text-muted-foreground">
            {compactTakeaways.map((takeaway) => (
              <li key={takeaway} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`mt-auto flex items-center gap-3 border-t border-white/18 pt-4 ${
            hasRating ? "justify-between" : "justify-end"
          }`}
        >
          {hasRating ? (
            <span className="text-xs font-medium uppercase tracking-[0.14em] text-foreground">
              {dictionary.bookCard.ratingLabel} {book.rating?.toFixed(1)} / 5
            </span>
          ) : null}
          {book.noteUrl ? (
            <Link
              href={book.noteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition hover:text-accent"
            >
              {dictionary.bookCard.notesLabel}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : (
            <span className="text-sm text-muted-foreground">{dictionary.bookCard.notesComing}</span>
          )}
        </div>
      </div>
    </article>
  );
}
