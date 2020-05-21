/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  totalIncome: any;

  totalOutcome: any;

  totalBalance: any;

  constructor() {
    this.transactions = [];
    this.totalBalance = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(item => item.type === 'income')
      .reduce((acumulator, balance) => {
        return acumulator + balance.value;
      }, 0);

    const outcome = this.transactions
      .filter(item => item.type === 'outcome')
      .reduce((acumulator, balance) => {
        return acumulator + balance.value;
      }, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
