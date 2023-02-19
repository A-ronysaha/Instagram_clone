import React, { useState, createContext, useReducer } from "react";
import { Userreducer, initialState } from "../Reducer/Userreducer";

export const InstaContext = createContext();
export const InstaDispatchContext = createContext();

export default function InstaProvider(props) {
  const [userState, dispatch] = useReducer(Userreducer, initialState);
  return (
    <div>
      <InstaContext.Provider value={userState}>
        <InstaDispatchContext.Provider value={dispatch}>
          {props.children}
        </InstaDispatchContext.Provider>
      </InstaContext.Provider>
    </div>
  );
}
