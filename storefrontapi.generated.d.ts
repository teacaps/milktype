/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type ShopQueryVariables = StorefrontAPI.Exact<{[key: string]: never}>;

export type ShopQuery = {shop: Pick<StorefrontAPI.Shop, 'id'>};

export type ProductQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type ProductQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Product,
      'id' | 'title' | 'description' | 'descriptionHtml' | 'vendor'
    > & {
      variants: {
        nodes: Array<
          Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'title' | 'quantityAvailable'
          > & {
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
            >;
          }
        >;
      };
    }
  >;
};

interface GeneratedQueryTypes {
  '#graphql\n\tquery Shop { shop { id } }': {
    return: ShopQuery;
    variables: ShopQueryVariables;
  };
  '#graphql\nquery Product($handle: String!) {\n    product(handle: $handle) {\n\t\tid\n\t\ttitle\n\t\tdescription\n\t\tdescriptionHtml\n\t\tvendor\n        variants(first: 1) {\n            nodes {\n                id\n\t\t\t\ttitle\n                price {\n                    amount\n                    currencyCode\n                }\n                compareAtPrice {\n                    amount\n                    currencyCode\n                }\n\t\t\t\tquantityAvailable\n            }\n        }\n    }\n}\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
  '#graphql\nquery Product($handle: String!) {\n    product(handle: $handle) {\n        id\n        title\n        description\n        descriptionHtml\n        vendor\n        variants(first: 1) {\n            nodes {\n                id\n                title\n                price {\n                    amount\n                    currencyCode\n                }\n                compareAtPrice {\n                    amount\n                    currencyCode\n                }\n                quantityAvailable\n            }\n        }\n    }\n}\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
}

interface GeneratedMutationTypes {}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
