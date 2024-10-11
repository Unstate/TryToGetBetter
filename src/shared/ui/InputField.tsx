import {FC, InputHTMLAttributes} from "react";
import { Description, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";

export type TInputField = {
  placeholder?:string;
  label?:string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  errorMessage?:string;
}

const InputField:FC<TInputField> = ({placeholder,label,errorMessage,inputProps}) => {
  return (
      <Field className={'w-full'}>
        {label ? <Label className="text-sm/6 font-medium text-white">{label}</Label> : null}
        {placeholder ? <Description className="text-sm/6 text-white/50">{placeholder}</Description> : null}
        <Input
            {...inputProps}
            className={clsx(
            "mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
          )}
        />
        <p className={'text-sm/7 text-red-500'}>{errorMessage}</p>
      </Field>
  );
};

export default InputField;
