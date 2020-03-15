import React, {useContext} from "react";
import {GlobalContext} from '../context/GlobalState'

//same as doing props.transaction.text
function Transaction({ transaction }) {
  
  const {deleteTransactions} = useContext(GlobalContext)
  const sign = transaction.amount > 0 ? "+" : "-";

  return (
    <li className={transaction.amount > 0 ? 'plus' : 'minus'}>
      {transaction.text}
      <span>
        {sign}${Math.abs(transaction.amount)}
      </span>
      <button onClick={()=> deleteTransactions(transaction._id)} className="delete-btn"> x </button>
    </li>
  );
}

export default Transaction;
