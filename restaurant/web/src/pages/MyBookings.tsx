import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const MyBookings = () => {
  const [bookings, setBookings] = useState([
    { time: '08:45', activity: 'Spa' },
    { time: '15:40', activity: 'Fishing Trip' },
    { time: '19:00', activity: 'Dinner at Glacier' },
  ]);

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
      <TableContainer>
        <Table variant="striped" colorScheme="blue">
          <Thead>
            <Tr>
              <Th>Time</Th>
              <Th>Activity</Th>
              <Th>Cancel booking</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookings.map((booking, index) => (
              <Tr key={index}>
                <Td>{booking.time}</Td>
                <Td>{booking.activity}</Td>
                <Td>
                  <CloseIcon cursor="pointer" onClick={() => deleteRow(index)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

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