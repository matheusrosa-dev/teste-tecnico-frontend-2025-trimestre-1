import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import type { Form } from "../types";

export const schema = yup.object({
  username: yup.string().required().trim(),
  displayName: yup.string().required().trim(),
});

export const resolver = yupResolver(schema) as Resolver<Form>;
