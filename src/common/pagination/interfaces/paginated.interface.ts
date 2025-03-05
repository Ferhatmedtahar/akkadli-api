export interface Paginated<T> {
  data: T[];
  metaData: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
  links: {
    first: string;
    prev: string;
    current: string;
    next: string;
    last: string;
  };
}
