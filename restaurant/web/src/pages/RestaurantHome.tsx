import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react"
import data from "./menu.json";
import Menu from "./Menu";
import theme from "../theme";



const RestaurantHome = () => {

    
      

    return (
        <Stack spacing={4} direction="column" align="center" bgColor={theme.colors["explore-blue"].main} >

        <Box p={4} alignContent="center">
            <Heading as="h1" size="2xl" color={theme.colors["explore-yellow"].main}>
                    Restaurant Name
                </Heading>
                <Text mt={4} color={theme.colors["explore-yellow"].main}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
                    mauris vel sapien tincidunt, vel bibendum sapien bibendum. Nulla
                    facilisi. Sed euismod mauris vel sapien tincidunt, vel bibendum sapien
                    bibendum. Nulla facilisi.
                </Text>
                <Button mt={4} bgColor={theme.colors["explore-yellow"].main} textColor={theme.colors["explore-blue"].main}>
                    Book a Table
                </Button>
            </Box>
  

        <Menu courses={data.courses} />

        </Stack>

    )
}

export default RestaurantHome;