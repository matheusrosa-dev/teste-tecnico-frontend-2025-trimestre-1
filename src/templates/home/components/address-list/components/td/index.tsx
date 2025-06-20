type Props = {
  children?: React.ReactNode;
};

export const Td = ({ children }: Props) => {
  return (
    <td className="text-center font-medium px-[24px] py-[18px]">{children}</td>
  );
};
