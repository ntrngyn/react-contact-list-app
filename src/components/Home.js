import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const contacts = useSelector((state) => state);

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const deleteContact = (id) => {
    // Di chuyển logic confirm vào đây để gọn hơn
    if (window.confirm(`Bạn có chắc chắn muốn xóa liên hệ này không?`)) {
      dispatch({ type: "DELETE_CONTACT", payload: id });
      toast.success("Contact deleted successfully!");
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    // Gộp các trường cần tìm kiếm thành một chuỗi, chuyển sang chữ thường
    // `toString()` để đảm bảo `contact.number` không gây lỗi nếu nó là số
    const searchableText = `${contact.name} ${
      contact.email
    } ${contact.number.toString()}`.toLowerCase();

    // Kiểm tra xem chuỗi tìm kiếm có nằm trong chuỗi văn bản ở trên không
    return searchableText.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <div className="row">
        {/* 4. Thêm ô tìm kiếm */}
        <div className="col-md-8 my-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name, Email, or Number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* <div className="col-md-12 my-5 text-end">
          <Link to="/add" className="btn btn-outline-dark">
            Add Contact
          </Link>
        </div> */}

        {/* Thay đổi layout một chút cho hợp lý */}
        <div className="col-md-4 my-5 text-end">
          <Link to="/add" className="btn btn-outline-dark">
            Add Contact
          </Link>
        </div>

        <div className="col-md-10 mx-auto">
          <table className="table table-hover">
            <thead className="text-white bg-dark text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* 5. Dùng mảng đã lọc (filteredContacts) để render */}
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact, index) => (
                  <tr key={contact.id}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.number}</td>
                    <td>
                      <Link
                        to={`/edit/${contact.id}`}
                        className="btn btn-small btn-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        // Gọi hàm deleteContact đã bao gồm logic confirm
                        onClick={() => deleteContact(contact.id)}
                        className="btn btn-small btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
