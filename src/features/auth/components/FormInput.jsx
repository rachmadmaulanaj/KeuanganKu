import { FaEye, FaEyeSlash } from "react-icons/fa6"

export default function FormInput({ password, isShowPassword, handleChangePassword, handleClickShowHidePassword, handleSubmitForm }) {
    return (
        <form className="mt-3" onSubmit={handleSubmitForm}>
            <div className="input-group">
                <input
                    value={password}
                    type={`${isShowPassword ? "text" : "password"}`}
                    className="form-control form-control-sm"
                    placeholder="Masukkan Kode Keamanan"
                    onChange={handleChangePassword}
                />
                <div className="input-group-text">
                    <span style={{ cursor: 'pointer' }} onClick={handleClickShowHidePassword}>
                        {isShowPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                    </span>
                </div>
            </div>
            <small className="text-muted" style={{ fontSize: '0.8rem' }}>Masukkan kode keamanan untuk membuka halaman</small>
            <button type="submit" className="btn btn-sm d-block w-100 btn-success mt-3" onClick={handleSubmitForm}>Submit</button>
        </form>
    )
}