import React from 'react'

export default function HistoryItem({ transaction, deleteTransaction }) {
  return (
    <li
      className={`history__item history__item-${transaction.add ? 'plus' : 'minus'} `}>{transaction.description}
      <span className="history__money">{transaction.add ? '+' : '-'}{transaction.amount} ₽</span>
      <button className="history__delete" onClick={() => deleteTransaction(transaction.id)}>x</button>
    </li>
  )
}