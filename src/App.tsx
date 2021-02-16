import { Box, Center, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import CartDrawer from "./items/drawer";
import Item from "./items/items";

const getProducts = async (): Promise<cartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<cartItemType[]>([]);

  const { isLoading, error, data } = useQuery<cartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);

  const getTotalItems = (items: cartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: cartItemType) => {
    setCartItems((c) => {
      const isItemInCart = c.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return c.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...c, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((c) =>
      c.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as cartItemType[])
    );
  };

  if (isLoading)
    return (
      <Box>
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      </Box>
    );

  if (error) return <div>An error has occurred: </div>;

  return (
    <>
      <h1>Shop</h1>
      <CartDrawer
        cartItems={cartItems}
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
      />
      <h1>{getTotalItems(cartItems)}</h1>
      {data?.map((item) => (
        <div key={item.id}>
          <Item item={item} handleAddToCart={handleAddToCart} />
        </div>
      ))}
    </>
  );
};

export default App;
