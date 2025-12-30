import { Ellipsis } from "lucide-react";

function Header({ title }) {
  const boxStyles =
    "absolute top-[35px] size-[50px] overflow-hidden bg-transparent";
  const cornerStyles =
    "relative top-[25px] size-[50px] rounded-full border border-solid border-(--outline-primary) bg-transparent outline-[50px] outline-(--bg-base)";

  return (
    <header className="fixed top-0 h-15 w-160 bg-(--bg-base)">
      {/* Title */}
      <div className="sticky flex w-full items-center justify-center">
        <h1 className="my-4 text-lg font-semibold">{title}</h1>
        <Ellipsis className="absolute right-[5%] size-5.5 cursor-pointer rounded-full bg-(--bg-primary) p-1 outline outline-(--outline-primary) hover:scale-[1.04]" />
      </div>

      {/* box box-left */}
      <div className={`${boxStyles} -left-6.25`}>
        <div className={`${cornerStyles} left-6.25`}></div>
      </div>

      {/* box box-right */}
      <div className={`${boxStyles} -right-6.25`}>
        <div className={`${cornerStyles} right-6.25`}></div>
      </div>

      {/* box-middle */}
      <div className="absolute -bottom-px left-6.25 h-2.5 w-[calc(100%-50px)] border-b border-(--outline-primary)"></div>
    </header>
  );
}

export default Header;
