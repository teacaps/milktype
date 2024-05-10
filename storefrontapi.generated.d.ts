/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type ShopQueryVariables = StorefrontAPI.Exact<{[key: string]: never}>;

export type ShopQuery = {shop: Pick<StorefrontAPI.Shop, 'id'>};

export type ProductQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type ProductQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Product, 'title' | 'description'> & {
      variants: {
        nodes: Array<
          Pick<StorefrontAPI.ProductVariant, 'id' | 'quantityAvailable'> & {
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
  '#graphql\nquery Product($handle: String!) {\n    product(handle: $handle) {\n\t\ttitle\n\t\tdescription\n        variants(first: 1) {\n            nodes {\n                id\n                price {\n                    amount\n                    currencyCode\n                }\n                compareAtPrice {\n                    amount\n                    currencyCode\n                }\n\t\t\t\tquantityAvailable\n            }\n        }\n    }\n}\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
}

interface GeneratedMutationTypes {}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
