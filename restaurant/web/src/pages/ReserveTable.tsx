import { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Button,
  VStack,
  Text,
  useToast,
  Link,
  Center,
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  CardFooter,
} from '@chakra-ui/react';
import theme from '../theme';
import { Link as ReactLink } from 'react-router-dom';

const ReserveTable = () => {
  const availableSeats = 3;
  const [name, setName] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [reservationTime, setReservationTime] = useState('');
  const [isWaitlist, setIsWaitlist] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toast = useToast();

  const handleSubmit = () => {
    if (name && partySize && reservationTime) {
      console.log('Reservation submitted:', {
        name,
        partySize,
        reservationTime,
        isWaitlist,
      });

      setIsSubmitted(true);
      toast({
        title: isWaitlist
          ? 'Added to the waitlist'
          : 'Reservation submitted',
        description: isWaitlist
          ? 'You have been added to the waitlist.'
          : 'Your reservation has been submitted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      alert('Please fill in all fields');
    }
  };

  if (isSubmitted) {
    return (
        
      <Box padding= "64px 32px 600px 32px" bgColor={theme.colors["explore-blue"].main} color={theme.colors["explore-yellow"].main}>
        <Center>
            <VStack>
                {isWaitlist && (
                    <VStack>
        <Text fontSize="xl">
          You have been added to the waitlist. You will recive a call if there is an opening. However, there is available tables at the restaurant below.
        </Text>

        <Text fontSize='l' marginTop='32px' marginBottom='0px'>
            Suggested restaurant with available seats:
        </Text>

        <Link as={ReactLink} to="/restaurant" marginTop='0px' paddingTop='0px'>
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
        </Link>

        </VStack>)
        }
        {!isWaitlist && (
        <Text fontSize="xl">
          
            Your reservation has been submitted and we have sent a confirmation to you on email. We look forward to seeing you!
        </Text>)}

        <Link as={ReactLink} to="/">
                    <Button mt={4} bgColor={theme.colors["explore-yellow"].main} textColor={theme.colors["explore-blue"].main}>
                    Go back
                </Button></Link>
                </VStack>
                </Center>
                
        
      </Box>
    );
  }

  return (
    <Box bgColor={theme.colors["explore-blue"].main} padding="16px">
      <VStack spacing={4}>
        <FormControl id="name">
          <FormLabel color={theme.colors["explore-yellow"].main}>Name</FormLabel>
          <Input
          borderColor={theme.colors["explore-yellow"].main}
          bgColor={theme.colors["explore-gray"].main}
          type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
                      />
        </FormControl>

        <FormControl id="partySize">
          <FormLabel color={theme.colors["explore-yellow"].main}>Party Size</FormLabel>
          <NumberInput
          borderColor={theme.colors["explore-yellow"].main}
          bgColor={theme.colors["explore-gray"].main}
            min={1}
            value={partySize}
            onChange={(_, value) => setPartySize(value)}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl id="reservationTime">
          <FormLabel color={theme.colors["explore-yellow"].main}>Reservation Time</FormLabel>
          <Input
          bgColor={theme.colors["explore-gray"].main}

          borderColor={theme.colors["explore-yellow"].main}
            type="datetime-local"
            value={reservationTime}
            onChange={(e) => setReservationTime(e.target.value)}
          />
        </FormControl>

        <Button colorScheme="blue" bgColor={theme.colors["explore-yellow"].main} onClick={handleSubmit}>
          Reserve
        </Button>

        {partySize > availableSeats && reservationTime && (
          <Box>
            <Text color="red.500">We are fully booked.</Text>
            <Button
              colorScheme="yellow"
              onClick={() => {
                setIsWaitlist(true);
                handleSubmit();
              }}
            >
              Add to Waitlist
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default ReserveTable;