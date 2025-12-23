import { Ellipsis } from "lucide-react";

function Header({ title }) {
  return (
    <div className="relative flex w-full items-center justify-center">
      <h1 className="my-4 text-lg font-semibold">{title}</h1>
      <Ellipsis className="absolute right-[2.25%] size-5.5 cursor-pointer rounded-full bg-[#181818] p-1 outline outline-[#f3f5f740] hover:scale-[1.04]" />
    </div>
  );
}

//

export default Header;
