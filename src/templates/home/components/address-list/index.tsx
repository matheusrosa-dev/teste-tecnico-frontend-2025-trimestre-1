import { FiTrash } from "react-icons/fi";
import type { Address } from "../../types";

type Props = {
  data: Address[];
  onRemove: (cep: string) => void;
};

export function AddressList({ data, onRemove }: Props) {
  return (
    <div className={`rounded-t-lg border border-gray-300 overflow-x-auto`}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <Th>CEP</Th>

            <Th>UF</Th>

            <Th>Estado</Th>

            <Th>Cidade</Th>

            <Th>Bairro</Th>

            <Th>Logradouro</Th>

            <Th></Th>
          </tr>
        </thead>

        <tbody>
          {data.map((address) => (
            <tr key={address.cep}>
              <Td>{address.cep}</Td>
              <Td>{address.uf}</Td>
              <Td>{address.estado}</Td>
              <Td>{address.localidade}</Td>
              <Td>{address.bairro}</Td>
              <Td>{address.logradouro}</Td>
              <Td>
                <button
                  type="button"
                  className="cursor-pointer hover:scale-140 duration-150"
                  onClick={() => onRemove(address.cep)}
                >
                  <FiTrash className="text-red-400" />
                </button>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Th = (props: { children?: React.ReactNode }) => (
  <th className={`text-[#6E6E76] font-normal bg-[#F8F8F8] py-[18px] px-[24px]`}>
    {props.children}
  </th>
);

const Td = (props: { children: React.ReactNode }) => (
  <td className={`text-center font-medium py-[18px] px-[24px]`}>
    {props.children}
  </td>
);
