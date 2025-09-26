import useFormInput from './hooks/useFormInput'

import Card from "../../components/Card"
import FormInput from "./components/FormInput"

export default function AuthPage() {

    const { password, isShowPassword, handleChangePassword, handleClickShowHidePassword, handleSubmitForm } = useFormInput();

    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <Card className="text-bg-white p-2 card-auth">
                <h4 className="card-title">Akses Keamanan</h4>
                <FormInput
                    password={password}
                    isShowPassword={isShowPassword}
                    handleChangePassword={handleChangePassword}
                    handleClickShowHidePassword={handleClickShowHidePassword}
                    handleSubmitForm={handleSubmitForm}
                />
            </Card>
        </div>
    )
}