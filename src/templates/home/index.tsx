import { useState } from "react";
import type { Address } from "./types";
import { AddressList, SearchCepForm } from "./components";
import { Header } from "../../components";
import { toast } from "react-toastify";

const LOCAL_STORAGE_KEY = "addressList";

const recoverAddressList = () => {
  const addressList = localStorage.getItem(LOCAL_STORAGE_KEY);
  return addressList ? JSON.parse(addressList) : [];
};

export function HomeTemplate() {
  const [addressList, setAddressList] = useState<Address[]>(recoverAddressList);

  const afterSearch = (address: Address) => {
    const alreadyExists = addressList.some(
      (item) =>
        item.cep === address.cep || item.displayName === address.displayName
    );

    if (alreadyExists) {
      toast.warning("CEP ou nome de exibição já cadastrado");
      return;
    }

    setAddressList((prev) => {
      const newValue = [address, ...prev];

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));

      return newValue;
    });

    toast.success("Endereço encontrado com sucesso!");
  };

  const onEdit = (address: Address) => {
    setAddressList((prev) => {
      const newValue = prev.map((item) => {
        if (item.cep === address.cep) {
          return address;
        }

        return item;
      });

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));

      return newValue;
    });
  };

  const onRemove = (cep: string) => {
    setAddressList((prev) => {
      const newValue = prev.filter((address) => address.cep !== cep);

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));

      return newValue;
    });
  };

  return (
    <main>
      <Header />

      <div className="w-4/5 mx-auto">
        <h2 className="text-4xl font-medium">Pesquise por CEP</h2>
        <p className="text-xl mt-2 text-gray-700 font-thin mb-10">
          Encontre detalhes do endereço pelo CEP
        </p>

        <SearchCepForm afterSearch={afterSearch} />

        <div className="mt-10">
          {addressList.length === 0 && (
            <p className="text-center text-lg mt-20">
              Nenhum endereço cadastrado
            </p>
          )}

          {addressList.length !== 0 && (
            <AddressList
              data={addressList}
              onRemove={onRemove}
              onEdit={onEdit}
            />
          )}
        </div>
      </div>
    </main>
  );
}
