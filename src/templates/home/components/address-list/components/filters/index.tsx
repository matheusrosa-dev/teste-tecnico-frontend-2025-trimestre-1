import type { Address } from "../../../../types";

type Props = {
  data: Address[];
  value: {
    username: string;
    state: string;
    city: string;
  };
  onChange: (value: Props["value"]) => void;
};

export function Filters({ data, value, onChange }: Props) {
  const users = [...new Set(data.map((address) => address.username))];
  const states = [...new Set(data.map((address) => address.estado))];
  const cities = [...new Set(data.map((address) => address.localidade))];

  return (
    <div className="flex mb-4 flex-col md:flex-row md:items-end">
      <span className="pb-1 text-lg font-medium mr-4">Filtros:</span>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Select
          label="Nome de usuário"
          options={users}
          value={value.username}
          onChange={(newValue) => onChange({ ...value, username: newValue })}
        />

        <Select
          label="Estado"
          options={states}
          value={value.state}
          onChange={(newValue) => onChange({ ...value, state: newValue })}
        />

        <Select
          label="Cidade"
          options={cities}
          value={value.city}
          onChange={(newValue) => onChange({ ...value, city: newValue })}
        />
      </div>
    </div>
  );
}

const Select = (props: {
  options: string[];
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <label className="flex flex-col gap-1">
      {props.label}
      <select
        className={`p-1 px-2 border rounded-md outline-0 text-lg border-gray-400 ${
          props?.value ? "" : "text-gray-400"
        } `}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        <option value="" className="text-black">
          Selecione um item
        </option>
        {props.options.map((option) => (
          <option className="text-black" value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};
