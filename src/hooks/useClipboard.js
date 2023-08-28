import { message } from "ant-design-vue";
import { useI18n } from "vue-i18n";
const useClipboard = () => {
    const copied = ref(false);
    const { t } = useI18n()
    const copy = async (value) => {
        try {
            await navigator.clipboard.writeText(value);
            copied.value = true;
            message.success(t('-W19vaN4d5CN8PhP14EtE'));

        } catch (err) {
            message.error("Failed to copy text:", err);
            copied.value = false;
        }
    };

    return { copied, copy };
};

export default useClipboard;
