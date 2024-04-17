/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type ProductQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type ProductQuery = {
  product?: StorefrontAPI.Maybe<{
    seo: Pick<StorefrontAPI.Seo, 'title' | 'description'>;
    variants: {
      nodes: Array<
        Pick<StorefrontAPI.ProductVariant, 'id'> & {
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
        }
      >;
    };
  }>;
};

interface GeneratedQueryTypes {
  '#graphql\nquery Product($handle: String!) {\n\tproduct(handle: $handle) {\n\t\tseo {\n\t\t\ttitle\n\t\t\tdescription\n        }\n\t\tvariants(first: 1) {\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\tprice {\n\t\t\t\t\tamount\n\t\t\t\t\tcurrencyCode\n                }\n\t\t\t\tcompareAtPrice {\n\t\t\t\t\tamount\n\t\t\t\t\tcurrencyCode\n                }\n            }\n\t\t}\n    }\n}\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
}

interface GeneratedMutationTypes {}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
