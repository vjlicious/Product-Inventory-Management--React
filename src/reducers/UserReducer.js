import initialState from "./InitialState";
import * as types from "../actions/ActionTypes";
export default function Reducer(state = initialState, action) {
  const newState = { ...state };

  switch (action.type) {
    case "ADD_USER":
      //let new data
      ///axios.post(url,action.payload).then(res=>)
      // newState = action.payload;
      newState.all_Data.Users = [...newState.all_Data.Users, action.payload];
      console.log("action.payload is", action.payload);
      console.log(
        "hi im reducer in case ADD_USER and the new state is",
        newState
      );

      break;
    case "GET_USER":
      newState.get_User = action.payload;
      console.log("hi im reducer in cae GET_USER", newState);
      break;

    case types.ADD_PRODUCTS_SUCCESS:
      console.log(
        "hi im in reducer add product old state",
        newState.all_Data.productDetails
      );
      console.log("product need to be added", action.productDetails);
      newState.all_Data.productDetails = [
        ...newState.all_Data.productDetails,
        Object.assign({}, action.product)
      ];

      console.log(" new state", newState);

      break;

      case types.DELETE_PRODUCTS_SUCCESS:
          newState.all_Data.productDetails = state.all_Data.productDetails.filter(product => product.id != action.id); // ES6 arrow fns
          console.log("Hi delete reducer newstate=",newState);
          break;

    case "GET_ALL":
      newState.all_Data = action.payload;
      console.log("hi im reducer in cae all_Data", newState);
      break;

    case "UPDATE_PRODUCT":
      console.log(
        "hi im reducer in case Update product recieved data is",
        action.payload
      );
      console.log(
        "hi im reducer in case Update product all data is",
        newState.all_Data
      );
      const prodD = newState.all_Data.productDetails;
      var index;
      if (prodD) {
        for (var i = 0; i < prodD.length; i++) {
          if (prodD[i].id == action.id) {
            index = i;
          } else {
          }
        }
      }
      console.log(
        "hi im reducer in case Update product Indexed prod is",
        newState.all_Data.productDetails[index]
      );
      newState.all_Data.productDetails[index] = action.payload;
      console.log("hi im reducer in case Update product new state", newState);
      break;

    default:
  }
  return newState;
}
