/**
 * Interface reflecting the pagination parameters to be recieved/set.
 */
export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

/**
 * Class creating a custom 'paginated result' to deal with any type of list<T> we
 * would like to apply pagination.
 * 
 * T is an entity in our domain layer.
 */
export class PaginatedResult<T> {
    data: T;
    pagination: Pagination;

    constructor(data: T, pagination: Pagination) {
        this.data = data;
        this.pagination = pagination;
    }
}

/**
 * Class used for passing up the user's specific pagination params to the API.
 */
export class PaginationParams {
    pageNumber: number;
    pageSize: number;

    constructor(pageNumber: number = 1, pageSize: number = 2) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}