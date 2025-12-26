import Header from "@/components/Header";
import PostSlide from "@/components/Posts/PostSlide";
import PostCard from "@/components/Posts/PostCard";
import { useGetFeedQuery } from "@/services/Home/postApi";
import { useState } from "react";

function HomePage() {
  const [feedType, setFeedType] = useState("for_you");
  const { data, isLoading } = useGetFeedQuery({
    type: feedType,
    page: 1,
    per_page: 40,
  });

  console.log(data);

  return (
    <>
      <Header title="Dành cho bạn" />
      <PostSlide>
        <ul>
          {data?.data?.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </PostSlide>
    </>
  );
}

export default HomePage;
