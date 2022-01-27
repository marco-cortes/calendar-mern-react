import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import "../../css/login.css";

import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [loginValues, handleLoginInputChange] = useForm({
        email: "",
        password: ""
    });

    const [registerValues, handleRegisterInputChange] = useForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(loginValues.email, loginValues.password));
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if(registerValues.password !== registerValues.confirmPassword) {
            return Swal.fire("Error", "Password must be the same", "error");
        }
        dispatch(startRegister(registerValues.email, registerValues.password, registerValues.name));
    }

    return (
        <div>
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-6 login-form-1">
                        <h3>Ingreso</h3>
                        <form onSubmit={handleLogin}>
                            <div className="form-group mb-3">
                                <input
                                    required
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo"
                                    name="email"
                                    value={loginValues.email}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    required
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name="password"
                                    value={loginValues.password}
                                    onChange={handleLoginInputChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    required
                                    type="submit"
                                    className="btnSubmit"
                                    value="Login"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="col-md-6 login-form-2">
                        <h3>Registro</h3>
                        <form onSubmit={handleRegister}>
                            <div className="form-group mb-3">
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    name="name"
                                    value={registerValues.name}
                                    onChange={handleRegisterInputChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    required
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo"
                                    name="email"
                                    value={registerValues.email}
                                    onChange={handleRegisterInputChange}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input
                                    required
                                    type="password"
                                    className="form-control"
                                    placeholder="Contraseña"
                                    name="password"
                                    value={registerValues.password}
                                    onChange={handleRegisterInputChange}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <input
                                    required
                                    type="password"
                                    className="form-control"
                                    placeholder="Repita la contraseña"
                                    name="confirmPassword"
                                    value={registerValues.confirmPassword}
                                    onChange={handleRegisterInputChange}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <input
                                    required
                                    type="submit"
                                    className="btnSubmit"
                                    value="Crear cuenta" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
