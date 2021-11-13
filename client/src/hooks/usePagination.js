import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTotalItems } from "../features/dashboard/items/itemsSlice";

const limit = 20;

const usePagination = () => {
    const [page, setPage] = useState(1);
    const totalItems = useSelector(selectTotalItems);
    const totalPages = Math.ceil(totalItems / limit);

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

        return items;
    };

    return {
        page,
        totalPages,
        handlePageChange,
        getPaginatedItems,
    };
};

export default usePagination;