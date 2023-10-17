import React from "react";
import { Center, Text, VStack, HStack, Progress } from "native-base";

const ResponseData = ({ data: response }) => {
  if (!response) return null;

  return (
    <Center paddingY={4}>
      <Text style={{ fontSize: 22 }}>{response.predictedLabel}</Text>
      <Center w="100%" maxW="400" marginTop={8}>
        <VStack space="md">
          {response.score.map((val, i) => (
            <HStack space={3} key={i}>
              <Text>{i + 1}.</Text>
              <Progress width={160} colorScheme="primary" value={val * 100} />
              <Text>{(val * 100).toFixed(2)}%</Text>
            </HStack>
          ))}
        </VStack>
      </Center>
    </Center>
  );
};

export default ResponseData;
