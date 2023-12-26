"use client";

import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  ValidationRule,
} from "react-hook-form";

type InputFieldProps = {
  name: string;
  label?: string;
  placeholder: string;
  errorMessage?: string;
  register: UseFormRegister<any>;
  validation: Record<string, ValidationRule>;
};

type FormProps = {
  submitLabel?: string;
  onSubmit: SubmitHandler<any>;
  defaultValues?: Record<string, string>;
  fields: Omit<InputFieldProps, "register">[];
};

export function InputField({
  name,
  label,
  register,
  validation,
  placeholder,
  errorMessage,
}: InputFieldProps) {
  return (
    <label className={labelClassName}>
      {label ? <span>{label}</span> : null}
      <input
        type="text"
        className="input"
        placeholder={placeholder}
        {...register(name, validation)}
      />
      {errorMessage ? (
        <span className={errorMessageClassName}>{errorMessage}</span>
      ) : null}
    </label>
  );
}

export function Form({
  fields,
  onSubmit,
  defaultValues,
  submitLabel = "Submit",
}: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const disabled = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formClassName}>
      {fields.map((item) => {
        const errorMessage = errors?.[item.name]?.message || "";

        return (
          <InputField
            key={item.name}
            name={item.name}
            label={item.label}
            register={register}
            validation={item.validation}
            placeholder={item.placeholder}
            errorMessage={errorMessage as string}
          />
        );
      })}

      <button
        type="submit"
        disabled={disabled}
        aria-disabled={disabled}
        className={`btn ${disabled ? "disabled" : ""}`}
      >
        {submitLabel}
      </button>
    </form>
  );
}

const errorMessageClassName = "absolute px-6 text-xs text-red-700 -bottom-4";
const formClassName = "w-full flex flex-col gap-5 items-center";
const labelClassName = "w-full relative flex flex-col";
