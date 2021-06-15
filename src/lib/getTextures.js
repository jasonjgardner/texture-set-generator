export default function getTextures(data) {
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

  const collection = [...new Set(textures, ...Object.keys(data))];
  collection.sort();

  return collection;
}
