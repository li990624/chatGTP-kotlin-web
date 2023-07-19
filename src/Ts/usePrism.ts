import {ref, onMounted, Ref, UnwrapRef} from 'vue';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';

const usePrism = (code: string) => {
    const highlightedCode = ref('');

    onMounted(() => {
        highlightedCode.value = Prism.highlight(code, Prism.languages.javascript, 'javascript');
    });

    return {
        highlightedCode
    };
};

export default usePrism;
