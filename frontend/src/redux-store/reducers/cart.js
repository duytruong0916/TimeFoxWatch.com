const defaultState = {
   item: 0
  }
  export default (state = defaultState, action) => {
    switch (action.type) {
      case 'UPDATE_ITEM':
        return {
          item: action.numberOfItem
        }
      default:
        return state
    }
  };
  
  