import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../actions/auth';
export const NavBar = () => {

    const { name } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(startLogout());
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Calendar App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <span className="nav-link active">{name}</span>
                        <button className="btn btn-outline-danger" onClick={logout}>
                            <i className="fas fa-sign-out"></i>
                            <span> Salir </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
