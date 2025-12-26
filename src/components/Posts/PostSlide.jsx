function PostSlide({ children }) {
  return (
    <>
      <main className="mt-15 border border-[rgba(243,245,247,0.15)] bg-[#181818] px-6 py-3">
        {/* Nội dung bên trong thay đổi */}
        {children}
      </main>
      {/*  */}
    </>
  );
}

export default PostSlide;
