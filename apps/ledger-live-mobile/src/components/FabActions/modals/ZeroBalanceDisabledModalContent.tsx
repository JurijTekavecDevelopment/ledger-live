import React, { useCallback, useState } from "react";
import { BottomDrawer, Flex } from "@ledgerhq/native-ui";
import { ModalOnDisabledClickComponentProps } from "../index";
import { useTranslation } from "react-i18next";
import { getAccountCurrency } from "@ledgerhq/live-common/account/index";
import ParentCurrencyIcon from "../../ParentCurrencyIcon";
import { NavigatorName, ScreenName } from "../../../const";
import { useNavigation } from "@react-navigation/native";
import Button from "../../wrappedUi/Button";

function ZeroBalanceDisabledModalContent({
  account,
  currency,
  action,
  onClose,
  isOpen,
}: ModalOnDisabledClickComponentProps) {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const actionCurrency = account ? getAccountCurrency(account) : currency;

  const goToBuy = useCallback(
    () =>
      navigation.navigate(NavigatorName.Exchange, {
        screen: ScreenName.ExchangeBuy,
        params: {
          defaultCurrencyId: actionCurrency.id,
          defaultAccountId: account && account.id,
        },
      }),
    [],
  );

  const goToReceive = useCallback(
    () =>
      navigation.navigate(NavigatorName.ReceiveFunds, {
        screen: account
          ? ScreenName.ReceiveConnectDevice
          : ScreenName.ReceiveSelectAccount,
        params: {
          selectedCurrency: actionCurrency,
          accountId: account && account.id,
        },
      }),
    [navigation],
  );

  return (
    <BottomDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={t("account.modals.zeroBalanceDisabledAction.title", {
        currencyTicker: actionCurrency.ticker,
      })}
      description={t("account.modals.zeroBalanceDisabledAction.description", {
        currencyTicker: actionCurrency.ticker,
        actionName: action.label,
      })}
      Icon={<ParentCurrencyIcon size={48} currency={actionCurrency} />}
    >
      <Flex mx={16} flexDirection={"row"}>
        <Button
          onPress={goToBuy}
          type="main"
          size={"large"}
          outline
          flex={1}
          mr={3}
        >
          {t("account.buy")}
        </Button>
        <Button
          onPress={goToReceive}
          type="main"
          size={"large"}
          outline
          flex={1}
        >
          {t("account.receive")}
        </Button>
      </Flex>
    </BottomDrawer>
  );
}

export default ZeroBalanceDisabledModalContent;