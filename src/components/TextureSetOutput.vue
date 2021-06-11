<template>
  <div>
    <v-card>
      <v-card-title>{{ filename }}</v-card-title>
      <v-divider></v-divider>
      <v-sheet class="pa-5" dark>
        <v-subheader class="float-right ma-0 pointer-none"
          >JSON Output</v-subheader
        >
        <pre><code class="select-all" tabindex="0">{{ textureSetJson }}</code></pre>
      </v-sheet>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-select
            v-model="formatVersion"
            :items="formatVersionMenu"
            label="Format Version"
          ></v-select>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content>
          <v-combobox
            v-model="displayValue.color"
            label="Base layer"
            :items="[block]"
            @input="(v) => onLayerInput('color', v)"
          ></v-combobox>
        </v-list-item-content>
        <v-list-item-action @click="openColorPicker(false)">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="grey lighten-1">mdi-format-color-fill</v-icon>
              </v-btn>
            </template>
            <span>Select uniform color</span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-combobox
            v-model="displayValue.mer"
            label="MER map"
            :items="merSuggestions"
            @input="(v) => onLayerInput('mer', v)"
          ></v-combobox>
        </v-list-item-content>
        <v-list-item-action @click="openColorPicker(true)">
          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="grey lighten-1">mdi-format-color-fill</v-icon>
              </v-btn>
            </template>
            <span>Select uniform color</span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-combobox
            v-model="inputValue[useNormalMap ? 'normal' : 'heightmap']"
            label="Depth map"
            :items="depthMapSuggestions"
          ></v-combobox>
        </v-list-item-content>
        <v-list-item-action>
          <v-menu open-on-hover close-on-click close-on-content-click>
            <template v-slot:activator="{ on, attrs }">
              <v-btn small color="secondary" v-bind="attrs" v-on="on">
                {{ !useNormalMap ? "Heightmap" : "Normal map" }}
                <v-icon right>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="useNormalMap = true">
                <v-list-item-title>Normal Map</v-list-item-title>
              </v-list-item>
              <v-list-item @click="useNormalMap = false">
                <v-list-item-title>Heightmap</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text color="primary" @click="download">Save</v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="showColorPicker" max-width="320">
      <v-card>
        <v-card-title class="headline">Uniform Color</v-card-title>
        <v-card-subtitle>{{ pickMer ? "MER" : "Base" }}</v-card-subtitle>
        <v-card-text>
          <v-color-picker @input="colorPickerInput"></v-color-picker>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="closeColorPicker">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const ahex = (v) => `${v}`.substr(7, 2) + `${v}`.substr(1, 6);

export default {
  name: "TextureSetOutput",
  props: {
    block: {
      type: String,
      required: true,
      default: "",
      validator: (v) => `${v}`.match(/^[a-z]+[a-z0-9_]*[a-z0-9]*$/i),
    },
  },
  data: () => ({
    formatVersion: "1.16.100",
    colorValue: {
      color: null,
      mer: null,
    },
    inputValue: {},
    displayValue: {
      color: null,
      mer: null,
    },
    showColorPicker: false,
    pickMer: false,
    useColorValues: {
      color: false,
      mer: false,
    },
    useNormalMap: true,
  }),
  mounted() {
    this.inputValue = {
      color: `${this.block}`,
      mer: `${this.block}_mer`,
      normal: `${this.block}_normal`,
      heightmap: `${this.block}_heightmap`,
    };
    this.displayValue = this.inputValue;
  },
  methods: {
    download() {
      const el = document.createElement("a");
      el.href = URL.createObjectURL(
        new Blob([JSON.stringify(this.textureSetData)], {
          type: "text/plain",
        })
      );
      el.download = this.filename;
      el.click();
    },
    openColorPicker(isMer) {
      this.pickMer = isMer === true;
      this.showColorPicker = true;
    },
    closeColorPicker() {
      this.pickMer = false;
      this.showColorPicker = false;
    },
    colorPickerInput({ rgba, hexa, hex }) {
      let rgb = Object.values(rgba);

      if (this.pickMer) {
        this.useColorValues.mer = true;
        rgb.length = 3;
        this.colorValue.mer = rgb;
        this.displayValue.mer = hex;
        return;
      }

      this.useColorValues.color = true;
      this.displayValue.color = "#" + ahex(hexa);
      this.colorValue.color = rgb;
    },
    onLayerInput(layer, val) {
      this.useColorValues[layer] = false;
      this.inputValue[layer] = val;
    },
  },
  computed: {
    filename() {
      return `${this.block.toLowerCase()}.texture_set.json`;
    },
    textureSetData() {
      const getLayerValue = (layer) => {
        const key = this.useColorValues[layer] ? "colorValue" : "inputValue";
        return this[key][layer];
      };

      const textureSet = {
        color: getLayerValue("color") || this.inputValue.color,
      };

      const mer = getLayerValue("mer") || this.inputValue.mer;

      if (mer?.length > 0) {
        textureSet.metalness_emissive_roughness = mer;
      }

      if (this.useNormalMap && this.inputValue.normal) {
        textureSet.normal = `${this.inputValue.normal}`;
      }

      if (!this.useNormalMap && this.inputValue.heightmap) {
        textureSet.heightmap = this.inputValue.heightmap;
      }

      return {
        format_version: this.formatVersion,
        "minecraft:texture_set": textureSet,
      };
    },
    textureSetJson() {
      return JSON.stringify(this.textureSetData, null, 2);
    },
    merSuggestions() {
      const list = [`${this.block}_mer`];

      if (!this.useColorValues.color) {
        list.push(`${this.inputValue.color}_mer`);
      }

      return list;
    },
    depthMapSuggestions() {
      let suffix = "heightmap";
      const suggestions = [];
      if (this.useNormalMap) {
        suffix = "normal";
        suggestions.push(`${this.block}_n`);
      }

      suggestions.push(`${this.block}_${suffix}`);

      if (!this.useColorValues && this.inputValue.color?.length > 1) {
        suggestions.push(`${this.inputValue.color}_${suffix}`);
      }

      return suggestions;
    },
    formatVersionMenu: () => ["1.16.100", "1.16.200", "1.17.0"],
  },
};
</script>

<style scoped>
@keyframes select {
  to {
    user-select: text;
  }
}

.select-all {
  user-select: all;
}

.select-all:focus {
  animation: select 100ms step-end forwards;
}

.pointer-none {
  pointer-events: none;
}
</style>