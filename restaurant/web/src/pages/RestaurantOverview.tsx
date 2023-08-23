import {
  Flex,
  Box,
  Card,
  Text,
  CardBody,
  Image,
  Stack,
  CardFooter,
  Button,
  Heading
} from '@chakra-ui/react';

const RestaurantOverview = () => {
  return (
    <Flex
      width="100vw"
      height="100vh"
      alignContent="center"
      justifyContent="center"
      backgroundColor="#f0f0f0"
    >
      <Box>
        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: '100%', sm: '200px' }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody>
              <Heading size="md">The Arctic Penguin</Heading>

              <Text py="2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. A
                recusandae neque, velit praesentium numquam ducimus totam atque
                illo nam qui!
              </Text>
            </CardBody>

            <CardFooter>
              <Button variant="solid" colorScheme="blue">
                Book here
              </Button>
            </CardFooter>
          </Stack>
        </Card>

        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: '100%', sm: '200px' }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody>
              <Heading size="md">The South Pole</Heading>

              <Text py="2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. A
                recusandae neque, velit praesentium numquam ducimus totam atque
                illo nam qui!
              </Text>
            </CardBody>

            <CardFooter>
              <Button variant="solid" colorScheme="blue">
                Book here
              </Button>
            </CardFooter>
          </Stack>
        </Card>

        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: '100%', sm: '200px' }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody>
              <Heading size="md">The North Pole</Heading>

              <Text py="2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. A
                recusandae neque, velit praesentium numquam ducimus totam atque
                illo nam qui!
              </Text>
            </CardBody>

            <CardFooter>
              <Button variant="solid" colorScheme="blue">
                Book here
              </Button>
            </CardFooter>
          </Stack>
        </Card>

        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: '100%', sm: '200px' }}
            src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt="Caffe Latte"
          />

          <Stack>
            <CardBody>
              <Heading size="md">The South Pole</Heading>

              <Text py="2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. A
                recusandae neque, velit praesentium numquam ducimus totam atque
                illo nam qui!
              </Text>
            </CardBody>

            <CardFooter>
              <Button variant="solid" colorScheme="blue">
                Book here
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </Box>
    </Flex>
  );
};

export default RestaurantOverview;
