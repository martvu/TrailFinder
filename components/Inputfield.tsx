import React, { HTMLInputTypeAttribute } from 'react';

type InputfieldProps = {
  label: string,
  placeholder: string,
  type: HTMLInputTypeAttribute | undefined,
  setInput: (input: string) => void
};
export default function InputField({
  label, placeholder, type, setInput,
}: InputfieldProps) {
  return (
    <div className="mt-3">
      <label htmlFor={label} className="block text-base mb-2">
        {label}
        <input
          type={type}
          name={label}
          placeholder={placeholder}
          className="input input-bordered w-full"
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
    </div>
  );
}
