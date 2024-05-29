import React from "react";
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy, getDocs, getDoc, limit, addDoc, where } from "firebase/firestore";
import Chart from "../components/Chart";
import Header from "../components/Header";
import Card from "../components/Card";
import CardCollapse from "../components/CardCollapse";
import Modal from "../components/Modal";
import Select from 'react-select';

class Dashboard extends React.Component {
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
            isOpenModalDetail: false,
            filterPeriod: '',
            filterPeriodOption: [],
            chartFilterData: [],
            chartFilterValue: '',
            infoCard: {
                balance: 0,
                income: 0,
                spending: 0,
            },
            viewDetail: {
                type: '',
                data: '',
                total: '',
            }
        }
        this.chartFilterOption = [
            { value: 'transaction', label: 'Transaksi', name: 'chart' },
            { value: 'detail', label: 'Detail', name: 'chart' },
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
            trans_id: data.trans_id,
            value: data.value,
            date_v: this.convertDateFormat(data.date),
            value_v: this.convertRupiahFormat(data.value),
        };
        return result;
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

                        let result = [{ value: '', label: 'Pilih Periode', name: 'period' }];
                        while (last_date.getMonth() <= current_date.getMonth()) {
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
                        resolve(result);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    };
    getDataTransactions = async (year = null, month = null) => {
        const collectionTransactions = collection(db, 'transaction');
        let qTransactions = null;
        if (year && month) {
            const startMonth = new Date(parseInt(year), parseInt(month), 1);
            const endMonth = new Date(parseInt(year), parseInt(month) + 1, 0);

            qTransactions = query(
                collectionTransactions,
                orderBy('date', 'desc'),
                where('date', '>=', startMonth),
                where('date', '<=', endMonth),
            );
        } else {
            qTransactions = query(
                collectionTransactions,
                orderBy('date', 'desc'),
            );
        }
        const queryGetTransactions = await getDocs(qTransactions);
        let docID = [];
        let data = [];
        queryGetTransactions.forEach(async (doc) => {
            docID.push(doc.id);
            data.push(this.convertTransactionFormat({ id: doc.id, ...doc.data() }));
        });
        this.setState({ transactions: data }, () => {
            this.getDataDetails(docID);
        });
    }
    getDataDetails = async (docID) => {
        const collectionDetails = collection(db, 'detail');
        const qDetails = query(
            collectionDetails,
            orderBy('date', 'desc'),
            where('trans_id', 'in', docID),
        );
        const queryGetDetails = await getDocs(qDetails);
        let data = [];
        queryGetDetails.forEach(async (doc) => {
            const docType = this.state.transactions.find(v => v.id === doc.data().trans_id);
            data.push(this.convertDetailFormat({ id: doc.id, ...doc.data(), type: docType.type }));
        });
        this.setState({ details: data });
    }
    getDataLastTransactions = async () => {
        const collectionTransactions = collection(db, 'transaction');
        const q = query(
            collectionTransactions,
            orderBy('date', 'desc'),
            limit(5)
        );
        const queryGet = await getDocs(q);
        let dataTransactions = [];
        queryGet.forEach(async (doc) => {
            dataTransactions.push(this.convertTransactionFormat({ id: doc.id, ...doc.data() }));
        });
    }

    handleChangeFilter = (opt) => {
        this.setState({ filterPeriod: opt });
    };
    handleClickDetail = (e) => {
        const type = e.target.getAttribute('type');
        const data = this.state.details.filter((v) => v.type === type);
        const total = data.reduce((acc, curr) => acc + curr.value, 0);

        this.setState({
            viewDetail: {
                type: type,
                data: data,
                total: this.convertRupiahFormat(total),
            },
            isOpenModalDetail: true
        });
    };
    handleCloseModalDetail = () => {
        this.setState({ isOpenModalDetail: false });
    };
    handleClickButtonChangePage = () => {
        this.props.onChangePage('detail');
    }
    handleChangeChart = (e) => {
        this.setState({ chartFilterValue: e });
    }

    componentDidMount() {
        const current_date = new Date();

        this.getDataFilterPeriod()
            .then(filterPeriodOption => {
                this.setState({ filterPeriodOption }, () => {
                    const current_period = current_date.getFullYear() + '|' + current_date.getMonth();
                    this.setState({
                        // filterPeriod: this.state.filterPeriodOption.find(opt => opt.value === '2024|1')
                        filterPeriod: this.state.filterPeriodOption.find(opt => opt.value === current_period),
                    });
                });
            })
            .catch(error => {
                console.error('Terjadi kesalahan:', error);
            });

        this.setState({ chartFilterValue: { value: 'transaction', label: 'Transaksi', name: 'chart' } });
    }

    componentDidUpdate(prevProps, prevState) {
        // Jika filter periode berubah, ambil ulang data sesuai periode yg dipilih
        if (prevState.filterPeriod !== this.state.filterPeriod) {
            const filter_period_split = this.state.filterPeriod.value.split('|');
            this.getDataTransactions(filter_period_split[0], filter_period_split[1]);
        }

        // Untuk listener filter chart
        if (prevState.transactions !== this.state.transactions || prevState.details !== this.state.details) {
            const data = this.state.chartFilterValue.value === 'transaction' ? this.state.transactions : this.state.details;
            this.setState({ chartFilterData: data.slice().reverse() });
        }
        if (prevState.chartFilterValue !== this.state.chartFilterValue) {
            const data = this.state.chartFilterValue.value === 'transaction' ? this.state.transactions : this.state.details;
            this.setState({ chartFilterData: data.slice().reverse() });
        }

        // Jika transaksi berubah, hitung ulang saldo, pemasukkan, pengeluaran
        if (prevState.transactions !== this.state.transactions) {
            let balance = 0;
            let income = 0;
            let spending = 0;
            this.state.transactions.forEach(val => {
                if (val.type === 'balance') { balance += val.value; }
                if (val.type === 'add') { income += val.value; }
                if (val.type === 'minus') { spending += val.value; }
            });
            this.setState({
                infoCard: {
                    balance: balance + income - spending,
                    income: income,
                    spending: spending,
                }
            });
        }
    }

    render() {
        return (
            <>
                <div className="container xl:px-5 mx-auto py-5">
                    {/* bg-gray-300 bg-sky-300 bg-red-300 bg-green-300 */}

                    <Header filterPeriod={this.state.filterPeriod} filterPeriodOption={this.state.filterPeriodOption} handleChangeFilter={this.handleChangeFilter} />

                    {/* Saldo, Pemasukkan, Pengeluaran Card */}
                    <div className="grid grid-rows-1">
                        <div className="grid xl:grid-cols-3 grid-cols-1 py-5">
                            <div className="px-5">
                                <Card color="sky">
                                    <h5 className="sm:text-lg text-md font-semibold text-neutral-900">Saldo :</h5>
                                    <h2 className="py-3 sm:text-5xl text-3xl text-white text-center">{this.convertRupiahFormat(this.state.infoCard.balance)}</h2>
                                </Card>
                            </div>
                            <div className="px-5">
                                <Card color="green">
                                    <div className="flex justify-between">
                                        <h5 className="sm:text-lg text-md font-semibold text-neutral-900">Pemasukkan :</h5>
                                        <span className="text-blue-500 hover:text-blue-600 cursor-pointer" onClick={this.handleClickDetail} type='add'>Detail</span>
                                    </div>
                                    <h2 className="py-3 sm:text-5xl text-3xl text-white text-center">{this.convertRupiahFormat(this.state.infoCard.income)}</h2>
                                </Card>
                            </div>
                            <div className="px-5">
                                <Card color="red">
                                    <div className="flex justify-between">
                                        <h5 className="sm:text-lg text-md font-semibold text-neutral-900">Pengeluaran :</h5>
                                        <span className="text-blue-500 hover:text-blue-600 cursor-pointer" onClick={this.handleClickDetail} type='minus'>Detail</span>
                                    </div>
                                    <h2 className="py-3 sm:text-5xl text-3xl text-white text-center">{this.convertRupiahFormat(this.state.infoCard.spending)}</h2>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Grafik, Detail Transaksi Card */}
                    <div className="grid grid-rows-1">
                        <div className="grid xl:grid-cols-2 grid-cols-1 py-3">
                            <div className="px-5">
                                <div className="grid grid-rows-1">
                                    <div className="flex justify-between">
                                        <h1 className="text-3xl font-bold">Chart</h1>
                                        <div>
                                            <label htmlFor="type" className="text-lg font-bold text-neutral-900">Type : </label>
                                            <div className="relative mt-1 inline-block">
                                                <Select
                                                    name="type"
                                                    onChange={this.handleChangeChart}
                                                    value={this.state.chartFilterValue}
                                                    className="block min-w-max border rounded-md"
                                                    options={this.chartFilterOption}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Chart data={this.state.chartFilterData} period={this.state.filterPeriod} />
                            </div>

                            <div className="px-5 mt-5 md:mt-0">
                                <Card color="gray">
                                    <div>
                                        <h5 className="text-lg font-semibold text-neutral-900">Transaksi Terakhir :</h5>
                                    </div>
                                    <div className="overflow-y-auto my-3" style={{ maxHeight: `calc(100vh - 470px)` }}>
                                        {
                                            this.state.details.slice(0, 6).map((detail) => {
                                                return <CardCollapse key={detail.id} transaction={detail} detail='' total_value_detail='' />
                                            })
                                        }
                                    </div>
                                    <div className="my-2">
                                        <button
                                            className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                            type="button"
                                            onClick={this.handleClickButtonChangePage}
                                        >
                                            Lihat Selengkapnya
                                        </button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isOpenModalDetail} onClose={this.handleCloseModalDetail} viewDetail={this.state.viewDetail} />
            </>
        )
    }
}

export default Dashboard;