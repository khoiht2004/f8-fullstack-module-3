import Header from "../Header";

function PostSlide({ title, children }) {
  return (
    <>
      <Header title={title} />
      <main className="b h-dvh w-full rounded-t-3xl border border-[rgba(243,245,247,0.15)] bg-[#181818]">
        {/* Nội dung bên trong thay đổi */}
        {children}
      </main>
    </>
  );
}

export default PostSlide;
