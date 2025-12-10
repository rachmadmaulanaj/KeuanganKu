import { useRef, useState, useEffect, useCallback } from 'react'
import { convertDateFormat, convertRupiahFormat } from "../../../utils/global"
import { addTransactions } from '../services/transactionService'
import { addDetails, updateDetails, deleteDetail } from '../services/detailService'
import moment from 'moment'
import Swal from "sweetalert2"

export default function useFormInput(transactions, details, categories, loadDataTransaction) {
    const inputType = useRef([
        { value: 'balance', label: 'Saldo' },
        { value: 'add', label: 'Pemasukan' },
        { value: 'minus', label: 'Pengeluaran' },
    ]);

    const [form, setForm] = useState({
        idEdit: 0,
        transaction: '',
        type: '',
        category: '',
        autoDetail: '',
        date: moment(),
        value: '',
        description: '',
        descriptionDetail: '',
    });
    const [inputOptions, setInputOptions] = useState({
        type: inputType.current,
        transaction: [],
        category: []
    });
    const [alertBorderInput, setAlertBorderInput] = useState('');

    const alertForm = (input, text) => {
        setAlertBorderInput(input);
        return Swal.fire({ icon: 'error', text: text });
    }
    const handleChangeForm = useCallback((e) => {
        let name = '';
        let value = '';
        let valueTrigger = {};
        if (e.hasOwnProperty("target")) {
            name = e.target.name;
            value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

            if (
                (name === 'transaction' && !value) ||
                (name === 'type' && !value && form.autoDetail) ||
                (name === 'autoDetail' && !value)
            ) {
                valueTrigger.category = '';
            }
            if ((name === 'autoDetail' && !value)) {
                valueTrigger.transaction = '';
                valueTrigger.descriptionDetail = '';
            }
            if (name === 'type' && !value) {
                valueTrigger.autoDetail = false;
                valueTrigger.descriptionDetail = '';
            }
        } else if (e.hasOwnProperty("floatValue")) {
            name = 'value';
            value = e.floatValue;
        } else {
            name = 'date';
            value = moment(new Date(e)).format('YYYY-MM-DD HH:mm:ss');
        }
        setForm(prev => {
            const next = { ...prev, [name]: value, ...valueTrigger };
            const isSame = Object.keys(next).every(key => prev[key] === next[key]);
            return isSame ? prev : next;
        });
    }, [form]);
    const handleSubmitForm = useCallback((e) => {
        e.preventDefault();

        if (!form.transaction && !form.type) {
            alertForm('transaction', 'Pilih transaksi terlebih dahulu!');
            return;
        }
        if (!form.type && !form.transaction) {
            alertForm('type', 'Pilih tipe terlebih dahulu!');
            return;
        }
        if (!form.category && (form.transaction || (form.type && form.autoDetail))) {
            alertForm('category', 'Pilih kategori terlebih dahulu!');
            return;
        }
        if (!form.value) {
            alertForm('value', 'Nilai tidak boleh kosong!');
            return;
        }
        if (!form.description) {
            alertForm('description', 'Deskripsi tidak boleh kosong!');
            return;
        }
        if (!form.descriptionDetail && form.autoDetail) {
            alertForm('descriptionDetail', 'Deskripsi detail tidak boleh kosong!');
            return;
        }

        handleSave();
    }, [form]);
    const handleSave = async () => {
        Swal.fire({
            title: 'Proses menyimpan data...',
            text: 'Silakan tunggu',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => { Swal.showLoading(); }
        });

        try {
            const dateFormat = moment(form.date).seconds(0).format('YYYY-MM-DD HH:mm:ss');
            const dataInputTransaction = {
                date: dateFormat,
                type: form.type,
                description: form.description,
                value: form.value
            };
            const dataInputDetail = {
                trans_id: form.transaction,
                category_id: form.category,
                date: dateFormat,
                description: form.description,
                value: form.value
            };

            if (form.idEdit) {
                const resultDetailEdit = await updateDetails(form.idEdit, dataInputDetail);
                if (resultDetailEdit.error) throw resultDetailEdit.error;
            } else {
                if (form.transaction) {
                    const resultDetail = await addDetails(dataInputDetail);
                    if (resultDetail.error) throw resultDetail.error;
                }
                if (form.type) {
                    const resultTransaction = await addTransactions(dataInputTransaction);
                    if (resultTransaction.error) throw resultTransaction.error;

                    if (form.autoDetail) {
                        dataInputDetail.trans_id = resultTransaction[0].id;
                        dataInputDetail.description = form.descriptionDetail;

                        const resultDetail = await addDetails(dataInputDetail);
                        if (resultDetail.error) throw resultDetail.error;
                    }
                }
            }

            Swal.fire({
                icon: 'success',
                title: `Berhasil ${form.idEdit ? 'mengedit' : 'menambah'} data`,
                showConfirmButton: true,
            }).then(() => {
                resetForm();
                loadDataTransaction();
            });
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal menyimpan data',
                text: error.message,
                showConfirmButton: true,
            });
            return false;
        }
    }
    const resetForm = () => {
        setForm({
            idEdit: 0,
            transaction: '',
            type: '',
            category: '',
            autoDetail: false,
            date: moment(),
            value: '',
            description: '',
            descriptionDetail: '',
        });
        setAlertBorderInput('');
    }
    const handleEdit = useCallback((id) => {
        const detail = details.find(detail => detail.id === id);
        setForm({
            idEdit: id,
            transaction: detail.trans_id,
            type: '',
            category: detail.category_id,
            autoDetail: false,
            date: moment(detail.date).format('YYYY-MM-DD HH:mm:ss'),
            value: detail.value,
            description: detail.description,
            descriptionDetail: '',
        });
    }, [details]);
    const handleCloseEdit = useCallback(() => {
        resetForm();
    }, []);
    const handleDelete = useCallback(async (id) => {
        const resultSwal = await Swal.fire({
            icon: 'warning',
            title: 'Yakin akan menghapus data ini?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Batal",
        });

        if (resultSwal.isConfirmed) {
            try {
                const resultDelete = await deleteDetail(id);
                if (resultDelete.error) throw resultDelete.error;

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil menghapus data',
                    showConfirmButton: true,
                }).then(() => {
                    loadDataTransaction();
                });
                return true;
            } catch (error) {
                console.error('Error deleting data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal menghapus data',
                    text: error.message,
                    showConfirmButton: true,
                });
                return false;
            }
        }
    }, [details]);

    useEffect(() => {
        const inputOptionsTransaction = transactions
            .filter(transactions => transactions.type !== 'balance')
            .map((transaction) => {
                if (transaction.type === 'balance') return null;
                const typeCode = transaction.type === 'minus' ? '-' : '+';
                return {
                    value: transaction.id,
                    label: `(${typeCode}) | ${convertRupiahFormat(transaction.value)} | ${transaction.description} | ${convertDateFormat(transaction.date)}`
                }
            });
        setInputOptions(prev => ({ ...prev, transaction: inputOptionsTransaction }));
    }, [transactions]);

    useEffect(() => {
        const inputOptionsCategory = categories.map((category) => ({ value: category.id, label: category.name }));
        setInputOptions(prev => ({ ...prev, category: inputOptionsCategory }));
    }, [categories]);

    return { form, inputOptions, alertBorderInput, handleChangeForm, handleSubmitForm, handleEdit, handleCloseEdit, handleDelete };
}