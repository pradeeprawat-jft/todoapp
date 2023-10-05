import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser(
    $userName: String!
    $userEmail: String!
    $userPassword: String!
    $todosList: [TodoInput]!
  ) {
    createUser(
      userInput: {
        userName: $userName
        userEmail: $userEmail
        userPassword: $userPassword
        todosList: $todosList
      }
    ) {
      data {
        userId
        userName
        userEmail
      }
      status
      message
    }
  }
`;

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(userEmail: $email, userPassword: $password) {
      data {
        userId
        userName
        userEmail
      }
      status
      message
    }
  }
`;

const Form = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);

  const [apperror, setApperror] = useState(null);

  const initialFormData = {
    userName: "",
    userEmail: "",
    userPassword: "",
    todosList: [],
  };

  const [formData, setFormData] = useState(initialFormData);

  const [createUser] = useMutation(CREATE_USER);
  const [login] = useMutation(LOGIN);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const variables = {
      userName: formData.userName,
      userEmail: formData.userEmail,
      userPassword: formData.userPassword,
      todosList: formData.todosList,
    };

    try {
      if (signUp) {
        const { data, error } = await createUser({ variables });
        console.log("User created:", data.createUser);
        if (data.createUser.status === 200) {
          localStorage.setItem("userInfo", JSON.stringify(data.createUser.data));
          navigate("/home");
        } else {
          setApperror(error.message);
        }
      } else {
        const { data } = await login({
          variables: {
            email: formData.userEmail,
            password: formData.userPassword,
          },
        });
        console.log("User loggedin :", data.login);
        if (data.login.status === 200) {
          localStorage.setItem("userInfo", JSON.stringify(data.login.data));
          navigate("/home");
        } else {
          setApperror("User id or password incorrect");
        }
      }

      setFormData(initialFormData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  

  return (
    <div className="my-5">
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="border border-3 border-primary"></div>
              <div className="card bg-white">
                {apperror && (
                  <div className="alert alert-danger mt-3 mx-3">{apperror}</div>
                )}
                <div className="card-body p-5">
                  <form className="my-3" onSubmit={handleFormSubmit}>
                    <h2 className="fw-bold mb-5 text-uppercase">
                      {signUp ? "Sign Up" : "Sign In"}
                    </h2>
                    <div className="my-3">
                      <input
                        type="email"
                        className="form-control px-3 py-3"
                        id="userEmail"
                        placeholder="name@example.com"
                        value={formData.userEmail}
                        onChange={handleInputChange}
                      />
                    </div>
                    {signUp && (
                      <div className="my-3">
                        <input
                          type="text"
                          className="form-control px-3 py-3"
                          id="userName"
                          placeholder="Username"
                          value={formData.userName}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}
                    <div className="my-3">
                      <input
                        type="password"
                        className="form-control px-3 py-3"
                        id="userPassword"
                        placeholder="*******"
                        value={formData.userPassword}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="d-grid my-5">
                      <button
                        className="btn btn-outline-dark btn-block px-3 py-3"
                        type="submit"
                      >
                        {signUp ? "Sign Up" : "Sign In"}
                      </button>
                    </div>
                  </form>
                  <div>
                    <p className="mb-0 text-center text-uppercase">
                      {signUp
                        ? "Already have an account?"
                        : "Don't have an account?"}
                      <Link
                        href="#"
                        className="text-primary fw-bold"
                        onClick={() => setSignUp(!signUp)}
                      >
                        {signUp ? " Sign In" : " Sign Up"}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
