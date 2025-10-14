export type PaginationProps = {
  totalPages: number;
  pagePerGroup?: number;
  onChangePage?: (page: number) => void;
}