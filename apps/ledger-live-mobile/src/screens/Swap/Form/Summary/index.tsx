import React, { useMemo } from "react";
import { Flex, Tag, Text, Icons } from "@ledgerhq/native-ui";
import { useTranslation } from "react-i18next";
import { BigNumber } from "bignumber.js";
import { getProviderName } from "@ledgerhq/live-common/lib/exchange/swap/utils";
import {
  SwapTransactionType,
  ExchangeRate,
  KYCStatus,
} from "@ledgerhq/live-common/lib/exchange/swap/types";
import {
  getAccountName,
  getAccountUnit,
} from "@ledgerhq/live-common/lib/account";
import CurrencyUnitValue from "../../../../components/CurrencyUnitValue";
import { providerIcons } from "../../../../icons/swap";

interface Props {
  provider?: string;
  swapTx: SwapTransactionType;
  exchangeRate?: ExchangeRate;
  kyc?: KYCStatus;
}

export function Summary({
  provider,
  swapTx: {
    swap: { from, to },
    status,
  },
  exchangeRate,
  kyc,
}: Props) {
  const { t } = useTranslation();

  const name = useMemo(() => provider && getProviderName(provider), [provider]);

  const ProviderIcon = useMemo(
    () => provider && providerIcons[provider.toLowerCase()],
    [provider],
  );

  const fromUnit = useMemo(() => from.account && getAccountUnit(from.account), [
    from.account,
  ]);

  const rate = useMemo(() => "", []);

  const targetAccountName = useMemo(
    () => to.account && getAccountName(to.account),
    [to.account],
  );

  const fees = useMemo(() => status?.estimatedFees ?? "", [status]);

  if (
    !provider ||
    !fromUnit ||
    !to.currency ||
    !targetAccountName ||
    !fees ||
    !ProviderIcon ||
    !exchangeRate
  ) {
    return null;
  }

  return (
    <Flex>
      <Item title={t("transfer.swap2.form.details.label.provider")}>
        <Flex flexDirection="row" alignItems="center">
          <ProviderStatusTag kyc={kyc} />
          <Flex paddingRight={2}>
            <ProviderIcon size={14} />
          </Flex>

          <Text>{name}</Text>
        </Flex>
      </Item>

      <Item title={t("transfer.swap2.form.details.label.rate")}>
        <Text>
          <CurrencyUnitValue
            value={new BigNumber(10).pow(fromUnit.magnitude)}
            unit={fromUnit}
            showCode
          />
          {" = "}
          <CurrencyUnitValue
            unit={to.currency.units[0]}
            value={new BigNumber(10)
              .pow(fromUnit.magnitude)
              .times(exchangeRate.magnitudeAwareRate)}
            showCode
          />
          {rate}
        </Text>
      </Item>

      <Item title={t("transfer.swap2.form.details.label.fees")}>
        <Text>
          <CurrencyUnitValue unit={fromUnit} value={fees} />
        </Text>
      </Item>

      <Item title={t("transfer.swap2.form.details.label.target")}>
        <Text>{targetAccountName}</Text>
      </Item>
    </Flex>
  );
}

// TODO background color with opacity
const statusThemeMap = {
  pending: {
    color: "warning.c100",
    Icon: Icons.ClockRegular,
  },
  approved: {
    color: "success.c100",
    Icon: Icons.CircledCheckRegular,
  },
  closed: {
    color: "error.c100",
    Icon: Icons.InfoRegular,
  },
  upgradeRequired: {
    color: "warning.c100",
    Icon: Icons.ClockRegular,
  },
};

function ProviderStatusTag({ kyc }: { kyc?: KYCStatus }) {
  const { t } = useTranslation();

  if (!kyc) {
    return null;
  }

  // @ts-expect-error
  const { color, Icon } = statusThemeMap[kyc.status] || {
    color: null,
    icon: null,
  };

  return (
    <Flex
      alignItems="center"
      flexDirection="row"
      borderRadius={4}
      padding={2}
      marginRight={2}
    >
      <Flex marginRight={2}>
        <Text variant="small" color={color}>
          {t(`transfer.swap2.form.providers.kyc.status.${kyc.status}`)}
        </Text>
      </Flex>
      <Icon size={12} color={color} />
    </Flex>
  );
}

interface RowProps {
  title: string;
  children: React.ReactNode;
}

function Item({ title, children }: RowProps) {
  return (
    <Flex flexDirection="row" justifyContent="space-between" paddingY={4}>
      <Text color="neutral.c70">{title}</Text>
      {children}
    </Flex>
  );
}
