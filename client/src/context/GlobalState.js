import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//initialize the state

const initialState = {
  transaction: [],
  error: null,
  loading: true
};

export const GlobalContext = createContext(initialState); //passing in our initialstate
console.log(initialState.transaction)
//destructuring children

//wrap our children in GlobalProvider in App.js
export const GlobalPorvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  /*
  An alternative to useState. Accepts a reducer of type (state, action) => newState,
  and returns the current state paired with a dispatch method.useReducer is usually 
  preferable to useState when you have complex state logic that involves multiple 
  sub-values or when the next state depends on the previous one. useReducer also lets 
  you optimize performance for components that trigger deep updates because you can
   pass dispatch down instead of callbacks.
  */

  //actions
  async function getTransactions() {
    try {
      const res = await axios.get("/api/v1/transactions"); //we added a proxy so you dont have to add localhost5000
   
      //will give us the object and data is the array
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: "GET_TRANSACTIONS_ERROR",
        payload: err.response.data.error // this is from the axios call
      });
    }
  }

  async function deleteTransactions(id) {

    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id
      });
    } catch (err) {
      dispatch({
        type: "GET_TRANSACTIONS_ERROR",
        payload: err.response.data.error // this is from the axios call
      });
    }
  }

  async function addTransactions(transaction) {
    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    }

    try{
      const res = await axios.post('/api/v1/transactions',transaction, config)
      console.log('test3',res)
      dispatch({
        type: "ADD_TRANSACTION",
        payload: res.data.data
      });
       
    }catch(err){
      dispatch({
        type: "GET_TRANSACTIONS_ERROR",
        payload: err.response.data.error // this is from the axios call
      });
    }

  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transaction,
        deleteTransactions,
        addTransactions,
        getTransactions,
        error: state.error,
        loading: state.loading
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
