# Minecraft Texture Set Generator

> See [Minecraft's Texture Set Documentation](https://help.minecraft.net/hc/en-us/articles/360051308931-Minecraft-Texture-Set-Documentation) for more details about `.texture_set.json` files.

## [bridge.](https://bridge-core.github.io/) Plugin Prototype

This is a working, proof-of-concept [bridge. plugin](https://bridge-core.github.io/plugin-docs/). Some `@bridge/` plugin module features have been emulated in this example.

### Usage

1. Enter texture name in search bar.

- A list of terrain texture names is loaded into a auto-complete list.

> **In bridge.:** This list would be populated from resource pack's `blocks.json` file.

2. Optionally customize texture set output

- The _Format Version_ field contains a short, static list of example format versions.

> **In bridge.:** The `format_version` property would be based on the project's target version.

- Base layer, MER layer, and normal map layers are automatically filled to match terrain texture name in the search bar.

- Layer values can be individually modified by changing the _Base layer_, _MER map_ and _Depth map_ fields.

- The automatically-filled texture name remains in the auto-completion list.

- Base layer and MER layers can use a uniform color instead of a terrain texture name. Click the paint bucket icon to open a color picker.

> **TODO:**
> Allow user to specify uniform color's output format.

- Specify if the depth map is a normal map (default) or a heightmap by selecting a value from the dropdown menu next to the field.

- Leave a field's value empty to omit the layer from the texture set output.

3. Save texture set output

- Click the _Save_ button to initiate a download of the generated `.texture_set.json` file.

> **In bridge.:** The `.texture_set.json` file can be saved directly to the specified resource pack's directory.

4. Change search bar value to generate a new texture_set.json file

- Layer values are not retained upon chaning search value.
