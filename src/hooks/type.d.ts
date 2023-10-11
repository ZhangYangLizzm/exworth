interface ListOptions {
  mode?: "page" | "list";
  pageSize?: number;
  immediate?: boolean;
}

interface ListFilterOptions {
  [key: string]: any;
}

interface ListFetchOptions extends ListFilterOptions {
  pageID: number;
  pageSize: number;
}

interface ExResponse<T> {
  statusCode: number;
  content: T;
  message?: string;
}

interface ListFetchFunction {
  page?: number;
  size?: number;
  noAppend?: boolean;
}
