import Storage from "store";

/**
 * @description 自动检测值变化，并将其设置为 localStorage
 * @param {string} key localStorage key
 * @param {any} initialValue 初始值
 * @returns {Ref<any>}
 */
const useStorage = (key, initialValue) => {
    // 从 localStorage 中获取之前保存的值
    const storedValue = Storage.get(key);

    // 如果 localStorage 中没有对应的值，使用初始值创建响应式数据
    const value = ref(storedValue ?? initialValue);

    // 使用 watch 监听响应式数据变化，在值变化时更新 localStorage
    const stopWatching = watch(value, (newValue) => {
        Storage.set(key, newValue);
    });

    // 在组件即将卸载时，清除 watch 副作用
    onBeforeUnmount(() => {
        stopWatching();
    });

    // 返回响应式数据
    return value;
};

export default useStorage;
