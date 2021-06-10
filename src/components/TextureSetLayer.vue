<template>
  <div>
    <v-card class="mx-auto">
      <v-card-title>Base Layer</v-card-title>
      <v-card-subtitle>{{ inputValue }}</v-card-subtitle>

      <v-expand-transition>
        <v-tabs dark grow>
          <v-tab>Texture</v-tab>
          <v-tab>Color</v-tab>
          <v-tab-item>
            <v-card-text>
              <v-combobox
                v-model="inputValue"
                label="Base terrain texture"
                :items="suggested"
                @input="onInput"
                @change="onInput"
              ></v-combobox>
            </v-card-text>
          </v-tab-item>
          <v-tab-item>
            <v-color-picker
              flat
              mode="rgba"
              hide-mode-switch
              @input="({ rgba }) => setLayerColor(rgba)"
            ></v-color-picker>
          </v-tab-item>
        </v-tabs>
      </v-expand-transition>

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text color="primary">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TextureSetLayer",
  props: {
    header: {
      type: String,
      required: true,
      default: "Layer",
    },
    suffix: {
      type: String,
      required: true,
      default: "",
    },
    block: {
      type: String,
      required: true,
      default: "",
    },
  },
  data: () => ({
    showDetails: false,
    inputValue: null,
    colorValue: null,
    textureValue: null,
    useColor: false,
    suggested: [],
  }),
  mounted() {
    this.suggested = [`${this.block}${this.suffix}`];
    this.inputValue = `${this.block}${this.suffix}`;
  },
  methods: {
    setLayerColor(rgba) {
      this.colorValue = Object.values(rgba);
      this.colorValue[3] = +this.colorValue[3]?.toPrecision(2);

      this.useColor = true;
      this.$emit("input", this.colorValue);
    },
    expand() {
      this.showDetails = true;
    },
    onInput(val) {
      this.textureValue = val;
      this.$emit("input", val);
    },
  },
  computed: {
    subtitle() {
      return (
        (this.useColor ? this.colorValue : this.textureValue) || this.block
      );
    },
  },
};
</script>