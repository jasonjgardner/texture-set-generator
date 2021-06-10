import data from "./assets/blocks.json";

export function getTextures() {
  const textures = [];

  const blocks = Object.entries(data);

  for (const block of blocks) {
    if (!block[1].textures) {
      continue;
    }

    textures.push(
      ...(typeof block[1].textures === "string"
        ? [block[1].textures]
        : Object.values(block[1].textures))
    );
  }

  return [...new Set(textures, ...Object.keys(data))];
}
