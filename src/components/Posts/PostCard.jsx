// import { formatCount, formatTime, getImageGridClass } from "@/utils/helper";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Hiển thị từng card có nội dung riêng biệt
 * Lặp qua PostCard -> render vào children của PostSlide trong các trang khác
 * */
function PostCard({ post }) {
  return (
    <>
      <div>
        {/* <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card> */}
        {post.id}. {post.content}
      </div>
    </>
  );
}

export default PostCard;
