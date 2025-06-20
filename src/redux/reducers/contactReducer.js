const initialState = [];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    // case "FETCH_CONTACTS":
    //   // Thay thế toàn bộ state bằng dữ liệu từ API
    //   return action.payload;

    case "ADD_CONTACT":
      // Thêm một contact mới vào cuối mảng state
      // Logic tạo ID đã được xử lý ở component AddContact, nên ở đây chỉ cần thêm vào
      return [...state, action.payload];

    case "UPDATE_CONTACT":
      // Trả về một mảng mới, trong đó contact cần sửa đã được thay thế
      return state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );

    case "DELETE_CONTACT":
      // Trả về một mảng mới, đã loại bỏ contact có id trùng khớp
      return state.filter((contact) => contact.id !== action.payload);

    default:
      // Nếu không có action nào khớp, trả về state hiện tại không thay đổi
      return state;
  }
};

export default contactReducer;
