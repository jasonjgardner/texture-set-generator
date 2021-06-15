<template>
  <v-app>
    <v-main>
      <v-container>
        <TextureSetGenerator />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TextureSetGenerator from "@/components/TextureSetGenerator";

export default {
  name: "App",
  components: {
    TextureSetGenerator,
  },
};
</script>

