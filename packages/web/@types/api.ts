export interface FieldError {
  path: string | null;
  message: string;
}

export interface GraphQLResponse {
  ok: boolean;
  errors: FieldError[] | null;
}

export interface PaginatedQueryInput {
  page?: number | null;
  perPage?: number | null;
}

export interface CategoryWhereInput {
  slug?: string | null;
}

export interface ProductWhereInput {
  category?: CategoryWhereInput | null;
}

export interface ProductsQueryInput extends PaginatedQueryInput {
  where?: ProductWhereInput | null;
}

export interface PaginatedQueryVariables {
  input?: PaginatedQueryInput | null;
}

export interface ProductsQueryVariables {
  input?: ProductsQueryInput | null;
}

export interface Model {
  id: string;
  createdAt: string;
}

export interface PageInfo {
  perPage: number;
  from: number;
  to: number;
  total: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedData<T extends Model> {
  info: PageInfo;
  edges: T[];
}

export interface Store extends Model {
  slug: string;
  name: string;
  url: string;
  image: string;
}

export interface Product extends Model {
  body: string;
  couponCode: string | null;
  price: number;
  sourceUrl: string;
  title: string;
  image: string;
  store: Store;
}

export interface Category extends Model {
  slug: string;
  title: string;
}

export interface StoresQueryResponse {
  stores: GraphQLResponse & { stores: PaginatedData<Store> };
}

export interface ProductsQueryResponse {
  products: GraphQLResponse & { products: PaginatedData<Product> };
}
