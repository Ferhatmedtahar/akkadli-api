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
    prevous: string;
    current: string;
    next: string;
    last: string;
  };
}
