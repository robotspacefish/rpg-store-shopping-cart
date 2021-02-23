import { ACTIONS } from '../helpers/constants';

export default function itemClickedReducer(itemClicked, action) {

  switch (action.type) {

    case ACTIONS.SET:

      return {
        isModalVisible: true,
        modalType: action.modalType,
        item: action.item
      };

    case ACTIONS.CLEAR:

      return {
        isModalVisible: false,
        modalType: null,
        item: null
      };

    default:

      return itemClicked;
  }

};