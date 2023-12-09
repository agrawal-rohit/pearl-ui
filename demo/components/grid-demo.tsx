import { Grid, Box, Text } from "../../src";

const GridDemo = () => {
  return (
    <Grid numCols={3} spacing="4">
      <Box p="4" bgColor="primary.500" borderRadius="m">
        <Text variant="p3" fontWeight="500" color="white">
          Item 1
        </Text>
      </Box>
      <Box p="4" bgColor="primary.500" borderRadius="m">
        <Text variant="p3" fontWeight="500" color="white">
          Item 2
        </Text>
      </Box>
      <Box p="4" bgColor="primary.500" borderRadius="m">
        <Text variant="p3" fontWeight="500" color="white">
          Item 3
        </Text>
      </Box>
      <Box p="4" bgColor="primary.500" borderRadius="m">
        <Text variant="p3" fontWeight="500" color="white">
          Item 4
        </Text>
      </Box>
      <Box p="4" bgColor="primary.500" borderRadius="m">
        <Text variant="p3" fontWeight="500" color="white">
          Item 5
        </Text>
      </Box>
      <Box p="4" bgColor="primary.500" borderRadius="m">
        <Text variant="p3" fontWeight="500" color="white">
          Item 6
        </Text>
      </Box>
      <Box p="4" bgColor="primary.500" borderRadius="m">
        <Text variant="p3" fontWeight="500" color="white">
          Item 7
        </Text>
      </Box>
    </Grid>
  );
};

export default GridDemo;
