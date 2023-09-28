const useCancelableReq = async (
  requestFn: ((args: any) => Promise<any>) | ((args: any) => Promise<any>[]),
  requestArgs: any,
  optionConverter?: Function
) => {
  const isSearching = ref(false);
  let controller: AbortController;

  const requestFnWrap = async () => {
    isSearching && controller?.abort();
    controller = new AbortController();
    try {
      let res;
      isSearching.value = true;
      if (Array.isArray(requestFn)) {
        res = await Promise.all(
          requestFn.map((fn, index) => fn(requestArgs[index]))
        );
      } else {
        res = await requestFn(requestArgs);
      }

      if (optionConverter) {
        res = optionConverter(res);
      }

      return { res, undefined };
    } catch (err) {
      return { undefined, err };
    } finally {
      isSearching.value = false;
    }
  };

  const cancel = () => {
    isSearching.value = false;
    controller.abort();
  };

  return { isSearching, requestFnWrap, cancel };
};
