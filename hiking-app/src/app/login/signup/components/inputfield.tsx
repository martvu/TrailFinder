import { HTMLInputTypeAttribute, useState } from "react";

type inputfieldProps = {
    label: string,
    placeholder: string,
    type: HTMLInputTypeAttribute | undefined,
    setInput: (input: string) => void
}
export default function InputField({label, placeholder, type, setInput}: inputfieldProps) {
    return(
        <div className='mt-3'>
            <label className="block text-base mb-2">
                {label}
            </label>
            <input type={type} placeholder={placeholder} className="input input-bordered w-full"
                onChange={(e) => setInput(e.target.value)} />
        </div>
    )
}