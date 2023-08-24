import { useAccount, useMsal } from '@azure/msal-react';
import { Box, Button, Flex, Heading, Link, Text, Tooltip } from '@chakra-ui/react';
import { Guest, Room } from 'cms-types';
import { useEffect } from 'react';
import useAccessToken from '../auth/useAccessToken';
import { useGet } from '../hooks/useGet';
import { Link as ReactLink } from 'react-router-dom';

const Home = () => {  
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const accessToken = useAccessToken();

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
        <Heading as="h1" textAlign="center" fontSize="5xl" mt="100px">
          Welcome, {account?.name}!
        </Heading>
        <Text fontSize="xl" textAlign="center" mt="30px">
          {guest && guest.id == ''
            ? 'Hang on, we are creating a guest account for you...'
            : room && room.roomNumber == ''
            ? 'Hang on, your room is not ready yet...'
            : 'Your room number is ' + room?.roomNumber}
        </Text>
        <Box>
          {accessToken &&
            CopyToClipboardButton(
              accessToken,
              'Copy access token to clipboard'
            )}
        </Box>
        <Link as={ReactLink} to="/restaurant/1"><Button variant='solid' colorScheme='blue'> Restaurant</Button></Link>
      </Box>
    </Flex>
  );
};

const CopyToClipboardButton = (text: string, label?: string) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  return (

    <Tooltip label={label ?? 'Copy to clipboard'}>

      <Button
        w="fit-content"
        p="4"
        px="4px"
        colorScheme="blue"
        borderRadius="10px"
        m="0 auto"
        mt="8"
        fontWeight="bold"
        color="white"
        fontSize="l"
        onClick={copyToClipboard}
        >
        📄
      </Button>
    </Tooltip>
  );
};

export default Home;
