type GetAddressByCEP = (cep: string) => Promise<{
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: "true";
}>;

export type UseViaCEPServices = () => {
  getAddressByCEP: GetAddressByCEP;
};
