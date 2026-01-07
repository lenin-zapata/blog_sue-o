export default {
  name: 'adSpace',
  title: 'Ad Space',
  type: 'object',
  fields: [
    { name: 'placement', title: 'Identificador (opcional)', type: 'string' }
  ],
  preview: {
    select: { title: 'placement' },
    prepare(selection: any) {
      return {
        title: selection.title || 'Ad Space',
        subtitle: 'Espacio para publicidad programática',
      };
    },
  },
};
