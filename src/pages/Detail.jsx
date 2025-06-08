import React from "react";
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy, getDocs, getDoc, limit, addDoc, where } from "firebase/firestore";
import Card from "../components/Card";
import CardCollapse from "../components/CardCollapse";
import Swal from 'sweetalert2';
import Select from 'react-select';
import { NumericFormat  } from 'react-number-format';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            details: [],
            typeDisabled: false,
            filter: {
                period: '',
                type: '',
                search: '',
            },
            formData: {
                trans_id: '',
                type: '',
                date: new Date(),
                value: '',
                desc: '',
                auto_detail: false,
                desc_detail: '',
                category: ''
            },
            optionsTransactionCategory: [],
            optionsFilterPeriod: [],
            optionsTransactions: [],
            alertBorder: { name: '', status: false },
            isLoadingButton: false,
        }
        this.optionsFilterType = [
            { value: 'transaction', label: 'Transaksi', name: 'type' },
            { value: 'detail', label: 'Detail', name: 'type' },
        ];
        this.optionsTransactionType = [
            { value: '', label: 'Pilih Tipe', name: 'type' },
            { value: 'balance', label: 'Saldo', name: 'type' },
            { value: 'add', label: 'Tambah', name: 'type' },
            { value: 'minus', label: 'Kurang', name: 'type' },
        ];
    }

    convertDateFormat = (date) => {
        const date_obj = new Date(date.seconds * 1000);
        const formatter = new Intl.DateTimeFormat('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        let formattedDateTime = formatter.format(date_obj);
        formattedDateTime = formattedDateTime.replace('pukul', '').replace('.', ':');

        return formattedDateTime;
    }
    convertRupiahFormat = (value) => {
        const string_value = value.toString();
        const formatted_value = string_value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `Rp. ${formatted_value},-`;
    }
    convertTransactionFormat = (data) => {
        const desc_v = `${data.type === 'add' ? '(+)' : '(-)'} ${this.convertRupiahFormat(data.value)} ${data.desc}`;
        const result = {
            id: data.id,
            date: data.date,
            desc: data.desc,
            type: data.type,
            value: data.value,
            desc_v: desc_v,
            date_v: this.convertDateFormat(data.date),
            value_v: this.convertRupiahFormat(data.value),
        };
        return result;
    }
    convertDetailFormat = (data) => {
        const result = {
            id: data.id,
            date: data.date,
            desc: data.desc,
            type: data.hasOwnProperty('type') ? data.type : '',
            value: data.value,
            date_v: this.convertDateFormat(data.date),
            value_v: this.convertRupiahFormat(data.value),
            trans_id: data.trans_id,
        };
        return result;
    }

    getDataCategory = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection_categories = collection(db, 'category');
                const q = query(
                    collection_categories,
                    orderBy('id', 'asc')
                );
                const querySnapshot = await getDocs(q);
                const result = querySnapshot.docs.map((doc) => {
                    return {
                        value: doc.data().id,
                        label: doc.data().name,
                        name: 'category',
                    };
                });
                resolve(result);
            } catch (error) {
                reject(error);
            }
        });
    }
    getDataFilterPeriod = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const collection_transactions = collection(db, 'transaction');
                const q = query(
                    collection_transactions,
                    orderBy('date', 'asc'),
                    limit(1)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(async (doc) => {
                    const documentSnapshot = await getDoc(doc.ref);
                    if (documentSnapshot.exists()) {
                        const last_date = new Date(documentSnapshot.data().date.seconds * 1000);
                        const current_date = new Date();

                        let result = [];
                        while (
                            last_date.getFullYear() * 100 + last_date.getMonth() <= 
                            current_date.getFullYear() * 100 + current_date.getMonth()
                        ) {
                            let month = last_date.toLocaleString('default', { month: 'long' });
                            let month_number = last_date.getMonth();
                            let year = last_date.getFullYear();
                            result.push({
                                value: `${year}|${month_number}`,
                                label: `${month} ${year}`,
                                name: 'period'
                            });
                            last_date.setMonth(last_date.getMonth() + 1);
                        }
                        result.sort((a, b) => {
                            const [yearA, monthA] = a.value.split('|').map(Number);
                            const [yearB, monthB] = b.value.split('|').map(Number);
                            return yearB - yearA || monthB - monthA;
                        });
                        resolve(result);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    };
    getDataTransactions = (year, month, limitt = null) => {
        const startMonth = new Date(parseInt(year), parseInt(month), 1);
        const endMonth = new Date(parseInt(year), parseInt(month) + 1, 1);

        const collectionTransactions = collection(db, 'transaction');
        const q = limitt ? query(
            collectionTransactions,
            orderBy('date', 'desc'),
            limit(limitt),
            where('type', '!=', 'balance'),
            where('date', '>=', startMonth),
            where('date', '<=', endMonth)
        ) : query(
            collectionTransactions,
            orderBy('date', 'desc'),
            where('type', '!=', 'balance'),
            where('date', '>=', startMonth),
            where('date', '<=', endMonth)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let transactions_arr = [];
            let docID = [];
            let options_transactions = [{ value: '', label: 'Pilih Transaksi', name: 'trans_id' }];
            querySnapshot.forEach((transaction) => {
                docID.push(transaction.id);
                const data = transaction.data();
                const type_symbol = data.type === 'add' ? '(+)' : '(-)';
                const label = type_symbol + ' ' + this.convertRupiahFormat(data.value) + ' (' + data.desc + ') ' + this.convertDateFormat(data.date);
                transactions_arr.push(this.convertTransactionFormat({ id: transaction.id, ...data }));
                options_transactions.push({
                    value: transaction.id,
                    label: label,
                    name: 'trans_id',
                });
            });
            this.setState({
                transactions: transactions_arr,
                optionsTransactions: options_transactions
            }, () => {
                this.getDataDetails(docID);
            });
        });

        return () => unsubscribe();
    }
    getDataDetails = (docID) => {
        if (docID.length) {
            const collectionDetails = collection(db, 'detail');
            const q = query(
                collectionDetails,
                orderBy('date', 'desc'),
                where('trans_id', 'in', docID),
            );
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let details_arr = [];
                querySnapshot.forEach((detail) => {
                    const docType = this.state.transactions.find(v => v.id === detail.data().trans_id);
                    details_arr.push(this.convertDetailFormat({ id: detail.id, ...detail.data(), type: docType.type }));
                });
                this.setState({ details: details_arr })
            });

            return () => unsubscribe();
        }
    }

    handleShowMore = (e) => {
        e.preventDefault();

        const filter_period_split = this.state.filter.period.value.split('|');
        this.getDataTransactions(filter_period_split[0], filter_period_split[1]);
    };
    handleChangeFilter = (opt) => {
        this.setState(
            { filter: { ...this.state.filter, [opt.name]: opt } },
            () => {
                const filter_period_split = this.state.filter.period.value.split('|');
                this.getDataTransactions(filter_period_split[0], filter_period_split[1]);
            }
        );
    };
    handleChangeInputValue = (val) => {
        const name = 'value';
        const value = val.floatValue;
        this.setFormDataInput(name, value);
    }
    handleChangeInputText = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setFormDataInput(name, value);
    }
    handleChangeInputSelect = (obj) => {
        const name = obj.name;
        const value = obj;
        this.setFormDataInput(name, value);
    }
    handleChangeInputDateTime = (val) => {
        const name = 'date';
        const value = val;
        this.setFormDataInput(name, value);
    }
    setFormDataInput = (name, value) => {
        this.setState({
            alertBorder: { name: '', status: false }
        });

        let type_value = '';
        let type_disabled_value = this.state.typeDisabled;

        /* 
        Pengecekan jika transaksi tidak dipilih, maka tipe disabled.
        - transaksi kosong = masuk tabel transaksi
        - transaksi isi = massuk tabel detail
        */
        if (name === 'trans_id') {
            if (!value.value) {
                type_disabled_value = false;
            } else {
                type_value = { type: '', auto_detail: false, desc_detail: '' };
                type_disabled_value = true;
            }
            type_value = { ...type_value, category: '' };
        }
        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value,
                ...type_value
            },
            typeDisabled: type_disabled_value
        });
    };
    handleChangeCheckbox = () => {
        this.setState({
            formData: {
                ...this.state.formData,
                auto_detail: !this.state.formData.auto_detail,
                desc_detail: '',
                category: ''
            }
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        const swal = Swal.fire({
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            icon: 'info',
            text: 'Proses menyimpan data...',
        });

        let form_data = {
            ...this.state.formData,
            trans_id: this.state.formData.trans_id ? this.state.formData.trans_id.value : '',
            type: this.state.formData.type ? this.state.formData.type.value : '',
            category: this.state.formData.category ? this.state.formData.category.value : '',
            date: this.state.formData.date ? new Date(this.state.formData.date) : '',
            value: parseInt(this.state.formData.value)
        };

        // Validation
        this.setState({ isLoadingButton: true });
        if (form_data.trans_id === '' && form_data.type === '') {
            this.showSwalValidation('type', 'Masukkan tipe transaksi!');
            return false;
        }
        if ((form_data.trans_id && !form_data.category) || (!form_data.category && form_data.auto_detail)) {
            this.showSwalValidation('category', 'Masukkan kategori transaksi!');
            return false;
        }
        if (!form_data.date) {
            this.showSwalValidation('date', 'Masukkan tanggal transaksi!');
            return false;
        }
        if (!form_data.value) {
            this.showSwalValidation('value', 'Masukkan nilai transaksi!');
            return false;
        }
        if (!form_data.desc) {
            this.showSwalValidation('desc', 'Masukkan deskripsi transaksi!');
            return false;
        }
        if (!form_data.desc_detail && form_data.auto_detail) {
            this.showSwalValidation('desc_detail', 'Masukkan deskripsi detail transaksi!');
            return false;
        }

        const collection_transaction = collection(db, 'transaction');
        const collection_detail = collection(db, 'detail');
        if (form_data.auto_detail) { //Input transaksi dan detail sekaligus
            const doc_transaction = await addDoc(collection_transaction, {
                type: form_data.type,
                date: form_data.date,
                value: form_data.value,
                desc: form_data.desc,
            });
            if (!doc_transaction.id) {
                swal.update({
                    icon: 'error',
                    text: 'Ada yang salah transaksi!',
                    showConfirmButton: true,
                });
                return false;
            }
            const doc_detail = await addDoc(collection_detail, {
                trans_id: doc_transaction.id,
                date: form_data.date,
                value: form_data.value,
                desc: form_data.desc_detail,
                category: form_data.category,
            });
            if (!doc_detail.id) {
                swal.update({
                    icon: 'error',
                    text: 'Ada yang salah detail!',
                    showConfirmButton: true,
                });
                return false;
            }
        } else {
            let data_transaction = null;
            if (form_data.trans_id) { //Input detail saja
                data_transaction = await addDoc(collection_detail, {
                    trans_id: form_data.trans_id,
                    date: form_data.date,
                    value: form_data.value,
                    desc: form_data.desc,
                    category: form_data.category,
                });
            } else { //input transaksi saja
                data_transaction = await addDoc(collection_transaction, {
                    type: form_data.type,
                    date: form_data.date,
                    value: form_data.value,
                    desc: form_data.desc,
                });
            }

            if (!data_transaction.id) {
                swal.update({
                    icon: 'error',
                    text: 'Ada yang salah transaksi & detail!',
                    showConfirmButton: true,
                });
                return false;
            }
        }

        this.setState({
            formData: {
                trans_id: { value: '', label: 'Pilih Transaksi', name: 'trans_id' },
                type: { value: '', label: 'Pilih Tipe', name: 'type' },
                category: { value: '', label: 'Pilih Kategori', name: 'category' },
                date: new Date(),
                value: '',
                desc: '',
                auto_detail: false,
                desc_detail: '',
            },
            typeDisabled: false
        });
        swal.update({
            icon: 'success',
            text: 'Data berhasil ditambahkan',
            showConfirmButton: true,
        });
        return false;
    };
    handleClickButtonChangePage = () => {
        this.props.onChangePage('dashboard');
    }
    showSwalValidation = (name, text) => {
        Swal.fire({
            position: 'top',
            showConfirmButton: false,
            showCloseButton: true,
            toast: true,
            timer: 3000,
            timerProgressBar: true,
            icon: 'warning',
            text: text,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        this.setState({
            alertBorder: { name: name, status: true },
            isLoadingButton: false
        });
    }

    componentDidMount() {
        this.props.checkSession();

        const current_date = new Date();
        this.getDataFilterPeriod()
            .then(optionsFilterPeriod => {
                this.setState({ optionsFilterPeriod }, () => {
                    const current_period = current_date.getFullYear() + '|' + current_date.getMonth();
                    this.setState({
                        filter: {
                            // period: this.state.optionsFilterPeriod.find(opt => opt.value === '2024|3'),
                            period: this.state.optionsFilterPeriod.find(opt => opt.value === current_period),
                            type: this.optionsFilterType.find(opt => opt.value === 'transaction'),
                            search: '',
                        }
                    });
                });
            })
            .catch(error => {
                console.error('Terjadi kesalahan:', error);
            });

        this.getDataCategory()
            .then(optionsTransactionCategory => {
                this.setState({ optionsTransactionCategory });
            })
            .catch(error => {
                console.error('Terjadi kesalahan:', error);
            });
    }
    componentDidUpdate(prevProps, prevState) {
        // Buat jika ada perubahan di filternya, otomatis update data transaksi
        if (prevState.filter.period !== this.state.filter.period) {
            const filter_period_split = this.state.filter.period.value.split('|');
            this.getDataTransactions(filter_period_split[0], filter_period_split[1], 5);
        }

        // Buat validasi input error terhapus jika ada perubahan diinputnya
        if (!this.state.formData[this.state.alertBorder.name]) {
            if (this.state.alertBorder.status) {
                document.getElementsByName(this.state.alertBorder.name)[0].focus();
            }
        }
    }
    componentWillUnmount() {
    }

    render() {
        return (
            <div className="container xl:px-5 mx-auto py-5">
                <div className="grid grid-rows-1 px-2">
                    <div className="flex justify-between">
                        <h1 className="text-4xl font-bold">Transaksi</h1>
                        <button
                            className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={this.handleClickButtonChangePage}
                        >
                            Dashboard
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 mt-3">
                    <div className="lg:pr-5 px-2">

                        <div className="grid grid-rows-1">
                            <div className="flex justify-between">
                                <h1 className="text-3xl font-bold">Daftar</h1>
                                <div className="flex">
                                    <Select
                                        name="type"
                                        onChange={this.handleChangeFilter}
                                        value={this.state.filter.type}
                                        className="block min-w-max border rounded-md mr-3"
                                        options={this.optionsFilterType}
                                    />
                                    <Select
                                        name="period"
                                        onChange={this.handleChangeFilter}
                                        value={this.state.filter.period}
                                        className="block min-w-max border rounded-md"
                                        options={this.state.optionsFilterPeriod}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* DAFTAR TRANSAKSI */}
                        <div className="mt-5">
                            <Card color="gray">
                                <div className="flex justify-between items-center">
                                    <h5 className="text-lg font-semibold text-neutral-900">Detail Transaksi :</h5>
                                    <input
                                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="Cari transaksi..."
                                        name="value"
                                        value={this.state.filter.search}
                                        onChange={() => {}}
                                    />
                                </div>
                                <div className="overflow-y-auto my-3" style={{ maxHeight: `calc(100vh - 300px)` }}>
                                    {
                                        this.state.filter.type.value === 'transaction' ?
                                            this.state.transactions.length ? (
                                                this.state.transactions.map((transaction) => {
                                                    const detail = this.state.details.filter(v => v.trans_id === transaction.id);
                                                    const total_value_detail = detail.reduce((acc, curr) => acc + curr.value, 0);
                                                    return <CardCollapse key={transaction.id} transaction={transaction} detail={detail} total_value_detail={this.convertRupiahFormat(total_value_detail)} />
                                                })
                                            ) : (
                                                <div className="w-full my-3 sm:text-base text-sm">
                                                    <div className="bg-white rounded-lg overflow-hidden">
                                                        <div className="p-2 text-center">Tidak ada data</div>
                                                    </div>
                                                </div>
                                            )
                                            :
                                            this.state.details.length ? (
                                                this.state.details.map((detail) => {
                                                    return <CardCollapse key={detail.id} transaction={detail} detail='' total_value_detail='' />
                                                })
                                            ) : (
                                                <div className="w-full my-3 sm:text-base text-sm">
                                                    <div className="bg-white rounded-lg overflow-hidden">
                                                        <div className="p-2 text-center">Tidak ada data</div>
                                                    </div>
                                                </div>
                                            )
                                    }
                                </div>
                                <div className={`my-2 ${this.state.transactions.length > 5 ? 'hidden' : ''}`}>
                                    <button
                                        className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                        type="button"
                                        onClick={this.handleShowMore}
                                    >
                                        Lihat Selengkapnya
                                    </button>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* TAMBAH TRANSAKSI */}
                    <div className="lg:pl-5 px-2 lg:mt-0 mt-5">
                        <div className="grid grid-rows-1">
                            <div className="flex justify-between">
                                <h1 className="text-3xl font-bold">Tambah</h1>
                            </div>
                        </div>
                        <ul>
                        </ul>
                        <Card color="gray">
                            <Card color="white">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="mb-3">
                                        <label className="block" htmlFor="transaction">Transaksi :</label>
                                        <Select
                                            name="trans_id"
                                            onChange={this.handleChangeInputSelect}
                                            className="block w-full border rounded-md"
                                            options={this.state.optionsTransactions}
                                            value={this.state.formData.trans_id}
                                        />
                                    </div>
                                    <div className="mb-3 grid grid-cols-3">
                                        <div className="mr-5 col-span-1">
                                            <label className="block" htmlFor="type">Tipe :</label>
                                            <Select
                                                name="type"
                                                onChange={this.handleChangeInputSelect}
                                                className={`block w-full border rounded-md ${this.state.alertBorder.name == 'type' && this.state.alertBorder.status ? 'border-red-300' : 'border-gray-300'}`}
                                                isDisabled={this.state.typeDisabled}
                                                options={this.optionsTransactionType}
                                                value={this.state.formData.type}
                                            />
                                        </div>
                                        <div className="col-span-1 mr-5">
                                            <label className="block" htmlFor="type">Kategori :</label>
                                            <Select
                                                name="category"
                                                onChange={this.handleChangeInputSelect}
                                                className={`block w-full border rounded-md ${this.state.alertBorder.name == 'category' && this.state.alertBorder.status ? 'border-red-300' : 'border-gray-300'}`}
                                                isDisabled={!this.state.typeDisabled && !this.state.formData.auto_detail}
                                                options={this.state.optionsTransactionCategory}
                                                value={this.state.formData.category}
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block">Auto Detail :</label>
                                            <div className="flex items-center">
                                                <input
                                                    className="form-checkbox h-4 w-4  mr-2 border-gray-300 rounded"
                                                    type="checkbox"
                                                    id="add_detail"
                                                    disabled={this.state.typeDisabled ? 'disabled' : ''}
                                                    checked={this.state.formData.auto_detail}
                                                    onChange={this.handleChangeCheckbox}
                                                />
                                                <label className={this.state.typeDisabled ? 'opacity-70' : ''} htmlFor="add_detail">{this.state.formData.auto_detail ? 'Ya' : 'Tidak'}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 grid grid-cols-2">
                                        <div className="col-span-1 mr-5">
                                            <label className="block" htmlFor="date">Tanggal Transaksi :</label>
                                            <DatePicker
                                                selected={this.state.formData.date}
                                                onChange={this.handleChangeInputDateTime}
                                                timeInputLabel="Waktu:"
                                                dateFormat="dd/MM/yyyy h:mm aa"
                                                showTimeInput
                                                shouldCloseOnSelect={false}
                                                wrapperClassName="w-full"
                                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${this.state.alertBorder.name == 'date' && this.state.alertBorder.status ? 'border-red-300' : 'border-gray-300'}`}
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block" htmlFor="value">Nilai :</label>
                                            <NumericFormat 
                                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${this.state.alertBorder.name == 'value' && this.state.alertBorder.status ? 'border-red-300' : 'border-gray-300'}`}
                                                placeholder="Masukkan Nominal Transaksi"
                                                name="value"
                                                value={this.state.formData.value}
                                                onValueChange={this.handleChangeInputValue}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                allowNegative={true}
                                                prefix="Rp "
                                                fixedDecimalScale={false}
                                                allowLeadingZeros={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="block" htmlFor="desc">Deskripsi :</label>
                                        <textarea
                                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${this.state.alertBorder.name == 'desc' && this.state.alertBorder.status ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="Masukkan Deskripsi"
                                            rows="3"
                                            name="desc"
                                            value={this.state.formData.desc}
                                            onChange={this.handleChangeInputText}
                                        ></textarea>
                                    </div>
                                    <div className={`mb-3 ${this.state.formData.auto_detail ? '' : 'hidden'}`}>
                                        <label className="block" htmlFor="desc_detail">Deskripsi Detail :</label>
                                        <textarea
                                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${this.state.alertBorder.name == 'desc_detail' && this.state.alertBorder.status ? 'border-red-300' : 'border-gray-300'}`}
                                            placeholder="Masukkan Deskripsi Detail"
                                            rows="3"
                                            name="desc_detail"
                                            value={this.state.formData.desc_detail}
                                            onChange={this.handleChangeInputText}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </Card>
                        </Card>
                    </div>
                </div>
            </div >
        )
    }
}

export default Detail;