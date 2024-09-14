import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function Profile() {
  return (
    <div>
      <Box w="100%" h="100vh">
        <Navbar />
        <Box pt={24}></Box>
      </Box>
    </div>
  );
}
