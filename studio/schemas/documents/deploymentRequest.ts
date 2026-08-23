import { defineField, defineType } from 'sanity';

export const deploymentRequest = defineType({
  name: 'deploymentRequest',
  title: 'Požadavek na nasazení',
  type: 'document',
  fields: [
    defineField({ name: 'requestedAt', title: 'Čas požadavku', type: 'datetime', validation: (rule) => rule.required() }),
    defineField({ name: 'requestId', title: 'ID požadavku', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'requestedById', title: 'ID uživatele', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'requestedByName', title: 'Jméno uživatele', type: 'string' }),
    defineField({ name: 'note', title: 'Poznámka', type: 'string', validation: (rule) => rule.max(200) }),
  ],
});
