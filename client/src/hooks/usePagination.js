import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTotalItems } from "../features/dashboard/items/itemsSlice";

const limit = 5;

const usePagination = () => {
    const [page, setPage] = useState(1);
    const totalItems = useSelector(selectTotalItems);
    const [totalPages, setTotalPages] = useState(Math.ceil(totalItems / limit));

    const handlePageChange = (event, value) => {
        if (!value) return;
        setPage(value);
    };

    const getPaginatedItems = (state) => {
        let items = [];
        const startIdx = (page * limit) - limit;
        const endIdx = startIdx + limit;

        for (let i = startIdx; i < endIdx; i++) {
            let currentItem = state.items.entities[state.items.ids[i]];
            if (!currentItem) break;

            items.push(currentItem);
        }

        let updatedTotalPages = Math.ceil(totalItems / limit);

        if(updatedTotalPages !== totalPages) {
            setTotalPages(updatedTotalPages);
        }

        return items;
    };

    const getItemsWithSearchQuery = (items) => {
        let result = [];
        const startIdx = (page * limit) - limit;
        const endIdx = startIdx + limit;

        for (let i = startIdx; i < endIdx; i++) {
            let currentItem = items[i];
            if (!currentItem) break;

            result.push(currentItem);
        }
        let updatedTotalPages = Math.ceil(items.length / limit);

        if(updatedTotalPages !== totalPages) {
            setTotalPages(updatedTotalPages);
        }

        return result;
    };

    return {
        page,
        totalPages,
        handlePageChange,
        getPaginatedItems,
        getItemsWithSearchQuery,
    };
};

export default usePagination;