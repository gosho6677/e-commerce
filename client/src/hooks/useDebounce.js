import { useCallback } from "react";

// it works with uncontrolled element
// meaning the input does not have value attribute!
const useDebounce = () => {
    // note that it is modified to use e.target.value
    // this debouncer is currently used in search query
    // which is input element
    const debouncedChangeHandler = useCallback((setState) => {
        let timeout;

        return function (e) {
            const later = () => {
                clearTimeout(timeout);
                setState(e.target.value);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, 300);
        };
    }, []);

    return debouncedChangeHandler;
};

export default useDebounce;