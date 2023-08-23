import { Box, Text } from "@chakra-ui/react";
import theme from "../theme";




      export interface Course {
        title: string;
        description: string;
        allergies: string;
        picture: string;
        price: number;
      }
      
      export interface MenuProps {
        courses: Course[];
      }
      
      function Menu({ courses }: MenuProps) {
        return (
          <Box display="flex" flexWrap="wrap" bgColor={theme.colors["explore-blue"].main}>
      {courses.map((course) => (
        <Box
          key={course.title}
          p={2}
          shadow="md"
          borderWidth="0px"
          width="100%"
          height="100%"
          m={4}
          borderRadius="md"
          backgroundColor={theme.colors["explore-yellow"].main}
        >
          <Text fontStyle="" fontSize="xl" fontWeight="bold" color={theme.colors["explore-blue"].main}>
            {course.title}
          </Text>
          <Text mt={2} color={theme.colors["explore-blue"].main}>{course.description}  </Text>
          <Text mt={2} fontWeight="bold" color={theme.colors["explore-blue"].main}>
            Allergies: {course.allergies}
          </Text>
          <img
            src={course.picture}
            alt={course.title}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />
          <Text mt={2} color={theme.colors["explore-blue"].main}>Price: {course.price} €</Text>
        </Box>
      ))}
    </Box>
  );
    }
    
      

export default Menu;
