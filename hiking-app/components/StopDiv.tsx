import React, {useState, Component, PropsWithChildren} from "react";


interface State {
  divs: { id: number; content: JSX.Element }[];
  nextId: number;
}
const MyComponent: React.FC = () => {
  const [state, setState] = useState<State>({ divs: [], nextId: 0 });
  const addDiv = (): void => {
    const newDiv = { id: state.nextId, content: <div>
        <input className="border mx-2 mb-1"
                  type="text"
                  placeholder='New Stop'>
                </input>
    </div> };
    setState((prevState) => ({
      divs: [...prevState.divs, newDiv],
      nextId: prevState.nextId + 1,
    }));
  };
  const removeDiv = (id: number): void => {
    setState((prevState) => ({
      divs: prevState.divs.filter((div) => div.id !== id),
      nextId: prevState.nextId,
    }));
  };
  return (
    <div>
      Add stops: <button className="btn-primary btn-circle btn-solid btn-sm" onClick={addDiv}>+</button>
      {state.divs.map((div) => (
        <div key={div.id}>
          {div.content}
          <button className="btn-secondary btn-circle btn-solid btn-sm" onClick={() => removeDiv(div.id)}>-</button>
        </div>
      ))}
    </div>
  );
};
export default MyComponent;