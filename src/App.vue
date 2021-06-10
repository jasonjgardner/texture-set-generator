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
          @input="onInput"
        ></v-combobox>

        <TextureSetOutput
          v-if="blockName"
          :block="blockName"
          :value="valueStates"
        />

        <div class="mt-8" v-if="blockName">
          <TextureSetLayer
            :block="blockName"
            header="Base"
            suffix=""
            @input="(v) => (valueStates.color = v)"
          />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TextureSetLayer from "./components/TextureSetLayer";
import TextureSetOutput from "./components/TextureSetOutput";
import { getTextures } from "./textures";

export default {
  name: "App",
  components: {
    TextureSetLayer,
    TextureSetOutput,
  },
  data: () => ({
    blockName: "",
    blockList: [],
    activeLayers: [],
    useColor: {
      color: false,
      mer: false,
    },
    colorStates: {
      color: null,
      mer: null,
    },
    inputStates: {
      color: null,
      mer: null,
      normal: null,
      heightmap: null,
    },
    valueStates: {
      color: null,
      mer: null,
      normal: null,
    },
    preferHeightmap: false,
  }),
  mounted() {
    this.blockList = getTextures();
  },
  methods: {
    setBaseLayerColor(rgba) {
      this.colorStates.color = Object.values(rgba);
      this.colorStates.color[3] = +this.valueStates.color[3].toPrecision(2);

      this.valueStates.color = this.colorStates.color;
    },
    onInput(search) {
      const val = search.trim().toLowerCase();

      this.inputStates.color = this.inputStates.color || val;

      this.valueStates = {
        color: `${val}`,
        mer: `${val}_mer`,
        normal: `${val}_normal`,
        heightmap: `${val}_heightmap`,
      };
    },
    toggleColorValue(idx) {
      this.valueStates.color = idx
        ? this.colorStates.color
        : this.inputStates.color;
    },
    onTextureInput(val) {
      this.inputStates.color = val;
      this.valueStates.color = this.inputStates.color;
    },
  },
  computed: {
    colorValue() {
      return "";
    },
  },
};
</script>

