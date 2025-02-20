import React, { useCallback, useContext } from "react";
import { useTranslation, Trans } from "react-i18next";
import { AsideFooter, Bullet, Column, IllustrationContainer } from "../shared";
import connectNano from "../assets/connectNano.png";

import { createAction } from "@ledgerhq/live-common/hw/actions/manager";
import { getEnv } from "@ledgerhq/live-common/env";
import DeviceAction from "~/renderer/components/DeviceAction";

import { mockedEventEmitter } from "~/renderer/components/debug/DebugMock";
import { command } from "~/renderer/commands";
import { useDispatch } from "react-redux";
import { saveSettings } from "~/renderer/actions/settings";
import { relaunchOnboarding } from "~/renderer/actions/onboarding";
import { track } from "~/renderer/analytics/segment";
import { OnboardingContext } from "../../../index";

const connectManagerExec = command("connectManager");
const action = createAction(getEnv("MOCK") ? mockedEventEmitter : connectManagerExec);

const Success = ({ device }: { device: Device }) => {
  const { t } = useTranslation();
  return (
    <Column>
      <Bullet
        icon="CheckAlone"
        text={t("onboarding.screens.tutorial.screens.genuineCheck.success.title")}
        subText={t("onboarding.screens.tutorial.screens.genuineCheck.success.desc", {
          deviceName: t(`devices.${device.modelId}`),
        })}
      />
    </Column>
  );
};

type Props = {
  connectedDevice: unknown;
  setConnectedDevice: (device: unknown) => void;
};

export function GenuineCheck({ connectedDevice, setConnectedDevice }: Props) {
  const dispatch = useDispatch();
  const { deviceModelId } = useContext(OnboardingContext);

  const onResult = useCallback(
    res => {
      setConnectedDevice(res.device);
      dispatch(saveSettings({ hasCompletedOnboarding: true }));
      dispatch(relaunchOnboarding(false));
      track("Onboarding - End");
    },
    [setConnectedDevice, dispatch],
  );

  return connectedDevice ? (
    <Success device={connectedDevice} />
  ) : (
    <DeviceAction
      overridesPreferredDeviceModel={deviceModelId}
      action={action}
      onResult={onResult}
      request={null}
    />
  );
}

GenuineCheck.Illustration = (
  <IllustrationContainer width="240px" height="245px" src={connectNano} />
);

const Footer = (props: any) => {
  const { t } = useTranslation();
  return (
    <AsideFooter
      {...props}
      text={t("onboarding.screens.tutorial.screens.recoveryHowTo.help.descr")}
    />
  );
};

GenuineCheck.Footer = Footer;

GenuineCheck.continueLabel = (
  <Trans i18nKey="onboarding.screens.tutorial.screens.genuineCheck.buttons.next" />
);
