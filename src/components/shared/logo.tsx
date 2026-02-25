import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href="/" className="">
        <div className="text-xl max-w-26 font-bold bg-red-500/90 px-1.5 py-1 rounded ">
          <span className="text-white mr-1">Food</span>
          <span className="text-yellow-300">Hub</span>
        </div>
      </Link>
    </>
  );
};

export default Logo;
