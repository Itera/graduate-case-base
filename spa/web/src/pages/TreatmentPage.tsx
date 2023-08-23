import { useAccount, useMsal } from '@azure/msal-react';
import { Box, Button, Flex, Heading, Text, Tooltip } from '@chakra-ui/react';
import { Guest, Room } from 'cms-types';
import { useEffect } from 'react';
import useAccessToken from '../auth/useAccessToken';
import { useGet } from '../hooks/useGet';

const TreatmentPage = () => {
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const accessToken = useAccessToken();

  const {
    data: guest,
    isLoading,
    mutate
  } = useGet<Guest>(`/guests/${account?.localAccountId}`);

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
          What treatments would you like to book, {account?.name}?
        </Heading>
      </Box>
    </Flex>
  );
};

export default TreatmentPage;
