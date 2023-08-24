import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import bookingsData from '../dataMocks/bookings.json';

const MyBookings = () => {
  const [bookings, setBookings] = useState(bookingsData.bookings);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<number | null>(null);

  const onClose = () => setIsAlertDialogOpen(false);

  const cancelBooking = () => {
    if (bookingToCancel !== null) {
      setBookings(bookings.filter((_, i) => i !== bookingToCancel));
    }
    onClose();
  };

  const deleteRow = (index: number) => {
    setIsAlertDialogOpen(true);
    setBookingToCancel(index);
  };

  const cancelRef: React.RefObject<HTMLButtonElement> = React.useRef(null);

  return (
    <>
      <Box width="100%" overflowX="auto">
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Time</Th>
              <Th>Day</Th>
              <Th>Activity</Th>
              <Th>Cancel booking</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookings.map((booking, index) => (
              <Tr key={index}>
                <Td>{booking.time}</Td>
                <Td>{booking.day}</Td>
                <Td>
                  {booking.booking_type} -{' '}
                  {booking.treatment_name ||
                    booking.restaurant_name ||
                    booking.excursion_name}
                </Td>
                <Td>
                  <CloseIcon
                    cursor="pointer"
                    onClick={() => deleteRow(index)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <AlertDialog
        isOpen={isAlertDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel Booking
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to cancel your booking?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="blue" ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button colorScheme="red" onClick={cancelBooking} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default MyBookings;