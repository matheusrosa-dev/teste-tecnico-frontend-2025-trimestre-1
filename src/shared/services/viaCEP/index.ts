import { api } from "../config";
import type { UseViaCEPServices } from "./types";

export const useViaCEPServices: UseViaCEPServices = () => {
  return {
    getAddressByCEP: async (cep) => {
      const { data } = await api.get(`https://viacep.com.br/ws/${cep}/json/`);

      return data;
    },
  };
};
