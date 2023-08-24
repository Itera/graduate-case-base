import { useAccount, useMsal } from '@azure/msal-react';
import {Box, Card, CardBody, CardHeader, Flex, Heading, Stack, StackDivider, Text} from '@chakra-ui/react';
import { Guest, Room } from 'cms-types';
import { useEffect } from 'react';
import useAccessToken from '../auth/useAccessToken';
import { useGet } from '../hooks/useGet';
import { useLocation } from 'react-router-dom'

const ConfirmationPage = () => {
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const accessToken = useAccessToken();
  const location = useLocation();
  
  const {
    data: guest,
    isLoading,
    mutate
  } = useGet<Guest>(`/guests/${account?.localAccountId}`);

  const { data: room } = useGet<Room>(
    `/rooms/${guest?.roomId}`,
    guest?.roomId != undefined && guest?.roomId != ''
  );

  useEffect(() => {
    if (isLoading) return;

    const checkAndCreateGuest = async () => {
      if (guest?.id == '' && account) {
        const newGuestData = {
          firstName: account?.name?.split(' ').slice(0, -1).join(' '),
          lastName: account?.name?.split(' ').slice(-1).join(' '),
          id: account?.localAccountId,
          email: account?.username
        };

        try {
          const response = await fetch(
            import.meta.env.VITE_API_BASE_URL + '/guests',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
              },
              body: JSON.stringify(newGuestData)
            }
          );

          const createdGuest = await response.json();

          mutate(createdGuest, false);
        } catch (e) {
          console.log(e);
        }
      }
    };

    checkAndCreateGuest();
  }, [guest, account, accessToken, mutate, isLoading]);

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
          <CardHeader>
            <Heading size='md'>Order Confirmation {room?.roomNumber}</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Treatment
                </Heading>
                <Text pt='2' fontSize='sm'>
                  You have booked a session in {location.state.treatment}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Place
                </Heading>
                <Text pt='2' fontSize='sm'>
                  Check out the place of treatment
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Time
                </Heading>
                <Text pt='2' fontSize='sm'>
                  Your treatment is scheduled to start {location.state.time}
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
};


export default ConfirmationPage;
