import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar } from "../ui/avatar";
import { Separator } from "../ui/separator";

/**
 * Skeleton loading cho PostCard
 * Hiển thị animation placeholder trong khi fetch data
 */
function PostLoadingSkeleton({ count = 5 }) {
  const wrapperIcon = "flex items-center gap-1 rounded-2xl px-3 py-1.5";

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={`skeleton-${index}`}>
          <Card className="flex flex-row rounded-none border-none px-6 py-3">
            {/* Avatar Skeleton */}
            <Skeleton className="size-9 shrink-0 rounded-full" />

            {/* Content Skeleton */}
            <div className="flex-1">
              {/* Header: Username + Time + Menu */}
              <CardHeader className="flex items-center px-0">
                <div className="flex flex-1 items-center gap-2">
                  {/* Username */}
                  <Skeleton className="h-4 w-24" />
                  {/* Time */}
                  <Skeleton className="h-3 w-16" />
                </div>
                {/* Menu icon */}
                <Skeleton className="size-8 rounded-full" />
              </CardHeader>

              {/* Content: Text lines */}
              <CardContent className="space-y-2 px-0">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[90%]" />
                {/* Random short/long content */}
                {index % 3 === 0 && <Skeleton className="h-4 w-[70%]" />}
              </CardContent>

              {/* Footer: Action buttons */}
              <CardFooter className="gap-0 px-0 pt-1">
                {/* Like button */}
                <div className={wrapperIcon}>
                  <Skeleton className="size-4.5 rounded-full" />
                  <Skeleton className="h-3 w-4" />
                </div>
                {/* Comment button */}
                <div className={wrapperIcon}>
                  <Skeleton className="size-4.5 rounded-full" />
                  <Skeleton className="h-3 w-4" />
                </div>
                {/* Repost button */}
                <div className={wrapperIcon}>
                  <Skeleton className="size-4.5 rounded-full" />
                  <Skeleton className="h-3 w-4" />
                </div>
                {/* Share button */}
                <div className={wrapperIcon}>
                  <Skeleton className="size-4.5 rounded-full" />
                  <Skeleton className="h-3 w-4" />
                </div>
              </CardFooter>
            </div>
          </Card>

          <Separator className="bg-(--outline-primary)" />
        </div>
      ))}
    </>
  );
}

export default PostLoadingSkeleton;
