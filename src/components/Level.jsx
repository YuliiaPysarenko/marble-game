import { useMemo } from "react";
import {
  BlockStart,
  BlockEnd,
  BlockSpinner,
  BlockLimbo,
  BlockAxe,
} from "../levels";
import Bounds from "./Bounds";

export default function Level({
  count = 5,
  types = [BlockSpinner, BlockLimbo, BlockAxe],
  seed = 0,
}) {
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }
    return blocks;
  }, [count, types, seed]);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {blocks.map((Block, i) => (
        <Block key={i} position={[0, 0, -(i + 1) * 4]} />
      ))}

      <BlockEnd position={[0, 0, -(count + 1) * 4]} />

      <Bounds length={count + 2} />
    </>
  );
}
