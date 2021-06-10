<template>
  <div>
    <v-row>
      <v-col cols="3"> </v-col>
      <v-col cols="9">
        <v-slider
          v-model="percentage"
          type="range"
          min="0"
          max="100"
          step="1"
          label="Grayscale %"
          :messages="hexValue"
        ></v-slider>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "GrayscalePicker",
  props: {
    swatch: {
      type: Boolean,
      required: false,
      default: true,
    },
    output: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    percentage: 50,
  }),
  methods: {
    grayscaleHex(percentage) {
      const hex = `#${
        (percentage < 7 ? "0" : "") +
        Math.round((percentage * 255) / 100).toString(16)
      }`;

      this.$emit("change", hex);

      return hex;
    },
  },
  computed: {
    hexValue() {
      return this.grayscaleHex(this.percentage);
    },
  },
};
</script>

<style>
.swatch {
  border: 1px solid var(--swatch-border-color, ghostwhite);
  display: inline-block;
  min-height: 1rem;
  min-width: 1rem;
}
</style>