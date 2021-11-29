const sortItems = {
    lowestPrice: state => {
        state.ids.sort((a, b) => {
            return state.entities[a].price - state.entities[b].price;
        });
    },
    highestPrice: state => {
        state.ids.sort((a, b) => {
            return state.entities[b].price - state.entities[a].price;
        });
    },
    name: state => {
        state.ids.sort((a, b) => {
            return state.entities[a].name.localeCompare(state.entities[b].name);
        });
    },
    newest: state => {
        state.ids.sort((a, b) => {
            return new Date(state.entities[b].createdAt).getTime() - new Date(state.entities[a].createdAt).getTime();
        });
    },
    oldest: state => {
        state.ids.sort((a, b) => {
            return new Date(state.entities[a].createdAt).getTime() - new Date(state.entities[b].createdAt).getTime();
        });
    }
};

export default sortItems;