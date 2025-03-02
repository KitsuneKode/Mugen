import Image from 'next/image';
export const Logo = ({
  height,
  width,
  className,
}: {
  height: number;
  width: number;
  className: string;
}) => {
  return (
    <Image
      className={className}
      src="/logo.svg"
      alt="Logo"
      width={width}
      height={height}
      layout="intrinsic"
      priority
    />
  );
};
