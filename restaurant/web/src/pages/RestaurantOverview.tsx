import { Flex, Box, Card, Text, CardBody } from '@chakra-ui/react';

const RestaurantOverview = () => {
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignContent="center"
      justifyContent="center"
      backgroundColor="#f0f0f0"
    >
      <Box m="0 auto">
        <Card>
          <CardBody>
            <Text>
              Restaurant 1
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Text>
              Restaurant 2
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Text>
              Restaurant 3
            </Text>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <Text>
              Restaurant 4
            </Text>
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
};

export default RestaurantOverview;
