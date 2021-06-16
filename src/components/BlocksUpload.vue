<template>
  <v-dialog v-model="showBlocksUpload" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        color="secondary"
        fab
        absolute
        top
        right
        v-bind="attrs"
        v-on="on"
      >
        <v-icon
          v-text="items && items.length > 0 ? 'mdi-reload' : 'mdi-cube-scan'"
        ></v-icon>
      </v-btn>
    </template>
    <v-form @submit.prevent="onSubmit">
      <v-card>
        <v-card-title>Texture Source</v-card-title>
        <v-card-text>
          Submit resource pack <code>blocks.json</code> file to load
          auto-completions.
        </v-card-text>
        <v-card-text>
          <v-file-input
            label="blocks.json"
            @change="processBlocksFile"
          ></v-file-input
        ></v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!parsedBlocks.length"
            type="submit"
            text
            color="primary"
            >Apply</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { readJSON } from "@/lib/fs";
import getTextures from "@/lib/getTextures";

export default {
  name: "BlocksUpload",
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data: () => ({
    showBlocksUpload: false,
    parsedBlocks: [],
  }),
  methods: {
    onSubmit() {
      this.$emit("load", this.parsedBlocks);
      this.showBlocksUpload = false;
    },
    processBlocksFile(file) {
      if (!file) {
        this.parsedBlocks = [];
        return;
      }

      readJSON(file).then((d) => {
        this.parsedBlocks = getTextures(d);
      });
    },
  },
};
</script>