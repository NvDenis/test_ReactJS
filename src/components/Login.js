import { useState } from "react"

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    return (<>
        <div className="login-container col-12 col-sm-4" >
            <div className="title">Log in</div>
            <div className="text">Email or Username</div>
            <input
                type="text"
                placeholder="Email or username..."
                value={email}
                onChange={e => handleEmail(e)}
            />
            <div className="input-password">
                <input
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={e => handlePassword(e)}
                />
                <i class={isShowPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>
            <button
                className={password && email ? "btn-login active" : 'btn-login'}
                disabled={password && email ? false : true}
            >
                Login
            </button>
            <div className="back" >
                <i className="fa-solid fa-chevron-left"></i> Go back
            </div>
        </div>
    </>)
}

export default Login