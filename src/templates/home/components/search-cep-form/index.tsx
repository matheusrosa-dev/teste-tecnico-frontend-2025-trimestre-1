import { useForm } from "react-hook-form";
import { InputMask } from "@react-input/mask";
import type { Form } from "./types";
import { resolver } from "./utils";
import { MdOutlineSearch } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "../../../../components";
import { useViaCEPServices } from "../../../../shared/services";
import type { Address } from "../../types";

type Props = {
  afterSearch: (address: Address) => void;
};

export function SearchCepForm({ afterSearch }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const { getAddressByCEP } = useViaCEPServices();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({
    resolver,
    defaultValues: {
      cep: "",
    },
  });

  const onSubmit = async (formData: Form) => {
    setIsLoading(true);

    try {
      const response = await getAddressByCEP(formData.cep);

      if (response.erro) {
        toast.warning("Endereço não encontrado");
        return;
      }

      afterSearch(response);
    } catch {
      toast.error("Ocorreu um erro ao buscar o endereço");
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <InputMask
          disabled={isLoading}
          className={`w-full p-2 px-4 border rounded-l-md outline-0 text-xl
            disabled:opacity-60
            ${
              errors?.cep
                ? "border-red-400 placeholder:text-red-400 text-red-400"
                : "border-gray-400"
            }`}
          placeholder="Insira um CEP"
          mask="xxxxx-xxx"
          inputMode="numeric"
          replacement={{ x: /\d/ }}
          {...register("cep")}
        />

        <button
          className="border w-fit min-h-full px-4 flex items-center border-gray-400 border-l-0 rounded-r-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <MdOutlineSearch className="w-6 h-6 text-gray-500" />
          )}
        </button>
      </div>
    </form>
  );
}
