function PostSlide({ children, className }) {
  return (
    <>
      <main
        className={`mt-15 border border-[--outline-primary] bg-(--bg-primary) ${className}`}
      >
        {/* Nội dung bên trong thay đổi */}
        {children}
      </main>
      {/*  */}
    </>
  );
}

export default PostSlide;
