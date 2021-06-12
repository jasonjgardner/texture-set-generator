<template>
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
</template>

<script>
const TextureSetOutput = require('./TextureSetOutput')
const { fetchDefinition } = await require('@bridge/fetch-definition')

export default {
	name: 'TextureSetGenerator',
	components: {
		TextureSetOutput,
	},
	data: () => ({
		blockName: '',
	}),
	computed: {
		blockList() {
			const textures = []
			const blocksData = fetchDefinition('client_block')
			const blocks = Object.entries(blocksData)

			for (const block of blocks) {
				if (!block[1].textures) {
					continue
				}

				textures.push(
					...(typeof block[1].textures === 'string'
						? [block[1].textures]
						: Object.values(block[1].textures))
				)
			}

			const collection = [
				...new Set(textures, ...Object.keys(blocksData)),
			]
			collection.sort()

			return collection
		},
	},
}
</script>
