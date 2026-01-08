function PostSlide({ children }) {
  return (
    <>
      <main
        className={`mt-15 border border-[--outline-primary] bg-(--bg-primary)`}
      >
        {/* Nội dung bên trong thay đổi */}
        {children}
      </main>
    </>
  );
}

export default PostSlide;
