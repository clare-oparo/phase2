import { Box, Input } from '@chakra-ui/react';
function WineSearch({search, setSearch}) {
    return (
      <Box p={4} >
        <Input
          placeholder="Search for a wine..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          boxShadow="md"
        />
      </Box>
    );
  }
  
  export default WineSearch;
  