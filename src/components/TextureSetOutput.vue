<template>
  <div>
    <v-card>
      <v-card-title>{{ filename }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <pre>{{ textureSetJson }}</pre>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="download">Download</v-btn>
        <v-btn text color="primary">Save</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TextureSetOutput",
  props: {
    block: {
      type: String,
      required: true,
      default: "",
      validator: (v) => `${v}`.match(/^[a-z]+[a-z0-9_]*[a-z0-9]*$/i),
    },
    value: {
      type: Object,
      required: true,
      default: () => ({
        color: "",
      }),
      validator: (obj) => obj.color !== undefined && obj.color.length > 0,
    },
    format: {
      type: String,
      required: false,
      default: () => "1.16.100",
      validator: (v) => `${v}`.match(/^1\.[1-9][0-9]+\.[1-9][0-9]{2}$/),
    },
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
  },
  computed: {
    filename() {
      return `${this.block.toLowerCase()}.texture_set.json`;
    },
    textureSetData() {
      const textureSet = {
        color: this.value.color,
      };

      if (this.value.mer) {
        textureSet.metalness_emissive_roughness = this.value.mer;
      }

      if (this.value.normal) {
        textureSet.normal = `${this.value.normal}`;
      }

      if (!this.value.normal && this.value.heightmap) {
        textureSet.heightmap = this.value.heightmap;
      }

      return {
        format_version: this.format,
        "minecraft:texture_set": textureSet,
      };
    },
    textureSetJson() {
      return JSON.stringify(this.textureSetData, null, 2);
    },
  },
};
</script>