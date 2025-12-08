import { memo } from 'react'
import { NumericFormat } from 'react-number-format'
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'

const FormInput = memo(({ form, inputOptions, alertBorderInput, handleChangeForm, handleSubmitForm }) => {
    return (
        <form className="overflow-auto h-form-add" onSubmit={handleSubmitForm}>
            <div className="row mx-0">
                <div className="col-12">
                    <label className="form-label">Transaksi</label>
                    <select className={`form-select ${alertBorderInput === 'transaction' && 'is-invalid'}`} name="transaction" value={form.transaction} onChange={handleChangeForm} disabled={form.type && 'disabled'}>
                        <option key="" value="">Pilih Transaksi</option>
                        {
                            inputOptions.transaction.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="row mx-0 mt-2">
                <div className="col-12 col-xl-3">
                    <label className="form-label">Tipe</label>
                    <select className={`form-select ${alertBorderInput === 'type' && 'is-invalid'}`} name="type" value={form.type} onChange={handleChangeForm} disabled={form.transaction && 'disabled'}>
                        <option key="" value="">Pilih Tipe</option>
                        {
                            inputOptions.type.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-12 col-xl-6">
                    <label className="form-label">Kategori</label>
                    <select className={`form-select ${alertBorderInput === 'category' && 'is-invalid'}`} name="category" value={form.category} onChange={handleChangeForm} disabled={!form.transaction && !form.autoDetail && 'disabled'}>
                        <option key="" value="">Pilih Kategori</option>
                        {
                            inputOptions.category.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-12 col-xl-3">
                    <label className="form-label">Auto Detail</label>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" name="autoDetail" id="autoDetail" checked={form.autoDetail} onChange={handleChangeForm} disabled={form.transaction && 'disabled'} />
                        <label className="form-check-label" htmlFor="autoDetail">
                            {form.autoDetail ? 'Ya' : 'Tidak'}
                        </label>
                    </div>
                </div>
            </div>

            <div className="row mx-0 mt-2">
                <div className="col-12 col-xl-6">
                    <label className="form-label">Tanggal Transaksi</label>
                    <DatePicker
                        name="date"
                        className="form-control"
                        selected={form.date}
                        onChange={handleChangeForm}
                        timeInputLabel="Waktu:"
                        dateFormat="dd/MM/yyyy h:mm aa"
                        showTimeInput
                        shouldCloseOnSelect={false}
                        wrapperClassName="w-100"
                    />
                </div>
                <div className="col-12 col-xl-6">
                    <label className="form-label">Nilai</label>
                    <NumericFormat
                        name="value"
                        className={`form-control text-end ${alertBorderInput === 'value' && 'is-invalid'}`}
                        placeholder="Rp 0"
                        value={form.value}
                        onValueChange={handleChangeForm}
                        thousandSeparator="."
                        decimalSeparator=","
                        allowNegative={true}
                        prefix="Rp "
                        fixedDecimalScale={false}
                        allowLeadingZeros={false}
                    />
                </div>
            </div>

            <div className="row mx-0 mt-2">
                <div className="col-12">
                    <label className="form-label">Deskripsi</label>
                    <textarea className={`form-control ${alertBorderInput === 'description' && 'is-invalid'}`} rows="3" placeholder="Masukkan Deskripsi" name="description" value={form.description} onChange={handleChangeForm}></textarea>
                </div>
            </div>

            {
                form.autoDetail ? (
                    <div className="row mx-0 mt-2">
                        <div className="col-12">
                            <label className="form-label">Deskripsi Detail</label>
                            <textarea className={`form-control ${alertBorderInput === 'descriptionDetail' && 'is-invalid'}`} rows="3" placeholder="Masukkan Deskripsi" name="descriptionDetail" value={form.descriptionDetail} onChange={handleChangeForm}></textarea>
                        </div>
                    </div>
                ) : null
            }
            <hr />
            <button className="btn btn-success w-100 rounded-4" type="submit" onClick={handleSubmitForm}>Simpan</button>
        </form>
    )
});

export default FormInput;