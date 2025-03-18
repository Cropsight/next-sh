import Image from "next/image";

type CountCardProps = {
  caption: string;
  count: number;
  iconSrc: string;
};

const formatCount = (count?: number) => {
  if (!count) return "0"; // Handle undefined/null count
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(2)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(2)}K`;
  return count.toLocaleString();
};

const CountCard = ({ caption, count=0, iconSrc }: CountCardProps) => {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-md flex flex-col gap-2">
      <h2 className="capitalize text-sm font-medium text-gray-400 text-left">{caption}</h2>
      <div className="flex items-center justify-between w-full">
        <Image src={iconSrc} alt="icon" width={64} height={64} className="object-contain opacity-30" />
        <h1 className="text-5xl font-semibold text-right">{formatCount(count)}</h1>
      </div>
    </div>
  );
};

export default CountCard;