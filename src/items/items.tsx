import { Button } from "@chakra-ui/react";
import React from "react";

interface Props {
  item: cartItemType;
  handleAddToCart: (clickedItem: cartItemType) => void;
}

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <>
      <div style={{ padding: "100px" }}>
        <img src={item.image} alt={item.title} width="300px" />
        <div style={{ width: "300px" }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <h3>${item.price}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
      </div>
    </>
  );
};

export default Item;
