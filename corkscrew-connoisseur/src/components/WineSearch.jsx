import { Box, Input } from '@chakra-ui/react';
function WineSearch({search, setSearch}) {
    return (
      <Box px={4} pt='110px' >
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
  