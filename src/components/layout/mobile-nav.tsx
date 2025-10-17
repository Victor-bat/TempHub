
import Link from "next/link";
import { Home, PlusSquare, User } from "lucide-react";

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 p-1 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
        <Link
          href="/"
          className="inline-flex flex-col items-center justify-center p-2 rounded-lg hover:bg-muted group"
        >
          <Home className="w-6 h-6 mb-1 text-muted-foreground group-hover:text-primary" />
          <span className="text-xs text-muted-foreground group-hover:text-primary">
            Home
          </span>
        </Link>
        <Link
          href="/jobs/post"
          className="inline-flex flex-col items-center justify-center p-2 rounded-lg hover:bg-muted group"
        >
          <PlusSquare className="w-6 h-6 mb-1 text-muted-foreground group-hover:text-primary" />
          <span className="text-xs text-muted-foreground group-hover:text-primary">
            Post
          </span>
        </Link>
        <Link
          href="/profile"
          className="inline-flex flex-col items-center justify-center p-2 rounded-lg hover:bg-muted group"
        >
          <User className="w-6 h-6 mb-1 text-muted-foreground group-hover:text-primary" />
          <span className="text-xs text-muted-foreground group-hover:text-primary">
            Profile
          </span>
        </Link>
      </div>
    </nav>
  );
}
