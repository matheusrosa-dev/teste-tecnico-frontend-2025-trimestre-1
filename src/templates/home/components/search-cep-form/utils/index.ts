import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import type { Form } from "../types";

export const schema = yup.object({
  cep: yup.string().required("CEP obrigatório").min(8, "CEP inválido"),
});

export const resolver = yupResolver(schema) as Resolver<Form>;
