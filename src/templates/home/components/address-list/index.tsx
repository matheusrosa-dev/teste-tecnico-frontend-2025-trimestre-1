import { FiCheckCircle, FiEdit, FiTrash, FiX } from "react-icons/fi";
import type { Address } from "../../types";
import { useState } from "react";
import { Input } from "../../../../components";
import { useForm } from "react-hook-form";
import type { Form } from "./types";
import { resolver } from "./utils";
import { toast } from "react-toastify";

type Props = {
  data: Address[];
  onEdit: (address: Address) => void;
  onRemove: (cep: string) => void;
};

export function AddressList({ data, onRemove, onEdit }: Props) {
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const {
    register,
    setValue,
    formState: { errors },
    reset,
    getValues,
    handleSubmit,
  } = useForm<Form>({
    resolver,
    defaultValues: {
      displayName: "",
      username: "",
    },
  });

  const onEditAddress = () => {
    const formData = getValues();

    const exibitionNameAlreadyExists = data.some(
      (item) =>
        item.cep !== editingAddress?.cep &&
        item.displayName === formData.displayName
    );

    if (exibitionNameAlreadyExists) {
      toast.warning("Nome de exibição já cadastrado");
      return;
    }

    setEditingAddress(null);
    onEdit({ ...editingAddress!, ...formData });

    reset();
  };

  return (
    <div className={`rounded-t-lg border border-gray-300 overflow-x-auto`}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <Th>Nome de usuário</Th>

            <Th>Nome de exibição</Th>

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
          {data.map((address) => {
            const isEditing = editingAddress?.cep === address.cep;

            return (
              <tr key={address.cep}>
                {isEditing && (
                  <>
                    <Td>
                      <Input
                        placeholder="Insira um nome de usuário"
                        className="text-[1rem] text-center max-w-40"
                        hasError={!!errors?.username}
                        {...register("username")}
                      />
                    </Td>

                    <Td>
                      <Input
                        placeholder="Insira um nome de exibição"
                        className="text-[1rem] text-center max-w-40"
                        hasError={!!errors?.displayName}
                        {...register("displayName")}
                      />
                    </Td>
                  </>
                )}

                {!isEditing && (
                  <>
                    <Td>{address.username}</Td>
                    <Td>{address.displayName}</Td>
                  </>
                )}

                <Td>{address.cep}</Td>
                <Td>{address.uf}</Td>
                <Td>{address.estado}</Td>
                <Td>{address.localidade}</Td>
                <Td>{address.bairro}</Td>
                <Td>{address.logradouro}</Td>

                <Td>
                  {isEditing && (
                    <>
                      <ActionButton
                        onClick={handleSubmit(onEditAddress)}
                        variant="save"
                      />

                      <ActionButton
                        variant="cancel"
                        onClick={() => {
                          setEditingAddress(null);

                          reset();
                        }}
                      />
                    </>
                  )}

                  {!isEditing && (
                    <>
                      <ActionButton
                        variant="edit"
                        onClick={() => {
                          setEditingAddress(address);

                          setValue("username", address.username);
                          setValue("displayName", address.displayName);
                        }}
                      />

                      <ActionButton
                        onClick={() => onRemove(address.cep)}
                        variant="remove"
                      />
                    </>
                  )}
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const Th = (props: { children?: React.ReactNode }) => (
  <th
    className={`text-[#6E6E76] font-normal bg-[#F8F8F8] py-[18px] px-[24px] min-w-30`}
  >
    {props.children}
  </th>
);

const Td = (props: { children?: React.ReactNode }) => {
  return (
    <td className="text-center font-medium px-[24px] py-[18px]">
      {props.children}
    </td>
  );
};

const ActionButton = (props: {
  onClick: () => void;
  variant: "edit" | "remove" | "save" | "cancel";
}) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="cursor-pointer mr-2"
    >
      {props.variant === "edit" && (
        <FiEdit className="text-lg text-[#1f215c]" />
      )}

      {props.variant === "remove" && (
        <FiTrash className="text-lg text-red-400" />
      )}

      {props.variant === "save" && (
        <FiCheckCircle className="text-lg text-green-600" />
      )}

      {props.variant === "cancel" && <FiX className="text-lg text-red-400" />}
    </button>
  );
};
