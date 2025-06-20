import { FiCheckCircle, FiEdit, FiTrash, FiX } from "react-icons/fi";

type Props = {
  onClick: () => void;
  variant: "edit" | "remove" | "save" | "cancel";
};

export const ActionButton = ({ onClick, variant }: Props) => {
  return (
    <button type="button" onClick={onClick} className="cursor-pointer mr-2">
      {variant === "edit" && <FiEdit className="text-lg text-[#1f215c]" />}

      {variant === "remove" && <FiTrash className="text-lg text-red-400" />}

      {variant === "save" && (
        <FiCheckCircle className="text-lg text-green-600" />
      )}

      {variant === "cancel" && <FiX className="text-lg text-red-400" />}
    </button>
  );
};
