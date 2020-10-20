import React from 'react'
import HistoryItem from './HistoryItem'

export default function History({ transactions, deleteTransaction }) {
  return (
    <section className="history">
      <h3>История расходов</h3>
      <ul className="history__list">
        {transactions.map((transaction) =>
          <HistoryItem
            key={transaction.id}
            transaction={transaction}
            deleteTransaction={deleteTransaction}
          />
        )}
      </ul>
    </section>
  )
}
