// 分页
export const DATA_MODE_PAGE = "page";
// 滚动加载
export const DATA_MODE_LIST = "list";

const DEFAULT_OPTIONS = {
  mode: DATA_MODE_PAGE,
  pageSize: 10,
};

export const useList = (
  requestFn: (options: ListFetchOptions) => Promise<ListResponse<any>>,
  filterOption: ListFilterOptions,
  options: ListOptions
) => {
  const _options = Object.assign({}, DEFAULT_OPTIONS, options);

  const pageID = ref(1);
  const pageSize = ref(_options.pageSize);
  const loading = ref(false);
  const list = ref<Array<any>>([]);
  const totalCount = ref(0);
  const finished = ref(false);

  const isList = computed(() => _options.mode === DATA_MODE_LIST);

  const fetch = ({ page, size, noAppend }: ListFetchFunction = {}) =>
    new Promise(async (resolve) => {
      if (loading.value) {
        return;
      }

      loading.value = true;
      const { statusCode, content, message } = await requestFn({
        pageID: page || pageID.value,
        pageSize: size || pageSize.value,
        ...unref(filterOption),
      });

      loading.value = false;
      if (statusCode === 200) {
        const data = content?.list || content?.content || content || [];

        if (isList.value) {
          if (noAppend) {
            list.value = data;
          } else {
            list.value = list.value.concat(data);
            finished.value = content?.totalPage <= pageID.value;
          }
        } else {
          list.value = data;
        }
        totalCount.value = content?.totalCount || 0;
      }
      resolve({ statusCode, content, message });
    });

  const onPageChange = async (page: number, size: number) => {
    pageID.value = page;
    pageSize.value = size;
    await fetch({ page, size });
  };

  const fetchMore = () => {
    if (!finished.value) {
      onPageChange(pageID.value + 1, pageSize.value);
    }
  };

  const refresh = async () => {
    if (!loading.value && isList.value) {
      pageID.value = 1;
      await fetch({ noAppend: true });
    }
  };

  onMounted(() => {
    const { immediate } = options;
    immediate && fetch();
  });
  return {
    pageID,
    pageSize,
    totalCount,
    loading,
    list,
    fetch,
    onPageChange,
    fetchMore,
    refresh,
  };
};
