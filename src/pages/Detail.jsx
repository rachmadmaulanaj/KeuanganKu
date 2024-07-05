import React from "react";
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy, getDocs, getDoc, limit, addDoc, where } from "firebase/firestore";
import Header from "../components/Header";
import Card from "../components/Card";
import CardCollapse from "../components/CardCollapse";
import Swal from 'sweetalert2';
import ReactLoading from 'react-loading';
import Select from 'react-select';
import { NumberFormatBase } from 'react-number-format';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import dateTimeID from 'date-fns/locale/id'; // Import locale

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /*
            transactions: [
                {
                    "id": "D0dJ3rZmJtukoLrmzoyL",
                    "date": {
                        "seconds": 1716769200,
                        "nanoseconds": 0
                    },
                    "desc": "Tarik tunai",
                    "type": "minus",
                    "value": 150000,
                    "desc_v": "(-) Rp. 150.000,- Tarik tunai",
                    "date_v": "Senin, 27 Mei 2024  07:20",
                    "value_v": "Rp. 150.000,-"
                },
                {
                    "id": "CLeYzrGnDKrkvEr1nGqR",
                    "date": {
                        "seconds": 1716472800,
                        "nanoseconds": 0
                    },
                    "desc": "Transfer ke Dhanes",
                    "type": "minus",
                    "value": 1102500,
                    "desc_v": "(-) Rp. 1.102.500,- Transfer ke Dhanes",
                    "date_v": "Kamis, 23 Mei 2024  21:00",
                    "value_v": "Rp. 1.102.500,-"
                },
                {
                    "id": "wcnaqsSnihY7m3j6vJBg",
                    "date": {
                        "seconds": 1716451200,
                        "nanoseconds": 0
                    },
                    "desc": "Gaji bulan mei",
                    "type": "add",
                    "value": 4935000,
                    "desc_v": "(+) Rp. 4.935.000,- Gaji bulan mei",
                    "date_v": "Kamis, 23 Mei 2024  15:00",
                    "value_v": "Rp. 4.935.000,-"
                },
                {
                    "id": "4E38ilFqesFucqTPQyAd",
                    "date": {
                        "seconds": 1716376200,
                        "nanoseconds": 0
                    },
                    "desc": "Tarik tunai",
                    "type": "minus",
                    "value": 200000,
                    "desc_v": "(-) Rp. 200.000,- Tarik tunai",
                    "date_v": "Rabu, 22 Mei 2024  18:10",
                    "value_v": "Rp. 200.000,-"
                },
                {
                    "id": "16oO9VXY5QjWIQXWo1qG",
                    "date": {
                        "seconds": 1716300000,
                        "nanoseconds": 0
                    },
                    "desc": "Tarik tunai",
                    "type": "minus",
                    "value": 100000,
                    "desc_v": "(-) Rp. 100.000,- Tarik tunai",
                    "date_v": "Selasa, 21 Mei 2024  21:00",
                    "value_v": "Rp. 100.000,-"
                },
                {
                    "id": "1lEzFcRBiwXcKYtS82D6",
                    "date": {
                        "seconds": 1716118200,
                        "nanoseconds": 0
                    },
                    "desc": "Transfer ke Dhanes",
                    "type": "minus",
                    "value": 2502500,
                    "desc_v": "(-) Rp. 2.502.500,- Transfer ke Dhanes",
                    "date_v": "Minggu, 19 Mei 2024  18:30",
                    "value_v": "Rp. 2.502.500,-"
                },
                {
                    "id": "5YGebEKFJpg2Jki4mvvI",
                    "date": {
                        "seconds": 1716096000,
                        "nanoseconds": 0
                    },
                    "desc": "Transfer ke Palapa toserba",
                    "type": "minus",
                    "value": 98100,
                    "desc_v": "(-) Rp. 98.100,- Transfer ke Palapa toserba",
                    "date_v": "Minggu, 19 Mei 2024  12:20",
                    "value_v": "Rp. 98.100,-"
                },
                {
                    "id": "tFC3QcknKE7Zb528onoq",
                    "date": {
                        "seconds": 1716095400,
                        "nanoseconds": 0
                    },
                    "desc": "Transfer ke Palapa toserba",
                    "type": "minus",
                    "value": 62000,
                    "desc_v": "(-) Rp. 62.000,- Transfer ke Palapa toserba",
                    "date_v": "Minggu, 19 Mei 2024  12:10",
                    "value_v": "Rp. 62.000,-"
                },
                {
                    "id": "Dmlm84aGjVgSFMypmQBS",
                    "date": {
                        "seconds": 1716009000,
                        "nanoseconds": 0
                    },
                    "desc": "Tarik tunai",
                    "type": "minus",
                    "value": 100000,
                    "desc_v": "(-) Rp. 100.000,- Tarik tunai",
                    "date_v": "Sabtu, 18 Mei 2024  12:10",
                    "value_v": "Rp. 100.000,-"
                },
                {
                    "id": "T3xuKoFAvhbcqxKUjlmL",
                    "date": {
                        "seconds": 1715907600,
                        "nanoseconds": 0
                    },
                    "desc": "Arta kembalikan uang",
                    "type": "add",
                    "value": 42000,
                    "desc_v": "(+) Rp. 42.000,- Arta kembalikan uang",
                    "date_v": "Jumat, 17 Mei 2024  08:00",
                    "value_v": "Rp. 42.000,-"
                },
                {
                    "id": "h0hoHUvH4YMQB6KdRnEa",
                    "date": {
                        "seconds": 1715857200,
                        "nanoseconds": 0
                    },
                    "desc": "Tarik tunai",
                    "type": "minus",
                    "value": 200000,
                    "desc_v": "(-) Rp. 200.000,- Tarik tunai",
                    "date_v": "Kamis, 16 Mei 2024  18:00",
                    "value_v": "Rp. 200.000,-"
                },
                {
                    "id": "Dosc50rC3wR0kA7QEUds",
                    "date": {
                        "seconds": 1715385600,
                        "nanoseconds": 0
                    },
                    "desc": "Tarik tunai",
                    "type": "minus",
                    "value": 200000,
                    "desc_v": "(-) Rp. 200.000,- Tarik tunai",
                    "date_v": "Sabtu, 11 Mei 2024  07:00",
                    "value_v": "Rp. 200.000,-"
                },
                {
                    "id": "TDXvdZZMuFvHno9ndSJZ",
                    "date": {
                        "seconds": 1715247000,
                        "nanoseconds": 0
                    },
                    "desc": "Transfer ke Palapa Toserba",
                    "type": "minus",
                    "value": 166200,
                    "desc_v": "(-) Rp. 166.200,- Transfer ke Palapa Toserba",
                    "date_v": "Kamis, 9 Mei 2024  16:30",
                    "value_v": "Rp. 166.200,-"
                },
                {
                    "id": "2dpuoQh80eQzcP24TScy",
                    "date": {
                        "seconds": 1715216400,
                        "nanoseconds": 0
                    },
                    "desc": "Transfer ke Tahta Motor",
                    "type": "minus",
                    "value": 211000,
                    "desc_v": "(-) Rp. 211.000,- Transfer ke Tahta Motor",
                    "date_v": "Kamis, 9 Mei 2024  08:00",
                    "value_v": "Rp. 211.000,-"
                },
                {
                    "id": "DL9mDFwZyrtwEjWBpMZy",
                    "date": {
                        "seconds": 1715125800,
                        "nanoseconds": 0
                    },
                    "desc": "Tarik tunai",
                    "type": "minus",
                    "value": 200000,
                    "desc_v": "(-) Rp. 200.000,- Tarik tunai",
                    "date_v": "Rabu, 8 Mei 2024  06:50",
                    "value_v": "Rp. 200.000,-"
                },
                {
                    "id": "IVlrsaTAGGUYjhZM1cRy",
                    "date": {
                        "seconds": 1714975200,
                        "nanoseconds": 0
                    },
                    "desc": "Transfer ke Dhanes",
                    "type": "minus",
                    "value": 3002500,
                    "desc_v": "(-) Rp. 3.002.500,- Transfer ke Dhanes",
                    "date_v": "Senin, 6 Mei 2024  13:00",
                    "value_v": "Rp. 3.002.500,-"
                },
                {
                    "id": "yLqjggqYK6Wu1SO1FKIk",
                    "date": {
                        "seconds": 1714797000,
                        "nanoseconds": 0
                    },
                    "desc": "Transfer ke Dhanes",
                    "type": "minus",
                    "value": 3002500,
                    "desc_v": "(-) Rp. 3.002.500,- Transfer ke Dhanes",
                    "date_v": "Sabtu, 4 Mei 2024  11:30",
                    "value_v": "Rp. 3.002.500,-"
                },
                {
                    "id": "BRhXv9yyUrrp9fZEHGCQ",
                    "date": {
                        "seconds": 1714733400,
                        "nanoseconds": 0
                    },
                    "desc": "Tarik tunai",
                    "type": "minus",
                    "value": 300000,
                    "desc_v": "(-) Rp. 300.000,- Tarik tunai",
                    "date_v": "Jumat, 3 Mei 2024  17:50",
                    "value_v": "Rp. 300.000,-"
                },
                {
                    "id": "PHI8IWRncatznwcBl7rI",
                    "date": {
                        "seconds": 1714633200,
                        "nanoseconds": 0
                    },
                    "desc": "Transfer ke Shopee",
                    "type": "minus",
                    "value": 301000,
                    "desc_v": "(-) Rp. 301.000,- Transfer ke Shopee",
                    "date_v": "Kamis, 2 Mei 2024  14:00",
                    "value_v": "Rp. 301.000,-"
                },
                {
                    "id": "BgvR1SlRaLTldCX2jtZD",
                    "date": {
                        "seconds": 1714618800,
                        "nanoseconds": 0
                    },
                    "desc": "Iqbal kembalikan uang",
                    "type": "add",
                    "value": 300000,
                    "desc_v": "(+) Rp. 300.000,- Iqbal kembalikan uang",
                    "date_v": "Kamis, 2 Mei 2024  10:00",
                    "value_v": "Rp. 300.000,-"
                },
                {
                    "id": "DKjiPAnMtKnuVUMX9jnZ",
                    "date": {
                        "seconds": 1714559400,
                        "nanoseconds": 0
                    },
                    "desc": "Transfer ke Arta",
                    "type": "minus",
                    "value": 42000,
                    "desc_v": "(-) Rp. 42.000,- Transfer ke Arta",
                    "date_v": "Rabu, 1 Mei 2024  17:30",
                    "value_v": "Rp. 42.000,-"
                }
            ],
            details: [
                {
                    "id": "PqvUfyQjjG0efZCW38Jg",
                    "date": {
                        "seconds": 1716769800,
                        "nanoseconds": 431000000
                    },
                    "desc": "Beli onde-onde",
                    "type": "minus",
                    "value": 15000,
                    "date_v": "Senin, 27 Mei 2024  07:30",
                    "value_v": "Rp. 15.000,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "GlHxcUtNt6igMpVmgK8e",
                    "date": {
                        "seconds": 1716769500,
                        "nanoseconds": 210000000
                    },
                    "desc": "Beli lauk kering tempe, dadar jagung, bali",
                    "type": "minus",
                    "value": 17000,
                    "date_v": "Senin, 27 Mei 2024  07:25",
                    "value_v": "Rp. 17.000,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "QlHJiR9FEZGea8foo3vy",
                    "date": {
                        "seconds": 1716642000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli jajan ck & es apsari kencan",
                    "type": "minus",
                    "value": 23000,
                    "date_v": "Sabtu, 25 Mei 2024  20:00",
                    "value_v": "Rp. 23.000,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "YGLegI5cb73UYhBko5SM",
                    "date": {
                        "seconds": 1716635700,
                        "nanoseconds": 0
                    },
                    "desc": "Beli makan sambel mak yeye 2 & es teh kencan",
                    "type": "minus",
                    "value": 30000,
                    "date_v": "Sabtu, 25 Mei 2024  18:15",
                    "value_v": "Rp. 30.000,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "zXZUgoDM67qxFiNKItxw",
                    "date": {
                        "seconds": 1716635100,
                        "nanoseconds": 0
                    },
                    "desc": "Pompa ban belakang vario",
                    "type": "minus",
                    "value": 2000,
                    "date_v": "Sabtu, 25 Mei 2024  18:05",
                    "value_v": "Rp. 2.000,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "WjmfMJrUTlmGgORWsVU1",
                    "date": {
                        "seconds": 1716634800,
                        "nanoseconds": 0
                    },
                    "desc": "Parkir masjid rahmat",
                    "type": "minus",
                    "value": 2000,
                    "date_v": "Sabtu, 25 Mei 2024  18:00",
                    "value_v": "Rp. 2.000,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "fIXGBZZipR7FwZqmOxCA",
                    "date": {
                        "seconds": 1716634200,
                        "nanoseconds": 0
                    },
                    "desc": "Parkir indomaret",
                    "type": "minus",
                    "value": 2000,
                    "date_v": "Sabtu, 25 Mei 2024  17:50",
                    "value_v": "Rp. 2.000,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "S52wHYDbNVoa6IH0qzVu",
                    "date": {
                        "seconds": 1716626400,
                        "nanoseconds": 0
                    },
                    "desc": "Beli aqua galon",
                    "type": "minus",
                    "value": 16500,
                    "date_v": "Sabtu, 25 Mei 2024  15:40",
                    "value_v": "Rp. 16.500,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "l5aOwfMglRjCSB5Nvivq",
                    "date": {
                        "seconds": 1716615000,
                        "nanoseconds": 933000000
                    },
                    "desc": "Beli elpigi",
                    "type": "minus",
                    "value": 17000,
                    "date_v": "Sabtu, 25 Mei 2024  12:30",
                    "value_v": "Rp. 17.000,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "eKOEnjZLcXAbG92wAMQR",
                    "date": {
                        "seconds": 1716595200,
                        "nanoseconds": 0
                    },
                    "desc": "Beli tauwa",
                    "type": "minus",
                    "value": 8000,
                    "date_v": "Sabtu, 25 Mei 2024  07:00",
                    "value_v": "Rp. 8.000,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "7hkz2U3EZnMzqX5zIJBt",
                    "date": {
                        "seconds": 1716528600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli nasi campur istirahat",
                    "type": "minus",
                    "value": 10000,
                    "date_v": "Jumat, 24 Mei 2024  12:30",
                    "value_v": "Rp. 10.000,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "i9JRDnqSUQWt2ztK9hVD",
                    "date": {
                        "seconds": 1716528000,
                        "nanoseconds": 0
                    },
                    "desc": "Sedekah jumat",
                    "type": "minus",
                    "value": 10000,
                    "date_v": "Jumat, 24 Mei 2024  12:20",
                    "value_v": "Rp. 10.000,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "H7sMAqbVxXCque3QUIlG",
                    "date": {
                        "seconds": 1716509400,
                        "nanoseconds": 0
                    },
                    "desc": "Beli krupuk & kering tempe",
                    "type": "minus",
                    "value": 11000,
                    "date_v": "Jumat, 24 Mei 2024  07:10",
                    "value_v": "Rp. 11.000,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "iLBjGBlZPt04oiCAYryY",
                    "date": {
                        "seconds": 1716472800,
                        "nanoseconds": 0
                    },
                    "desc": "Beli keyboard dhanes (admin 2.500)",
                    "type": "minus",
                    "value": 1102500,
                    "date_v": "Kamis, 23 Mei 2024  21:00",
                    "value_v": "Rp. 1.102.500,-",
                    "trans_id": "CLeYzrGnDKrkvEr1nGqR"
                },
                {
                    "id": "FaBZuuXjqWRuee9x4toh",
                    "date": {
                        "seconds": 1716451200,
                        "nanoseconds": 0
                    },
                    "desc": "Gaji bulan mei",
                    "type": "add",
                    "value": 4935000,
                    "date_v": "Kamis, 23 Mei 2024  15:00",
                    "value_v": "Rp. 4.935.000,-",
                    "trans_id": "wcnaqsSnihY7m3j6vJBg"
                },
                {
                    "id": "pG4ENaYS5pa3sgdDhfQO",
                    "date": {
                        "seconds": 1716426000,
                        "nanoseconds": 0
                    },
                    "desc": "Parkir taman apsari",
                    "type": "minus",
                    "value": 2000,
                    "date_v": "Kamis, 23 Mei 2024  08:00",
                    "value_v": "Rp. 2.000,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "mHpNE67yMvi2HPs3bYAO",
                    "date": {
                        "seconds": 1716423000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli bubur ayam 2 kencan",
                    "type": "minus",
                    "value": 30000,
                    "date_v": "Kamis, 23 Mei 2024  07:10",
                    "value_v": "Rp. 30.000,-",
                    "trans_id": "4E38ilFqesFucqTPQyAd"
                },
                {
                    "id": "wb1BOkTHFnn1W9765kyU",
                    "date": {
                        "seconds": 1716376800,
                        "nanoseconds": 0
                    },
                    "desc": "Beli jajan barokah, keripik, sempol",
                    "type": "minus",
                    "value": 65000,
                    "date_v": "Rabu, 22 Mei 2024  18:20",
                    "value_v": "Rp. 65.000,-",
                    "trans_id": "16oO9VXY5QjWIQXWo1qG"
                },
                {
                    "id": "frkcGjPYmyCPwKMVvAVz",
                    "date": {
                        "seconds": 1716375600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli bensin pertalite suprax",
                    "type": "minus",
                    "value": 30000,
                    "date_v": "Rabu, 22 Mei 2024  18:00",
                    "value_v": "Rp. 30.000,-",
                    "trans_id": "16oO9VXY5QjWIQXWo1qG"
                },
                {
                    "id": "Ip8ph0FdDzVFl7f6kvmU",
                    "date": {
                        "seconds": 1716354000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli pentol & es teh istirahat",
                    "type": "minus",
                    "value": 8000,
                    "date_v": "Rabu, 22 Mei 2024  12:00",
                    "value_v": "Rp. 8.000,-",
                    "trans_id": "16oO9VXY5QjWIQXWo1qG"
                },
                {
                    "id": "2VGul3bkRuwRZ4t2j19w",
                    "date": {
                        "seconds": 1716300000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli jajan bocil indomaret",
                    "type": "minus",
                    "value": 32100,
                    "date_v": "Selasa, 21 Mei 2024  21:00",
                    "value_v": "Rp. 32.100,-",
                    "trans_id": "Dmlm84aGjVgSFMypmQBS"
                },
                {
                    "id": "xzHuMiSE3ZWyEA1S2uoj",
                    "date": {
                        "seconds": 1716267600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli es teh & kacang",
                    "type": "minus",
                    "value": 4000,
                    "date_v": "Selasa, 21 Mei 2024  12:00",
                    "value_v": "Rp. 4.000,-",
                    "trans_id": "Dmlm84aGjVgSFMypmQBS"
                },
                {
                    "id": "ADmUNtmiw7UPq4aJWmwE",
                    "date": {
                        "seconds": 1716181200,
                        "nanoseconds": 0
                    },
                    "desc": "Beli es teh istirahat",
                    "type": "minus",
                    "value": 3000,
                    "date_v": "Senin, 20 Mei 2024  12:00",
                    "value_v": "Rp. 3.000,-",
                    "trans_id": "Dmlm84aGjVgSFMypmQBS"
                },
                {
                    "id": "72sk6GJV4i7lY4RoLlLC",
                    "date": {
                        "seconds": 1716118200,
                        "nanoseconds": 0
                    },
                    "desc": "Dhanes pinjam uang (admin 2.500)",
                    "type": "minus",
                    "value": 2502500,
                    "date_v": "Minggu, 19 Mei 2024  18:30",
                    "value_v": "Rp. 2.502.500,-",
                    "trans_id": "1lEzFcRBiwXcKYtS82D6"
                },
                {
                    "id": "uWKoljXHd0vmVpk0PKYy",
                    "date": {
                        "seconds": 1716114600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli bakso 2 & kerupuk",
                    "type": "minus",
                    "value": 25000,
                    "date_v": "Minggu, 19 Mei 2024  17:30",
                    "value_v": "Rp. 25.000,-",
                    "trans_id": "Dmlm84aGjVgSFMypmQBS"
                },
                {
                    "id": "0sSU8cNTFEBIk0uZ3aop",
                    "date": {
                        "seconds": 1716096000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli jajan, keranjang, wangi2an toilet",
                    "type": "minus",
                    "value": 98100,
                    "date_v": "Minggu, 19 Mei 2024  12:20",
                    "value_v": "Rp. 98.100,-",
                    "trans_id": "5YGebEKFJpg2Jki4mvvI"
                },
                {
                    "id": "HZoZi4X1b8TEEg61iTHT",
                    "date": {
                        "seconds": 1716095400,
                        "nanoseconds": 0
                    },
                    "desc": "Beli parfum, sampo, sabun muka",
                    "type": "minus",
                    "value": 62000,
                    "date_v": "Minggu, 19 Mei 2024  12:10",
                    "value_v": "Rp. 62.000,-",
                    "trans_id": "tFC3QcknKE7Zb528onoq"
                },
                {
                    "id": "jv1M0FBbzVYVAboRGfwp",
                    "date": {
                        "seconds": 1716031200,
                        "nanoseconds": 0
                    },
                    "desc": "Beli tahu tek 2 kencan",
                    "type": "minus",
                    "value": 36000,
                    "date_v": "Sabtu, 18 Mei 2024  18:20",
                    "value_v": "Rp. 36.000,-",
                    "trans_id": "Dmlm84aGjVgSFMypmQBS"
                },
                {
                    "id": "ahl0zerPPvMatgNun6dH",
                    "date": {
                        "seconds": 1716030000,
                        "nanoseconds": 0
                    },
                    "desc": "Parkir masjid tembok",
                    "type": "minus",
                    "value": 2000,
                    "date_v": "Sabtu, 18 Mei 2024  18:00",
                    "value_v": "Rp. 2.000,-",
                    "trans_id": "Dmlm84aGjVgSFMypmQBS"
                },
                {
                    "id": "x2X8y8TEql87KL3w2kzV",
                    "date": {
                        "seconds": 1716024600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli mixue 2 kencan",
                    "type": "minus",
                    "value": 32000,
                    "date_v": "Sabtu, 18 Mei 2024  16:30",
                    "value_v": "Rp. 32.000,-",
                    "trans_id": "h0hoHUvH4YMQB6KdRnEa"
                },
                {
                    "id": "E5n0q90OXchyXJShIvU3",
                    "date": {
                        "seconds": 1716023400,
                        "nanoseconds": 0
                    },
                    "desc": "Pompa ban vario",
                    "type": "minus",
                    "value": 2000,
                    "date_v": "Sabtu, 18 Mei 2024  16:10",
                    "value_v": "Rp. 2.000,-",
                    "trans_id": "h0hoHUvH4YMQB6KdRnEa"
                },
                {
                    "id": "a8cuYTkrg0UWT4KDE7G1",
                    "date": {
                        "seconds": 1716022800,
                        "nanoseconds": 0
                    },
                    "desc": "Beli bensin pertamax vario",
                    "type": "minus",
                    "value": 40000,
                    "date_v": "Sabtu, 18 Mei 2024  16:00",
                    "value_v": "Rp. 40.000,-",
                    "trans_id": "h0hoHUvH4YMQB6KdRnEa"
                },
                {
                    "id": "9D4J0qQLm2TlFOz7q6lH",
                    "date": {
                        "seconds": 1716009600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli buah & kerupuk",
                    "type": "minus",
                    "value": 13000,
                    "date_v": "Sabtu, 18 Mei 2024  12:20",
                    "value_v": "Rp. 13.000,-",
                    "trans_id": "h0hoHUvH4YMQB6KdRnEa"
                },
                {
                    "id": "gb2CCUurkdT6PlVJezyw",
                    "date": {
                        "seconds": 1716008400,
                        "nanoseconds": 0
                    },
                    "desc": "Beli ayam krispi 3",
                    "type": "minus",
                    "value": 18000,
                    "date_v": "Sabtu, 18 Mei 2024  12:00",
                    "value_v": "Rp. 18.000,-",
                    "trans_id": "h0hoHUvH4YMQB6KdRnEa"
                },
                {
                    "id": "tSmbcq6I2uSsGZumpHeD",
                    "date": {
                        "seconds": 1716007800,
                        "nanoseconds": 0
                    },
                    "desc": "Beli aqua galon 1",
                    "type": "minus",
                    "value": 16500,
                    "date_v": "Sabtu, 18 Mei 2024  11:50",
                    "value_v": "Rp. 16.500,-",
                    "trans_id": "h0hoHUvH4YMQB6KdRnEa"
                },
                {
                    "id": "EMbMGl9mIQn31Hf5LWCr",
                    "date": {
                        "seconds": 1715923800,
                        "nanoseconds": 0
                    },
                    "desc": "Beli nasi padang ayam istirahat",
                    "type": "minus",
                    "value": 18000,
                    "date_v": "Jumat, 17 Mei 2024  12:30",
                    "value_v": "Rp. 18.000,-",
                    "trans_id": "h0hoHUvH4YMQB6KdRnEa"
                },
                {
                    "id": "pevwfZvRcdK6hplo6vi5",
                    "date": {
                        "seconds": 1715907600,
                        "nanoseconds": 0
                    },
                    "desc": "Arta kembalikan uang",
                    "type": "add",
                    "value": 42000,
                    "date_v": "Jumat, 17 Mei 2024  08:00",
                    "value_v": "Rp. 42.000,-",
                    "trans_id": "T3xuKoFAvhbcqxKUjlmL"
                },
                {
                    "id": "J5ObiOWSapHzzcl4PDAR",
                    "date": {
                        "seconds": 1715858400,
                        "nanoseconds": 0
                    },
                    "desc": "Beli mie goreng indomaret",
                    "type": "minus",
                    "value": 4000,
                    "date_v": "Kamis, 16 Mei 2024  18:20",
                    "value_v": "Rp. 4.000,-",
                    "trans_id": "h0hoHUvH4YMQB6KdRnEa"
                },
                {
                    "id": "uqnm3E6GGooW2jaYWzzf",
                    "date": {
                        "seconds": 1715857800,
                        "nanoseconds": 0
                    },
                    "desc": "Beli roti bakar 2",
                    "type": "minus",
                    "value": 30000,
                    "date_v": "Kamis, 16 Mei 2024  18:10",
                    "value_v": "Rp. 30.000,-",
                    "trans_id": "h0hoHUvH4YMQB6KdRnEa"
                },
                {
                    "id": "1VdFV4mYx5IV3JfRMziN",
                    "date": {
                        "seconds": 1715835600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli es teh & kerupuk istirahat",
                    "type": "minus",
                    "value": 4000,
                    "date_v": "Kamis, 16 Mei 2024  12:00",
                    "value_v": "Rp. 4.000,-",
                    "trans_id": "h0hoHUvH4YMQB6KdRnEa"
                },
                {
                    "id": "bjQa5zbwHPmNfmNo7zzE",
                    "date": {
                        "seconds": 1715781600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli obat nyamuk 3 & sari gandum",
                    "type": "minus",
                    "value": 22000,
                    "date_v": "Rabu, 15 Mei 2024  21:00",
                    "value_v": "Rp. 22.000,-",
                    "trans_id": "h0hoHUvH4YMQB6KdRnEa"
                },
                {
                    "id": "0A2k0BTu7JB0xRz97rea",
                    "date": {
                        "seconds": 1715770800,
                        "nanoseconds": 0
                    },
                    "desc": "Bayar parkir masjid untag",
                    "type": "minus",
                    "value": 1000,
                    "date_v": "Rabu, 15 Mei 2024  18:00",
                    "value_v": "Rp. 1.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "827hPJ1xNgUkVzEVznEe",
                    "date": {
                        "seconds": 1715749200,
                        "nanoseconds": 0
                    },
                    "desc": "Beli es teh & krupuk istirahat",
                    "type": "minus",
                    "value": 4000,
                    "date_v": "Rabu, 15 Mei 2024  12:00",
                    "value_v": "Rp. 4.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "X9g2EW0JFSNOmlZwOFRI",
                    "date": {
                        "seconds": 1715685000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli bensin pertalite suprax",
                    "type": "minus",
                    "value": 30000,
                    "date_v": "Selasa, 14 Mei 2024  18:10",
                    "value_v": "Rp. 30.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "IPpWdBVXOaBay5Ayh5Ka",
                    "date": {
                        "seconds": 1715684400,
                        "nanoseconds": 0
                    },
                    "desc": "Bayar parkir masjid untag",
                    "type": "minus",
                    "value": 2000,
                    "date_v": "Selasa, 14 Mei 2024  18:00",
                    "value_v": "Rp. 2.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "K3lmKzijdJLwALO3jSdW",
                    "date": {
                        "seconds": 1715662800,
                        "nanoseconds": 0
                    },
                    "desc": "Beli es teh & pentol istirahat",
                    "type": "minus",
                    "value": 8000,
                    "date_v": "Selasa, 14 Mei 2024  12:00",
                    "value_v": "Rp. 8.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "1ZZt2yZcvWxdkE3Swgql",
                    "date": {
                        "seconds": 1715608800,
                        "nanoseconds": 0
                    },
                    "desc": "Beli jajan kabim & sukro",
                    "type": "minus",
                    "value": 17500,
                    "date_v": "Senin, 13 Mei 2024  21:00",
                    "value_v": "Rp. 17.500,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "UAqxOXhwFPb7llbLnK2N",
                    "date": {
                        "seconds": 1715598000,
                        "nanoseconds": 0
                    },
                    "desc": "Parkir masjid untag",
                    "type": "minus",
                    "value": 1000,
                    "date_v": "Senin, 13 Mei 2024  18:00",
                    "value_v": "Rp. 1.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "p9kdIdJRoVYJTaRbnNJA",
                    "date": {
                        "seconds": 1715576400,
                        "nanoseconds": 0
                    },
                    "desc": "Beli es teh istirahat",
                    "type": "minus",
                    "value": 3000,
                    "date_v": "Senin, 13 Mei 2024  12:00",
                    "value_v": "Rp. 3.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "vNLVMQxKu2eYgIW5aKLY",
                    "date": {
                        "seconds": 1715563200,
                        "nanoseconds": 0
                    },
                    "desc": "Pompa ban suprax 125 depan belakang",
                    "type": "minus",
                    "value": 3000,
                    "date_v": "Senin, 13 Mei 2024  08:20",
                    "value_v": "Rp. 3.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "03QYfeZseaD02Vu3AaeA",
                    "date": {
                        "seconds": 1715560200,
                        "nanoseconds": 0
                    },
                    "desc": "Beli krupuk & onde2 risol",
                    "type": "minus",
                    "value": 14000,
                    "date_v": "Senin, 13 Mei 2024  07:30",
                    "value_v": "Rp. 14.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "dJEGdJ2l1wzz80mxwVGs",
                    "date": {
                        "seconds": 1715559000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli nasi pecel 2",
                    "type": "minus",
                    "value": 14000,
                    "date_v": "Senin, 13 Mei 2024  07:10",
                    "value_v": "Rp. 14.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "uzveAh0AvbwcDDUnxYyl",
                    "date": {
                        "seconds": 1715481000,
                        "nanoseconds": 0
                    },
                    "desc": "Bayar iuran sampah & listrik 3 bulan (pinjam uang ibuk 100.000)",
                    "type": "minus",
                    "value": 105000,
                    "date_v": "Minggu, 12 Mei 2024  09:30",
                    "value_v": "Rp. 105.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "OUwDG3ZVe9wGRG8KlyUE",
                    "date": {
                        "seconds": 1715437800,
                        "nanoseconds": 0
                    },
                    "desc": "Pompa ban vario",
                    "type": "minus",
                    "value": 2000,
                    "date_v": "Sabtu, 11 Mei 2024  21:30",
                    "value_v": "Rp. 2.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "i289SjbfqHVp2nzb860m",
                    "date": {
                        "seconds": 1715430600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli jajan kodam kencan",
                    "type": "minus",
                    "value": 30000,
                    "date_v": "Sabtu, 11 Mei 2024  19:30",
                    "value_v": "Rp. 30.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "bK8jIAWZzbonXcsz3uqB",
                    "date": {
                        "seconds": 1715428800,
                        "nanoseconds": 0
                    },
                    "desc": "Beli es teh 2 kencan",
                    "type": "minus",
                    "value": 8000,
                    "date_v": "Sabtu, 11 Mei 2024  19:00",
                    "value_v": "Rp. 8.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "nhkvwvWuAjDExBYjMCI5",
                    "date": {
                        "seconds": 1715400000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli es campur 2",
                    "type": "minus",
                    "value": 16000,
                    "date_v": "Sabtu, 11 Mei 2024  11:00",
                    "value_v": "Rp. 16.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "GFBt1rn4S9xmKwn0BafE",
                    "date": {
                        "seconds": 1715396400,
                        "nanoseconds": 0
                    },
                    "desc": "Kasih orang minta2",
                    "type": "minus",
                    "value": 1999,
                    "date_v": "Sabtu, 11 Mei 2024  10:00",
                    "value_v": "Rp. 1.999,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "5FijlW6JSdYnc6fYnjUP",
                    "date": {
                        "seconds": 1715395500,
                        "nanoseconds": 0
                    },
                    "desc": "Beli sotong",
                    "type": "minus",
                    "value": 10000,
                    "date_v": "Sabtu, 11 Mei 2024  09:45",
                    "value_v": "Rp. 10.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "gkieNpxeoXlH70YS7LLN",
                    "date": {
                        "seconds": 1715387400,
                        "nanoseconds": 0
                    },
                    "desc": "Beli krupuk, jajan pasar, risoles",
                    "type": "minus",
                    "value": 27000,
                    "date_v": "Sabtu, 11 Mei 2024  07:30",
                    "value_v": "Rp. 27.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "6TWiKCMYSSA6GTnZijVN",
                    "date": {
                        "seconds": 1715386800,
                        "nanoseconds": 0
                    },
                    "desc": "Beli sop, tahu, bawang merah, tomat",
                    "type": "minus",
                    "value": 15000,
                    "date_v": "Sabtu, 11 Mei 2024  07:20",
                    "value_v": "Rp. 15.000,-",
                    "trans_id": "Dosc50rC3wR0kA7QEUds"
                },
                {
                    "id": "n8aMDCqimEJD7RzQa0TX",
                    "date": {
                        "seconds": 1715317200,
                        "nanoseconds": 0
                    },
                    "desc": "Sedekah jumat",
                    "type": "minus",
                    "value": 5000,
                    "date_v": "Jumat, 10 Mei 2024  12:00",
                    "value_v": "Rp. 5.000,-",
                    "trans_id": "DL9mDFwZyrtwEjWBpMZy"
                },
                {
                    "id": "9CvjoLxokC7sAZOTvMfm",
                    "date": {
                        "seconds": 1715301000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli dadar jagung, sambel goreng, ondeonde",
                    "type": "minus",
                    "value": 21000,
                    "date_v": "Jumat, 10 Mei 2024  07:30",
                    "value_v": "Rp. 21.000,-",
                    "trans_id": "DL9mDFwZyrtwEjWBpMZy"
                },
                {
                    "id": "y7DQlgsm2pruljZ7Oz2h",
                    "date": {
                        "seconds": 1715247000,
                        "nanoseconds": 0
                    },
                    "desc": "Belanja jajan & sabun cuci palapa",
                    "type": "minus",
                    "value": 166200,
                    "date_v": "Kamis, 9 Mei 2024  16:30",
                    "value_v": "Rp. 166.200,-",
                    "trans_id": "TDXvdZZMuFvHno9ndSJZ"
                },
                {
                    "id": "QIhQifKDx44qjSBywcSK",
                    "date": {
                        "seconds": 1715223000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli buah2an, ayam setengah kilo & krupuk",
                    "type": "minus",
                    "value": 35000,
                    "date_v": "Kamis, 9 Mei 2024  09:50",
                    "value_v": "Rp. 35.000,-",
                    "trans_id": "DL9mDFwZyrtwEjWBpMZy"
                },
                {
                    "id": "GvDiLWEZ7mGj3cdW00UI",
                    "date": {
                        "seconds": 1715216400,
                        "nanoseconds": 0
                    },
                    "desc": "Ganti lampu depan, totok, perbaiki rem suprax",
                    "type": "minus",
                    "value": 211000,
                    "date_v": "Kamis, 9 Mei 2024  08:00",
                    "value_v": "Rp. 211.000,-",
                    "trans_id": "2dpuoQh80eQzcP24TScy"
                },
                {
                    "id": "2rW0ggwEsTl4NBSDesCM",
                    "date": {
                        "seconds": 1715178600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli bensin pertamax vario",
                    "type": "minus",
                    "value": 30000,
                    "date_v": "Rabu, 8 Mei 2024  21:30",
                    "value_v": "Rp. 30.000,-",
                    "trans_id": "DL9mDFwZyrtwEjWBpMZy"
                },
                {
                    "id": "CcCCUPysX7GkeEfOJRnh",
                    "date": {
                        "seconds": 1715170200,
                        "nanoseconds": 422000000
                    },
                    "desc": "Beli penyetan demak kencan",
                    "type": "minus",
                    "value": 34000,
                    "date_v": "Rabu, 8 Mei 2024  19:10",
                    "value_v": "Rp. 34.000,-",
                    "trans_id": "DL9mDFwZyrtwEjWBpMZy"
                },
                {
                    "id": "52AEL714fx1bPuD6JJlh",
                    "date": {
                        "seconds": 1715167800,
                        "nanoseconds": 22000000
                    },
                    "desc": "Beli sempol & molen, onde2 kecil",
                    "type": "minus",
                    "value": 10000,
                    "date_v": "Rabu, 8 Mei 2024  18:30",
                    "value_v": "Rp. 10.000,-",
                    "trans_id": "DL9mDFwZyrtwEjWBpMZy"
                },
                {
                    "id": "igqICixyzIheeIsw1pWl",
                    "date": {
                        "seconds": 1715166600,
                        "nanoseconds": 0
                    },
                    "desc": "Parkir mesjid rahmat",
                    "type": "minus",
                    "value": 2000,
                    "date_v": "Rabu, 8 Mei 2024  18:10",
                    "value_v": "Rp. 2.000,-",
                    "trans_id": "DL9mDFwZyrtwEjWBpMZy"
                },
                {
                    "id": "aDxFaSvu35e1EZ9i3YSv",
                    "date": {
                        "seconds": 1715165400,
                        "nanoseconds": 0
                    },
                    "desc": "Beli facewash acnes indomaret",
                    "type": "minus",
                    "value": 26400,
                    "date_v": "Rabu, 8 Mei 2024  17:50",
                    "value_v": "Rp. 26.400,-",
                    "trans_id": "DL9mDFwZyrtwEjWBpMZy"
                },
                {
                    "id": "cWpQCKSWHJJm4fvXN0KP",
                    "date": {
                        "seconds": 1715144400,
                        "nanoseconds": 360000000
                    },
                    "desc": "Beli pentol & es teh istirahat",
                    "type": "minus",
                    "value": 8000,
                    "date_v": "Rabu, 8 Mei 2024  12:00",
                    "value_v": "Rp. 8.000,-",
                    "trans_id": "DL9mDFwZyrtwEjWBpMZy"
                },
                {
                    "id": "Im1JhJIGwa0YamOZxl1C",
                    "date": {
                        "seconds": 1715132400,
                        "nanoseconds": 0
                    },
                    "desc": "Bayar parkir RMI",
                    "type": "minus",
                    "value": 2000,
                    "date_v": "Rabu, 8 Mei 2024  08:40",
                    "value_v": "Rp. 2.000,-",
                    "trans_id": "DL9mDFwZyrtwEjWBpMZy"
                },
                {
                    "id": "mLopF0BQDA9f8qeCrVxW",
                    "date": {
                        "seconds": 1715124600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli pecel 2",
                    "type": "minus",
                    "value": 14000,
                    "date_v": "Rabu, 8 Mei 2024  06:30",
                    "value_v": "Rp. 14.000,-",
                    "trans_id": "DL9mDFwZyrtwEjWBpMZy"
                },
                {
                    "id": "aOnjYGPW4wlpLgZCF2fa",
                    "date": {
                        "seconds": 1715058000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli es teh istirahat",
                    "type": "minus",
                    "value": 3000,
                    "date_v": "Selasa, 7 Mei 2024  12:00",
                    "value_v": "Rp. 3.000,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "wf9GODHtoUv9Au0F7sPD",
                    "date": {
                        "seconds": 1715040000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli krupuk, pisang, ayam krispi 2",
                    "type": "minus",
                    "value": 32000,
                    "date_v": "Selasa, 7 Mei 2024  07:00",
                    "value_v": "Rp. 32.000,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "xFbZkf8EDfBTOkp7jbJz",
                    "date": {
                        "seconds": 1714975200,
                        "nanoseconds": 0
                    },
                    "desc": "Dhanes pinjam uang (admin 2.500)",
                    "type": "minus",
                    "value": 3002500,
                    "date_v": "Senin, 6 Mei 2024  13:00",
                    "value_v": "Rp. 3.002.500,-",
                    "trans_id": "IVlrsaTAGGUYjhZM1cRy"
                },
                {
                    "id": "U6raBKPWSbX0sZ8SLQ1d",
                    "date": {
                        "seconds": 1714971600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli es teh & kacang istirahat",
                    "type": "minus",
                    "value": 4000,
                    "date_v": "Senin, 6 Mei 2024  12:00",
                    "value_v": "Rp. 4.000,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "TcKzuFR4HTgqXmycn8Cb",
                    "date": {
                        "seconds": 1714958400,
                        "nanoseconds": 0
                    },
                    "desc": "Beli roti sisir indomaret",
                    "type": "minus",
                    "value": 11000,
                    "date_v": "Senin, 6 Mei 2024  08:20",
                    "value_v": "Rp. 11.000,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "V62vbPnqN9Y1QSAUuP06",
                    "date": {
                        "seconds": 1714897800,
                        "nanoseconds": 0
                    },
                    "desc": "Isi bensin supra pertalite",
                    "type": "minus",
                    "value": 30000,
                    "date_v": "Minggu, 5 Mei 2024  15:30",
                    "value_v": "Rp. 30.000,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "vamkKmxBbxSgKMcRyI3g",
                    "date": {
                        "seconds": 1714885200,
                        "nanoseconds": 0
                    },
                    "desc": "Beli elpigi 3kg",
                    "type": "minus",
                    "value": 16000,
                    "date_v": "Minggu, 5 Mei 2024  12:00",
                    "value_v": "Rp. 16.000,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "teiK8pVFTNITzv8ZCtrv",
                    "date": {
                        "seconds": 1714824600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli ayam hisana bocil",
                    "type": "minus",
                    "value": 14000,
                    "date_v": "Sabtu, 4 Mei 2024  19:10",
                    "value_v": "Rp. 14.000,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "LaY5WXg9cdHz5HP6nfh1",
                    "date": {
                        "seconds": 1714824000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli jajan bocil & ibuk indomaret",
                    "type": "minus",
                    "value": 45200,
                    "date_v": "Sabtu, 4 Mei 2024  19:00",
                    "value_v": "Rp. 45.200,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "JxQ8zq2CvAYAOkr2PrXq",
                    "date": {
                        "seconds": 1714822200,
                        "nanoseconds": 0
                    },
                    "desc": "Beli bensin supra warung madura",
                    "type": "minus",
                    "value": 10000,
                    "date_v": "Sabtu, 4 Mei 2024  18:30",
                    "value_v": "Rp. 10.000,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "lgr0ZFk7YVf9OkVSO9QG",
                    "date": {
                        "seconds": 1714804200,
                        "nanoseconds": 0
                    },
                    "desc": "Beli capcay & koloke",
                    "type": "minus",
                    "value": 55000,
                    "date_v": "Sabtu, 4 Mei 2024  13:30",
                    "value_v": "Rp. 55.000,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "X5ticrDkHJnY080JQnyU",
                    "date": {
                        "seconds": 1714797000,
                        "nanoseconds": 0
                    },
                    "desc": "Dhanes pinjam uang (admin 2.500)",
                    "type": "minus",
                    "value": 3002500,
                    "date_v": "Sabtu, 4 Mei 2024  11:30",
                    "value_v": "Rp. 3.002.500,-",
                    "trans_id": "yLqjggqYK6Wu1SO1FKIk"
                },
                {
                    "id": "EY2Vw5sumuHfJfJMR1vo",
                    "date": {
                        "seconds": 1714792800,
                        "nanoseconds": 0
                    },
                    "desc": "Cuci motor vario",
                    "type": "minus",
                    "value": 15000,
                    "date_v": "Sabtu, 4 Mei 2024  10:20",
                    "value_v": "Rp. 15.000,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "i6f4BxIvwl2a4d8ceEBc",
                    "date": {
                        "seconds": 1714788000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli aqua galon",
                    "type": "minus",
                    "value": 16500,
                    "date_v": "Sabtu, 4 Mei 2024  09:00",
                    "value_v": "Rp. 16.500,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "FeJCAQ4R6laTY4wv15Oz",
                    "date": {
                        "seconds": 1714782600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli nasi pecel",
                    "type": "minus",
                    "value": 8000,
                    "date_v": "Sabtu, 4 Mei 2024  07:30",
                    "value_v": "Rp. 8.000,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "Chwjo42x9iaJzovx5uE3",
                    "date": {
                        "seconds": 1714734600,
                        "nanoseconds": 0
                    },
                    "desc": "Beli roti goreng, cakue, molen",
                    "type": "minus",
                    "value": 10000,
                    "date_v": "Jumat, 3 Mei 2024  18:10",
                    "value_v": "Rp. 10.000,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "L7cCtnYMXcPWtk4Iz8nh",
                    "date": {
                        "seconds": 1714734000,
                        "nanoseconds": 0
                    },
                    "desc": "Beli jajan barokah 2",
                    "type": "minus",
                    "value": 26500,
                    "date_v": "Jumat, 3 Mei 2024  18:00",
                    "value_v": "Rp. 26.500,-",
                    "trans_id": "BRhXv9yyUrrp9fZEHGCQ"
                },
                {
                    "id": "dfEynjdZ73Nao0egCeYw",
                    "date": {
                        "seconds": 1714633200,
                        "nanoseconds": 0
                    },
                    "desc": "Isi saldo ShopeePay (admin 1.000)",
                    "type": "minus",
                    "value": 301000,
                    "date_v": "Kamis, 2 Mei 2024  14:00",
                    "value_v": "Rp. 301.000,-",
                    "trans_id": "PHI8IWRncatznwcBl7rI"
                },
                {
                    "id": "uuhPQUnogcaw5f8QVsEX",
                    "date": {
                        "seconds": 1714618800,
                        "nanoseconds": 0
                    },
                    "desc": "Iqbal kembalikan uang",
                    "type": "add",
                    "value": 300000,
                    "date_v": "Kamis, 2 Mei 2024  10:00",
                    "value_v": "Rp. 300.000,-",
                    "trans_id": "BgvR1SlRaLTldCX2jtZD"
                },
                {
                    "id": "0wefzce3jPQa4ORXfy8s",
                    "date": {
                        "seconds": 1714559400,
                        "nanoseconds": 0
                    },
                    "desc": "Arta pinjam uang",
                    "type": "minus",
                    "value": 42000,
                    "date_v": "Rabu, 1 Mei 2024  17:30",
                    "value_v": "Rp. 42.000,-",
                    "trans_id": "DKjiPAnMtKnuVUMX9jnZ"
                }
            ],
            */
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
            },
            optionsFilterPeriod: [],
            optionsTransactions: [],
            alertBorder: { name: '', status: false },
            isLoadingButton: false
        }
        this.optionsFilterType = [
            { value: '', label: 'Pilih Tipe', name: 'type' },
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
    formatRupiahInput = (numStr) => {
        if (numStr === '') return '';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(numStr);
    };

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

                        let result = [{ value: '', label: 'Pilih Periode', name: 'period' }];
                        while (last_date.getMonth() <= current_date.getMonth()) {
                            let month = last_date.toLocaleString('default', { month: 'long' });
                            let month_number = last_date.getMonth();
                            let year = last_date.getFullYear();
                            result.push({
                                value: `${year}|${month_number}`,
                                label: `${month} ${year}`,
                                name: 'period',
                            });
                            last_date.setMonth(last_date.getMonth() + 1);
                        }
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
            if (!e.value) {
                type_disabled_value = false;
            } else {
                type_value = { type: '', auto_detail: false, desc_detail: '' };
                type_disabled_value = true;
            }
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
                desc_detail: ''
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
            date: this.state.formData.date ? new Date(this.state.formData.date) : '',
            value: parseInt(this.state.formData.value)
        };

        // Validation
        this.setState({ isLoadingButton: true });
        if (form_data.trans_id === '' && form_data.type === '') {
            this.showSwalValidation('type', 'Masukkan tipe transaksi!');
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
                date: '',
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
                                        <div className="col-span-2 mr-5">
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
                                            <NumberFormatBase
                                                format={this.formatRupiahInput}
                                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${this.state.alertBorder.name == 'value' && this.state.alertBorder.status ? 'border-red-300' : 'border-gray-300'}`}
                                                placeholder="Masukkan Nominal Transaksi"
                                                name="value"
                                                value={this.state.formData.value}
                                                onValueChange={this.handleChangeInputValue}
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