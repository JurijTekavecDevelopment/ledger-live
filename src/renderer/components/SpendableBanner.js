// @flow
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import type { Account, AccountLike, Transaction } from "@ledgerhq/live-common/lib/types";
import { getAccountUnit } from "@ledgerhq/live-common/lib/account";
import { getAccountBridge } from "@ledgerhq/live-common/lib/bridge";
import { useDebounce } from "~/renderer/hooks/useDebounce";
import type { ThemedComponent } from "~/renderer/styles/StyleProvider";
import InfoCircle from "~/renderer/icons/InfoCircle";
import FormattedVal from "~/renderer/components/FormattedVal";
import Box from "./Box";
import Text from "./Text";

const Container: ThemedComponent<{}> = styled(Box).attrs(() => ({
  horizontal: true,
  py: 1,
  px: 2,
  bg: "palette.text.shade10",
}))`
  border-radius: 4px;
  align-items: center;
`;

type Props = {
  account: AccountLike,
  transaction: Transaction,
  parentAccount: ?Account,
};

const SpendableBanner = ({ account, parentAccount, transaction }: Props) => {
  const { t } = useTranslation();
  const [maxSpendable, setMaxSpendable] = useState(null);

  const debouncedTransaction = useDebounce(transaction, 500);

  useEffect(() => {
    if (!account) return;
    let cancelled = false;
    getAccountBridge(account, parentAccount)
      .estimateMaxSpendable({
        account,
        parentAccount,
        transaction: debouncedTransaction,
      })
      .then(estimate => {
        if (cancelled) return;
        setMaxSpendable(estimate);
      });

    return () => {
      cancelled = true;
    };
  }, [account, parentAccount, debouncedTransaction]);

  const accountUnit = getAccountUnit(account);

  return (
    <Container>
      <InfoCircle size={12} />
      <Text ff="Inter|Medium" fontSize={3} style={{ paddingLeft: 8 }}>
        {t("send.steps.amount.banner")}
      </Text>
      <Text ff="Inter|Bold" fontSize={3} style={{ paddingLeft: 4 }}>
        ~
      </Text>
      <Text ff="Inter|Bold" fontSize={3} style={{ paddingLeft: 2 }}>
        {maxSpendable ? (
          <FormattedVal
            style={{ width: "auto" }}
            color="palette.text.shade100"
            val={maxSpendable}
            unit={accountUnit}
            showCode
          />
        ) : null}
      </Text>
    </Container>
  );
};

export default SpendableBanner;
