function PostSlide({ children }) {
  return (
    <>
      <main className="mt-15 border border-[--outline-primary] bg-(--bg-primary) py-3">
        {/* Nội dung bên trong thay đổi */}
        {children}
      </main>
      {/*  */}
    </>
  );
}

export default PostSlide;
