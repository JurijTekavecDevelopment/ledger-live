import type { DeviceAction } from "../../bot/types";
import type { Transaction } from "./types";
import { deviceActionFlow } from "../../bot/specs";
import { formatCurrencyUnit } from "../../currencies";

export const acceptTransaction: DeviceAction<Transaction, any> =
  deviceActionFlow({
    steps: [
      {
        title: "Review",
        button: "Rr",
      },
      {
        title: "Amount",
        button: "Rr",
        expectedValue: ({ account, status }) => {
          const formattedValue =
            "CELO " +
            formatCurrencyUnit(account.unit, status.amount, {
              disableRounding: true,
            });

          if (!formattedValue.includes(".")) {
            // if the value is pure integer, in the app it will automatically add an .0
            return formattedValue + ".0";
          }

          return formattedValue;
        },
      },
      {
        title: "Address",
        button: "Rr",
        expectedValue: ({ transaction }) => transaction.recipient,
      },
      {
        title: "Max Fees",
        button: "Rr",
      },
      {
        title: "No Gateway Fee",
        button: "Rr",
      },
      {
        title: "Accept",
        button: "LRlr",
      },
    ],
  });
