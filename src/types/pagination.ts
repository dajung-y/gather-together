export type PaginationProps = {
  perPage: number;
  totalPages: number;
  onChangePage?: (page: number) => void;
}