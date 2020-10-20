import React from 'react'

export default function Operation({ addTransaction, addDescription, addAmount, description, amount }) {
  return (
    <section className="operation">
      <h3>Новая операция</h3>

      <form id="form">
        <label>
          <input
            type="text"
            className="operation__fields operation__name"
            placeholder="Наименование операции"
            onChange={addDescription}
            value={description}
          />
        </label>

        <label>
          <input
            type="number"
            className="operation__fields operation__amount"
            placeholder="Введите сумму"
            onChange={addAmount}
            value={amount}
          />
        </label>

        <div className="operation__btns">
          <button
            onClick={() => addTransaction(true)}
            type="button"
            className="operation__btn operation__btn-add"
          >
            ДОХОД
          </button>

          <button
            onClick={() => addTransaction(false)}
            type="button"
            className="operation__btn operation__btn-subtract"
          >
            РАСХОД
          </button>
        </div>

      </form>
    </section>
  )
}
