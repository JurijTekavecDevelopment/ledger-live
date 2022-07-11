// this test self-document in a markdown file what are in our environment files
// so we have a clear and alternative way to see the big picture of our envs

import fs from "fs";
import expect from "expect";

const outputFile = "mobile-env.md";
function main() {
  const md = gen();
  const existing = fs.readFileSync(outputFile, "utf-8");
  fs.writeFileSync(outputFile, md);
  // the fact it's a test will make sure the doc is always kept in sync
  expect(existing).toBe(md);
}

function gen() {
  let md = `<!-- this file is generated by mobile-env-md.test.ts -->\n`;

  md +=
    "> This self generated file documents all environments we have on our different mobile OS (iOS, Android) and targets (release, staging, nightly). What we call 'staging' refers to any custom build done on 'ledger-live-build'.\n";

  // add all the env you want documented

  md += "# App name\n";
  md += genTable(({ env }) => {
    const { APP_NAME } = env;
    if (!APP_NAME) return "❌";
    return APP_NAME;
  });

  md += "# App identifier\n";
  md += genTable(({ fastlaneEnv }) => {
    const { APP_IDENTIFIER } = fastlaneEnv;
    if (!APP_IDENTIFIER) return "❌";
    return APP_IDENTIFIER;
  });

  md += "# Sentry projects\n";
  md += genTable(({ env, fastlaneEnv }) => {
    const { SENTRY_PROJECT, SENTRY_ENVIRONMENT } = fastlaneEnv;
    const { SENTRY_DSN } = env;
    if (!SENTRY_PROJECT) return "N/A";
    if (!SENTRY_ENVIRONMENT) return "❌ SENTRY_ENVIRONMENT missing";
    if (!SENTRY_DSN) return "❌ SENTRY_DSN missing";
    return `[${SENTRY_PROJECT}](https://sentry.io/organizations/ledger/projects/${SENTRY_PROJECT})`;
  });

  md += "# Google Service (feature flag)\n";
  md += genTable(({ env }) => {
    const { GOOGLE_SERVICE_INFO_NAME } = env;
    if (!GOOGLE_SERVICE_INFO_NAME) return "N/A";
    return GOOGLE_SERVICE_INFO_NAME;
  });

  return md;
}

// ~~~ utils ~~~ //

function genTable(getCell) {
  return (
    "| target | iOS | Android |\n" +
    "|--|--|--|\n" +
    ["production", "nightly", "staging"]
      .map(
        target =>
          "|" +
          target +
          "|" +
          ["ios", "android"]
            .map(os => {
              const env = readEnv(false, os, target);
              const fastlaneEnv = readEnv(true, os, target);
              return getCell({ fastlaneEnv, env });
            })
            .join("|") +
          "|",
      )
      .join("\n") +
    "\n"
  );
}

function readEnvFile(path) {
  const data = fs.readFileSync(path, "utf-8");
  const envs = {};
  data.split("\n").forEach(line => {
    const values = line.split("=").map(v => v.trim());
    if (values.length !== 2) return;
    const [key, value] = values;
    if (!key || !value) return;
    let parsed;
    try {
      parsed = JSON.parse(value);
    } catch (e) {
      parsed = value;
    }
    envs[key] = parsed;
  });
  return envs;
}

function readEnv(inFastlane, os, target) {
  const path = `${inFastlane ? "fastlane/" : ""}.env.${os}.${target}`;
  return readEnvFile(path);
}

main();
