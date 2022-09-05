import { client, Query, Field } from '@tilework/opus';

client.setEndpoint('http://localhost:4000/graphql');

export async function queryCategories() {
  const query = new Query('categories', true).addField('name', true);
  return await client.post(query);
}

export async function queryProductsByCategory(category) {
  const query = new Query('category', true)
    .addArgument('input', 'CategoryInput', { title: category })
    .addField('name', true)
    .addField(new Field('products', true).addField('name', true));

  return await client.post(query);
}
