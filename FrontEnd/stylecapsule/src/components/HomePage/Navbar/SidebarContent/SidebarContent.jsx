import {
    Box,
    CloseButton,
    Flex,
    useColorModeValue,
    Text,
  } from '@chakra-ui/react';

  import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiSettings,
  } from 'react-icons/fi';
import { NavItem } from './NavItems/NavItems';

export const SidebarContent = ({ onClose, ...rest }) => {


    const LinkItems = [
        { name: 'Home', icon: FiHome },
        { name: 'Trending', icon: FiTrendingUp },
        { name: 'Explore', icon: FiCompass },
        { name: 'Favourites', icon: FiStar },
        { name: 'Settings', icon: FiSettings },
      ];

      
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Logo
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    );
  };