/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

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

export type CreateCustomerMutationVariables = StorefrontAPI.Exact<{
  input: StorefrontAPI.CustomerCreateInput;
}>;

export type CreateCustomerMutation = {
  customerCreate?: StorefrontAPI.Maybe<{
    customer?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Customer, 'id' | 'email'>
    >;
    customerUserErrors: Array<
      Pick<StorefrontAPI.CustomerUserError, 'code' | 'field' | 'message'>
    >;
  }>;
};

interface GeneratedQueryTypes {
  '#graphql\nquery Product($handle: String!) {\n    product(handle: $handle) {\n\t\ttitle\n\t\tdescription\n        variants(first: 1) {\n            nodes {\n                id\n                price {\n                    amount\n                    currencyCode\n                }\n                compareAtPrice {\n                    amount\n                    currencyCode\n                }\n\t\t\t\tquantityAvailable\n            }\n        }\n    }\n}\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
}

interface GeneratedMutationTypes {
  '#graphql\nmutation CreateCustomer($input: CustomerCreateInput!) {\n    customerCreate(input: $input) {\n\t\tcustomer {\n\t\t\tid\n\t\t\temail\n\t\t}\n\t\tcustomerUserErrors {\n\t\t\tcode\n\t\t\tfield\n\t\t\tmessage\n        }\n    }\n}\n': {
    return: CreateCustomerMutation;
    variables: CreateCustomerMutationVariables;
  };
}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
