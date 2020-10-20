import React, { Component } from 'react'

import History from './Components/History';
import Operation from './Components/Operation';
import Total from './Components/Total';

export default class App extends Component {

  state = {
    transactions: JSON.parse(localStorage.getItem('calcMoney')) || [],
    description: '',
    amount: '',
    balance: 0,
    income: 0,
    costs: 0,
  }

  componentDidMount() {
    this.getTotalBalance()
  }

  addDescription = (e) => {
    this.setState({ description: e.target.value })
  }

  addAmount = (e) => {
    this.setState({ amount: parseFloat(e.target.value) })
  }

  addTransaction = (add) => {
    const transaction = {
      id: `cmr${(+new Date()).toString(16)}`,
      description: this.state.description,
      amount: this.state.amount,
      add
    }

    const transactions = [...this.state.transactions, transaction]

    this.setState({
      transactions,
      description: '',
      amount: '',
    }, () => {
      this.getTotalBalance()
      this.addLocalStorage()
    })
  }

  deleteTransaction = (id) => {
    const transactions = this.state.transactions.filter((transaction) => transaction.id !== id)

    this.setState(
      { transactions },
      () => {
        this.getTotalBalance()
        this.addLocalStorage()
      })
  }

  getIncome() {
    return this.state.transactions
      .reduce((acc, transaction) => transaction.add ? acc + transaction.amount : acc, 0)
    // .filter((transaction) => transaction.add)
    // .reduce((acc, transaction) => acc + Number(transaction.amount), 0)
  }

  getCosts() {
    return this.state.transactions
      .reduce((acc, transaction) => !transaction.add ? acc + transaction.amount : acc, 0)
    // .filter((transaction) => !transaction.add)
    // .reduce((acc, transaction) => acc + Number(transaction.amount), 0)
  }

  getTotalBalance() {
    const income = this.getIncome()
    const costs = this.getCosts()
    const balance = income - costs

    this.setState({ income, costs, balance })
  }

  addLocalStorage() {
    localStorage.setItem('calcMoney', JSON.stringify(this.state.transactions))
  }

  render() {
    return (
      <>
        <header>
          <h1>Калькулятор доходов и расходов</h1>
        </header>

        <main>
          <div className="container">

            <Total
              balance={this.state.balance}
              income={this.state.income}
              costs={this.state.costs}
            />
            <Operation
              addTransaction={this.addTransaction}
              addAmount={this.addAmount}
              addDescription={this.addDescription}
              description={this.state.description}
              amount={this.state.amount}
            />
            <History
              transactions={this.state.transactions}
              deleteTransaction={this.deleteTransaction}
            />

          </div>
        </main>
      </>
    )
  }
}