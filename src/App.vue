<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-combobox
          v-model="blockName"
          :items="blockList"
          label="Generate texture set for block"
          clearable
          auto-select-first
          solo
        ></v-combobox>

        <TextureSetOutput v-if="blockName" :block="blockName" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TextureSetOutput from "./components/TextureSetOutput";
import { getTextures } from "./textures";

export default {
  name: "App",
  components: {
    TextureSetOutput,
  },
  data: () => ({
    blockName: "",
    blockList: [],
  }),
  mounted() {
    this.blockList = getTextures();
  },
};
</script>

