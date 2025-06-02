import { Transaction } from "../types";

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    item: "Cigarette",
    amount: 20,
    type: "Cash",
    time: "10:30 AM"
  },
  {
    id: "2",
    item: "Pan Masala",
    amount: 15,
    type: "Online",
    time: "11:45 AM"
  },
  {
    id: "3",
    item: "Betel Leaf",
    amount: 10,
    type: "Cash",
    time: "12:15 PM"
  },
  {
    id: "4",
    item: "Soda",
    amount: 25,
    type: "Online",
    time: "01:30 PM"
  },
  {
    id: "5",
    item: "Sweet Pan",
    amount: 40,
    type: "Cash",
    time: "02:45 PM"
  }
];

export const QUICK_ITEMS = [
  { name: "Cigarette", price: 20 },
  { name: "Pan Masala", price: 15 },
  { name: "Betel Leaf", price: 10 },
  { name: "Sweet Pan", price: 40 },
  { name: "Soda", price: 25 },
  { name: "Mint", price: 5 },
  { name: "Chewing Gum", price: 10 },
  { name: "Meetha Pan", price: 50 }
];