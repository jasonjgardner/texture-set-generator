const { create } = await require('@bridge/sidebar')
const { TextureSetGenerator } = await require('@bridge/ui')

create({
	id: 'f85b0b31-8855-4ae1-af5d-ae3e39e851b7',
	displayName: 'Texture Set Generator',
	icon: 'mdi-buffer ',
	component: TextureSetGenerator,
})
