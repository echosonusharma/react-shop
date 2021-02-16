import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import CartItem from "./cart-item";

interface Props {
  cartItems: cartItemType[];
  addToCart: (clickedItem: cartItemType) => void;
  removeFromCart: (id: number) => void;
}

const CartDrawer: React.FC<Props> = ({
  cartItems,
  addToCart,
  removeFromCart,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<any>();
  const calculateTotal = (items: cartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Cart</DrawerHeader>

            <DrawerBody>
              <Box>
                {cartItems.length === 0 ? <p>No items in cart.</p> : null}
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default CartDrawer;
