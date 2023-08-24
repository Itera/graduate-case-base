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
} from '@chakra-ui/react';

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
      <Box>
        <Text fontSize="xl">
          {isWaitlist
            ? 'You have been added to the waitlist. You will recive a call if there is an opening. Hope you have a good day!'
            : 'Your reservation has been submitted and we have sent a confirmation to you on email. We look forward to seeing you!'}
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <VStack spacing={4}>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl id="partySize">
          <FormLabel>Party Size</FormLabel>
          <NumberInput
            min={1}
            value={partySize}
            onChange={(_, value) => setPartySize(value)}
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl id="reservationTime">
          <FormLabel>Reservation Time</FormLabel>
          <Input
            type="time"
            value={reservationTime}
            onChange={(e) => setReservationTime(e.target.value)}
          />
        </FormControl>

        <Button colorScheme="blue" onClick={handleSubmit}>
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