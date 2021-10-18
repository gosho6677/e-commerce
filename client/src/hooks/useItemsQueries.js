import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectAllItems } from "../features/items/itemsSlice";

// non optimized search and category query
// change later
const useItemsQueries = () => {
    const { category } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
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
            result = selectAllItems(state);
        }

        return result;
    });

    return {
        items,
        searchQuery,
        setSearchQuery,
    };
};

export default useItemsQueries;