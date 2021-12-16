import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import usePagination from "./usePagination";

const useItemsQueries = () => {
    const { category } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    // use pagination hook here to track changes inside this hook
    const { page, totalPages, handlePageChange, getPaginatedItems, getItemsWithSearchQuery } = usePagination();

    const items = useSelector(state => {
        let result = [];
        let entities = state.items.entities;
        if (category) {
            // remove the 's' (phones => phone)
            let categoryParam = category.slice(0, -1);

            state.items.ids.forEach(x => {
                if (entities[x].category === categoryParam) {
                    result.push(entities[x]);
                }
            });
        }
        if (searchQuery) {
            if (!result.length) {
                state.items.ids.forEach(x => {
                    if (entities[x].name.toLowerCase().includes(searchQuery.toLowerCase())) {
                        result.push(entities[x]);
                    }
                });
            } else {
                result = result.filter(x => x.name.toLowerCase().includes(searchQuery.toLowerCase()));
            }
        }
        if (!result.length && !searchQuery) {
            result = getPaginatedItems(state);
        }

        if(result.length && searchQuery) {
            result = getItemsWithSearchQuery(result);
        }

        return result;
    });

    return {
        items,
        searchQuery,
        setSearchQuery,
        page,
        totalPages,
        handlePageChange,
    };
};

export default useItemsQueries;