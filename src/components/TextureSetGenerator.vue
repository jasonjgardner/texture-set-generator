<template>
  <div>
    <v-row align="center">
      <v-col cols="11">
        <v-combobox
          v-model="blockName"
          :items="blockList"
          label="Generate texture set for block"
          clearable
          auto-select-first
          solo
        ></v-combobox>
      </v-col>
      <v-col cols="1" align="top" style="position: relative">
        <BlocksUpload
          :items="blockList"
          @load="(blocks) => (blockList = blocks)"
        />
      </v-col>
    </v-row>

    <TextureSetOutput v-if="blockName" :block="blockName" />
  </div>
</template>

<script>
import TextureSetOutput from "@/components/TextureSetOutput";
import BlocksUpload from "@/components/BlocksUpload";

export default {
  name: "TextureSetGenerator",
  components: {
    BlocksUpload,
    TextureSetOutput,
  },
  data: () => ({
    blockName: "",
    blockList: [],
  }),
};
</script>

