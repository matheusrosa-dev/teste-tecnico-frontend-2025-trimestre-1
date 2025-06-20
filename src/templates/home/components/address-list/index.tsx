import type { Address } from "../../types";
import { useMemo, useState } from "react";
import { Input } from "../../../../components";
import { useForm } from "react-hook-form";
import type { Form } from "./types";
import { resolver } from "./utils";
import { toast } from "react-toastify";
import { ActionButton, Filters, Td, Th } from "./components";

type Props = {
  data: Address[];
  onEdit: (address: Address) => void;
  onRemove: (cep: string) => void;
};

export function AddressList({ data, onRemove, onEdit }: Props) {
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [filters, setFilters] = useState({
    username: "",
    state: "",
    city: "",
  });

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

  const onEditHandler = () => {
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

    if (filters.username === editingAddress?.username) {
      const addressOfUsername = data.filter(
        (item) => item.username === editingAddress.username
      );

      if (addressOfUsername.length === 1) {
        setFilters((prev) => ({ ...prev, username: "" }));
      }
    }

    setEditingAddress(null);
    onEdit({ ...editingAddress!, ...formData });

    reset();
  };

  const onRemoveHandler = (address: Address) => {
    if (filters.city === address.localidade) {
      const addressOfCity = data.filter(
        (item) => item.localidade === address.localidade
      );

      if (addressOfCity.length === 1) {
        setFilters((prev) => ({ ...prev, city: "" }));
      }
    }

    onRemove(address.cep);
  };

  const filteredData = useMemo(() => {
    let filteredData = [...data];

    if (filters.username) {
      filteredData = filteredData.filter(
        (address) => address.username === filters.username
      );
    }

    if (filters.state) {
      filteredData = filteredData.filter(
        (address) => address.estado === filters.state
      );
    }

    if (filters.city) {
      filteredData = filteredData.filter(
        (address) => address.localidade === filters.city
      );
    }

    return filteredData;
  }, [data, filters]);

  return (
    <div>
      <Filters
        data={data}
        value={filters}
        onChange={(value) => setFilters(value)}
      />

      {filteredData.length === 0 && (
        <p className="text-center text-lg mt-20 text-red-400">
          Nenhum endereço encontrado
        </p>
      )}

      {filteredData.length > 0 && (
        <div className="rounded-t-lg border border-gray-300 overflow-x-auto">
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
              {filteredData.map((address) => {
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
                            onClick={handleSubmit(onEditHandler)}
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
                            onClick={() => onRemoveHandler(address)}
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
      )}
    </div>
  );
}
