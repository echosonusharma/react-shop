import { Button } from "@chakra-ui/react";
import React from "react";

interface Props {
  item: cartItemType;
  addToCart: (clickedItem: cartItemType) => void;
  removeFromCart: (id: number) => void;
}

const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <>
      <div>
        <h3>{item.title}</h3>
        <div>
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div>
          <Button onClick={() => removeFromCart(item.id)}>-</Button>
          <p>{item.amount}</p>
          <Button onClick={() => addToCart(item)}>+</Button>
        </div>
      </div>
      <img src={item.image} alt={item.title} width="100px" />
    </>
  );
};

export default CartItem;
