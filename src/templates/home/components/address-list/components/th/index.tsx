type Props = {
  children?: React.ReactNode;
};

export const Th = ({ children }: Props) => (
  <th
    className={`text-[#6E6E76] font-normal bg-[#F8F8F8] py-[18px] px-[24px] min-w-30`}
  >
    {children}
  </th>
);
