import { observable, action, computed, runInAction } from "mobx";

export interface IPropsWithStore {
  store?: ExpenseStore;
}

export interface IPropsWithStoreRequired {
  store: ExpenseStore;
}

export interface IExpense {
  title: string;
  amount: number;
}

interface IExchangeRates {
  base: string;
  date: string;
  rates: {
    EUR: number;
  };
}

export class Expense implements IExpense {
  constructor(
    private store: ExpenseStore,
    public id: number,
    public title: string,
    public amount: number
  ) {}

  @computed get amountInEur(): number {
    return this.amount * this.store.conversionRate;
  }

  @action destroy() {
    this.store.expensesList.remove(this);
  }
}

export type TColNames = "title" | "pln" | "eur";
export type TSortTypes = "asc" | "desc";

type TSortArgs = (a: Expense, b: Expense) => number;
const sortAscByAmount: TSortArgs = (a, b) => b.amount - a.amount;
const sortDescByAmount: TSortArgs = (a, b) => a.amount - b.amount;
const sortAscByTitle: TSortArgs = (a, b) => a.title.localeCompare(b.title);
const sortDescByTitle: TSortArgs = (a, b) => sortAscByTitle(b, a);

export class ExpenseStore {
  private nextID: number = 1;
  readonly expensesList = observable<Expense>([]);
  @observable conversionRate: number = 0.2312;
  @observable state: "done" | "pending" | "error" = "done";
  @observable sortBy: TColNames = "title";
  @observable sortType: TSortTypes = "asc";

  @computed get sortedExpensesList(): Expense[] {
    const list = this.expensesList.slice(0);

    let sortMethod;
    if (this.sortBy === "pln" || this.sortBy === "eur") {
      sortMethod = this.sortType === "asc" ? sortAscByAmount : sortDescByAmount;
    } else {
      sortMethod = this.sortType === "asc" ? sortAscByTitle : sortDescByTitle;
    }

    list.sort(sortMethod);

    return list;
  }

  add(expense: IExpense): void {
    this.expensesList.push(
      new Expense(this, this.nextID++, expense.title, expense.amount)
    );
  }

  @computed get totalInPLN(): number {
    return this.expensesList.reduce((a, item) => a + item.amount, 0);
  }

  @computed get totalInEUR(): number {
    return this.totalInPLN * this.conversionRate;
  }

  @action async fetchCurrentConversionRate() {
    this.state = "pending";

    try {
      const data: IExchangeRates = await this.fetchFromExchangeRatesApi();

      runInAction(() => {
        this.state = "done";
        this.conversionRate = data.rates.EUR;
      });
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  }

  private async fetchFromExchangeRatesApi() {
    const url = "https://api.exchangeratesapi.io/latest?base=PLN&symbols=EUR";
    const response = await fetch(url);
    return await response.json();
  }
}

export default ExpenseStore;
