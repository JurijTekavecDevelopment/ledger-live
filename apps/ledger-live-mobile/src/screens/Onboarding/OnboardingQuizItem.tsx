import React, { useState } from "react";
import { Flex, Text } from "@ledgerhq/native-ui";
import { Base as BaseButton } from "@ledgerhq/native-ui/components/cta/Button";
import { Image } from "react-native";
import Button from "../../components/PreventDoubleClickButton";

import successImage from "../../images/illustration/Light/_053.png";
import failImage from "../../images/illustration/Light/_054.png";

type Answer = {
  answer: string;
  correct: boolean;
  title?: string;
  desc: string;
};

type Props = {
  data: {
    question: string;
    image: any;
    answers: Answer[];
  };
  // eslint-disable-next-line no-unused-vars
  onNext: (correct: boolean) => void;
  setBg: (_: string) => void;
  cta: string;
};

export default function OnboardingQuizItem({
  data: { question, image, answers },
  onNext,
  cta,
  setBg,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | undefined>();

  return (
    <Flex flex={1}>
      <Flex flex={1} px={6} py={7}>
        <Flex flex={1} alignItems="center" justifyContent="center">
          <Image
            source={
              selectedAnswer
                ? selectedAnswer.correct
                  ? successImage
                  : failImage
                : image
            }
            style={{ width: "100%", height: 200 }}
            resizeMode="contain"
          />
          {selectedAnswer ? (
            <>
              <Text
                variant="h2"
                mt={8}
                mb={7}
                textAlign="center"
                color="constant.black"
              >
                {selectedAnswer.title}
              </Text>
              <Text variant="body" textAlign="center" color="constant.black">
                {selectedAnswer.desc}
              </Text>
            </>
          ) : (
            <Text variant="h2" mt={8} textAlign="center" color="constant.black">
              {question}
            </Text>
          )}
        </Flex>

        {selectedAnswer ? (
          <Button
            type="main"
            size="large"
            onPress={() => onNext(selectedAnswer.correct)}
          >
            {cta}
          </Button>
        ) : (
          answers.map((answer, i) => (
            <BaseButton
              type="shade"
              outline
              key={i}
              onPress={() => {
                setSelectedAnswer(answer);
                setBg(answer.correct ? "success.c100" : "error.c100");
              }}
              mt={6}
            >
              <Text
                variant="body"
                flex={1}
                textAlign="center"
                color="constant.black"
              >
                {answer.answer}
              </Text>
            </BaseButton>
          ))
        )}
      </Flex>
    </Flex>
  );
}
