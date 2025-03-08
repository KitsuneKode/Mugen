import Image from 'next/image';

const Logo = ({
  height,
  width,
  className,
}: {
  height: number;
  width: number;
  className: string;
}) => {
  return (
    <div className={`${className}`}>
      <Image
        className={className}
        src="/logo.svg"
        alt="Logo"
        width={width}
        height={height}
        priority
      />
    </div>
  );
};

export default Logo;
