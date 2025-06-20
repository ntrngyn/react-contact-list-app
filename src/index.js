import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import contactReducer from "./redux/reducers/contactReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { loadState, saveState } from "./redux/localStorage";

// Tải trạng thái đã lưu từ localStorage
const persistedState = loadState();

const store = createStore(
  contactReducer,
  persistedState, // <-- Cung cấp trạng thái đã lưu làm trạng thái ban đầu
  composeWithDevTools()
);

// Lắng nghe mọi thay đổi trong store và gọi hàm saveState
store.subscribe(() => {
  // Chỉ lưu phần state của contacts, nếu sau này bạn có nhiều reducer khác
  saveState(store.getState());
});

const root = createRoot(document.querySelector("#root"));

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
