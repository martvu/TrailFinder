import { HTMLInputTypeAttribute, useState } from "react";

type inputfieldProps = {
    label: string,
    placeholder: string,
    type: HTMLInputTypeAttribute | undefined
}
export default function Inputfield({label, placeholder, type}: inputfieldProps) {
    const [input, setInput] = useState("");
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