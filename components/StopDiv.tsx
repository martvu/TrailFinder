import React, {useState, Component, PropsWithChildren} from "react";

interface State {
  divs: { id: number; content: JSX.Element }[];
  values: string[];
  nextId: number;
}

const StopDiv: React.FC = () => {
  const [state, setState] = useState<State>({ divs: [], values: [], nextId: 0 });
  
  const addDiv = (): void => {
    const newId = state.nextId;
    const newDiv = { 
      id: newId, 
      content: (
        <div>
          <input 
            className="border mx-2 mb-1"
            type="text"
            placeholder='New Stop'
            onChange={(e) => {
              const newValues = [...state.values];
              newValues[newId] = e.target.value;
              setState((prevState) => ({
                divs: prevState.divs,
                values: newValues,
                nextId: prevState.nextId
              }));
            }}
          />
        </div>
      ) 
    };
    setState((prevState) => ({
      divs: [...prevState.divs, newDiv],
      values: [...prevState.values, ''],
      nextId: prevState.nextId + 1,
    }));
  };
  const removeDiv = (id: number): void => {
    setState((prevState) => ({
      divs: prevState.divs.filter((div) => div.id !== id),
      values: prevState.values.filter((value, index) => index !== id),
      nextId: prevState.nextId,
    }));
  };

  return (
    <div>
      Add stops: <button className="btn-primary btn-circle btn-solid btn-xs" onClick={addDiv}>+</button>
      {state.divs.map((div) => (
        <div className="flex flex-row ">
          <div key={div.id}>
            {div.content}
          </div>
          <button className="btn-secondary btn-circle btn-solid btn-xs" onClick={() => removeDiv(div.id)}>-</button>
        </div>
      ))}
    </div>
  );
};
export default StopDiv;