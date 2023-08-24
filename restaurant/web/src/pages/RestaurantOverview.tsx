import {
  Box,
  Card,
  Text,
  CardBody,
  Image,
  Stack,
  CardFooter,
  Button,
  Heading,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import theme from "../theme";

const RestaurantOverview = () => {
  return (
    <Stack
      direction="column" 
      align="center"
      alignContent="center"
      justifyContent="center"
      backgroundColor={theme.colors['explore-light-blue'].main}
    >
      <Box 
        height='100%'
      >
        <ChakraLink as={ReactRouterLink} to="/restaurant">
          <Card
            p={6}
            m={8}
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
                  recusandae neque, velit praesentium numquam ducimus totam
                  atque illo nam qui!
                </Text>
              </CardBody>

              <CardFooter>
                <Button variant="outline" color="#FFB46D">
                  Book
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </ChakraLink>

        <ChakraLink as={ReactRouterLink} to="/restaurant">
          <Card
            p={6}
            m={8}
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
                  recusandae neque, velit praesentium numquam ducimus totam
                  atque illo nam qui!
                </Text>
              </CardBody>

              <CardFooter>
                <Button variant="outline" color="#FFB46D">
                  Book
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </ChakraLink>

        <ChakraLink as={ReactRouterLink} to="/restaurant">
          <Card
            p={6}
            m={8}
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
                  recusandae neque, velit praesentium numquam ducimus totam
                  atque illo nam qui!
                </Text>
              </CardBody>

              <CardFooter>
                <Button variant="outline" color="#FFB46D">
                  Book
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </ChakraLink>

        <ChakraLink as={ReactRouterLink} to="/restaurant">
          <Card
            p={6}
            m={8}
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
                  recusandae neque, velit praesentium numquam ducimus totam
                  atque illo nam qui!
                </Text>
              </CardBody>

              <CardFooter>
                <Button variant="outline" color="#FFB46D">
                  Book
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </ChakraLink>
      </Box>
    </Stack>
  );
};

export default RestaurantOverview;
