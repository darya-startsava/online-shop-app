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
    .addField(
      new Field('products', true).addFieldList(
        [
          'id',
          'name',
          'inStock',
          'gallery',
          'description',
          'category',

          'brand',
          new Field('prices', true).addFieldList([
            'amount',
            new Field('currency', true).addFieldList(['label', 'symbol']),
          ]),
          new Field('attributes', true).addFieldList(
            [
              'id',
              'name',
              'type',
              new Field('items', true).addFieldList(['displayValue', 'value', 'id']),
            ],
            true
          ),
        ],
        true
      )
    );

  return await client.post(query);
}
