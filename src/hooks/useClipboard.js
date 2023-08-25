import { message } from "ant-design-vue";
const useClipboard = () => {
    const copied = ref(false);

    const copy = async (value) => {
        try {
            await navigator.clipboard.writeText(value);
            copied.value = true;
            message.success("Copied!");

        } catch (err) {
            message.error("Failed to copy text:", err);
            copied.value = false;
        }
    };

    return { copied, copy };
};

export default useClipboard;
