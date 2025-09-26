import React, { useState, useEffect, useMemo } from "react";
import ChartDonut from "../../components/ChartDonut"
import ChartBarLine from "../../components/ChartBarLine"
import ChartAreaSpline from "../../components/ChartAreaSpline"
import Card from "../../components/Card"
import moment from 'moment'

export default function CobaPage() {
    const transactionsPerYearx = [
        {
            "id": 370,
            "date": "2025-07-19T16:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 369,
            "date": "2025-07-18T18:40:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 1200000
        },
        {
            "id": 368,
            "date": "2025-07-17T19:10:00",
            "type": "minus",
            "description": "Transfer ke BCA Mas Adhi",
            "value": 600000
        },
        {
            "id": 367,
            "date": "2025-07-12T19:56:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 366,
            "date": "2025-07-12T12:20:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 69900
        },
        {
            "id": 365,
            "date": "2025-07-12T12:15:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 30200
        },
        {
            "id": 364,
            "date": "2025-07-12T11:50:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 121000
        },
        {
            "id": 363,
            "date": "2025-07-11T10:50:00",
            "type": "minus",
            "description": "Transfer ke Luckycat PS",
            "value": 59888
        },
        {
            "id": 362,
            "date": "2025-07-06T19:45:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 77200
        },
        {
            "id": 361,
            "date": "2025-07-01T17:40:56",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 300000
        },
        {
            "id": 360,
            "date": "2025-07-01T00:00:48",
            "type": "balance",
            "description": "Saldo terakhir bulan juni",
            "value": 63226335
        },
        {
            "id": 359,
            "date": "2025-06-30T09:10:05",
            "type": "minus",
            "description": "Transfer ke Tabungan Rachmad",
            "value": 1000000
        },
        {
            "id": 358,
            "date": "2025-06-28T14:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 100000
        },
        {
            "id": 357,
            "date": "2025-06-27T16:30:54",
            "type": "minus",
            "description": "Transfer ke Ovo",
            "value": 108000
        },
        {
            "id": 356,
            "date": "2025-06-26T06:40:54",
            "type": "add",
            "description": "Transfer dari BNI Rachmad",
            "value": 697500
        },
        {
            "id": 355,
            "date": "2025-06-26T03:50:22",
            "type": "add",
            "description": "Gaji bulan Juni",
            "value": 5087185
        },
        {
            "id": 354,
            "date": "2025-06-24T19:30:55",
            "type": "add",
            "description": "Transfer dari Dhanes",
            "value": 100000
        },
        {
            "id": 353,
            "date": "2025-06-23T12:10:52",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 100000
        },
        {
            "id": 352,
            "date": "2025-06-22T10:10:33",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 250000
        },
        {
            "id": 351,
            "date": "2025-06-21T17:10:30",
            "type": "minus",
            "description": "Transfer ke BCA Dhanes",
            "value": 100000
        },
        {
            "id": 350,
            "date": "2025-06-18T18:10:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 349,
            "date": "2025-06-15T11:30:45",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 100000
        },
        {
            "id": 348,
            "date": "2025-06-15T11:25:05",
            "type": "minus",
            "description": "Transfer ke BNI",
            "value": 102500
        },
        {
            "id": 347,
            "date": "2025-06-14T14:15:37",
            "type": "minus",
            "description": "Transfer ke Mtix",
            "value": 98000
        },
        {
            "id": 346,
            "date": "2025-06-12T19:40:36",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 300000
        },
        {
            "id": 345,
            "date": "2025-06-10T17:45:09",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 344,
            "date": "2025-06-07T19:40:26",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 250000
        },
        {
            "id": 343,
            "date": "2025-06-07T08:00:00",
            "type": "minus",
            "description": "Transfer ke Tahta Motor",
            "value": 113000
        },
        {
            "id": 342,
            "date": "2025-06-01T17:55:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 150000
        },
        {
            "id": 341,
            "date": "2025-06-01T00:00:19",
            "type": "balance",
            "description": "Saldo terakhir bulan mei",
            "value": 60336964
        },
        {
            "id": 340,
            "date": "2025-05-28T18:10:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 339,
            "date": "2025-05-27T07:00:13",
            "type": "minus",
            "description": "Transfer ke Tabungan Rachmad",
            "value": 1000000
        },
        {
            "id": 338,
            "date": "2025-05-25T14:35:00",
            "type": "minus",
            "description": "Transfer ke Gopay",
            "value": 91404
        },
        {
            "id": 337,
            "date": "2025-05-24T13:00:00",
            "type": "add",
            "description": "Transfer dari Mas Agung",
            "value": 500000
        },
        {
            "id": 336,
            "date": "2025-05-24T10:25:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 100000
        },
        {
            "id": 335,
            "date": "2025-05-24T05:00:00",
            "type": "add",
            "description": "Gaji bulan Mei",
            "value": 5087185
        },
        {
            "id": 334,
            "date": "2025-05-22T21:40:00",
            "type": "minus",
            "description": "Transfer ke ShopeePay",
            "value": 600000
        },
        {
            "id": 333,
            "date": "2025-05-22T12:15:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 50000
        },
        {
            "id": 332,
            "date": "2025-05-18T16:50:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 200000
        },
        {
            "id": 331,
            "date": "2025-05-18T11:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 330,
            "date": "2025-05-17T17:40:00",
            "type": "minus",
            "description": "Transfer ke Sakuku",
            "value": 78000
        },
        {
            "id": 329,
            "date": "2025-05-12T18:05:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 250000
        },
        {
            "id": 328,
            "date": "2025-05-11T19:10:31",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 300000
        },
        {
            "id": 327,
            "date": "2025-05-09T18:20:22",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 326,
            "date": "2025-05-08T20:30:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 88300
        },
        {
            "id": 325,
            "date": "2025-05-03T12:00:00",
            "type": "minus",
            "description": "Transfer ke Planet Ban",
            "value": 297000
        },
        {
            "id": 324,
            "date": "2025-05-01T14:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 250000
        },
        {
            "id": 323,
            "date": "2025-05-01T11:00:00",
            "type": "minus",
            "description": "Transfer ke Sakuku",
            "value": 68000
        },
        {
            "id": 322,
            "date": "2025-05-01T00:00:33",
            "type": "balance",
            "description": "Saldo terakhir bulan april",
            "value": 58631295
        },
        {
            "id": 321,
            "date": "2025-04-29T09:50:00",
            "type": "minus",
            "description": "Transfer ke Tabungan Rachmad",
            "value": 500000
        },
        {
            "id": 320,
            "date": "2025-04-28T10:30:58",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 50000
        },
        {
            "id": 319,
            "date": "2025-04-27T15:50:00",
            "type": "minus",
            "description": "Transfer ke BliBli",
            "value": 107534
        },
        {
            "id": 318,
            "date": "2025-04-27T15:45:00",
            "type": "minus",
            "description": "Transfer ke ByU",
            "value": 25000
        },
        {
            "id": 317,
            "date": "2025-04-27T14:00:16",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 316,
            "date": "2025-04-25T18:00:24",
            "type": "add",
            "description": "Transfer dari Mas Agung",
            "value": 300000
        },
        {
            "id": 315,
            "date": "2025-04-25T04:30:00",
            "type": "add",
            "description": "Gaji bulan April",
            "value": 5087185
        },
        {
            "id": 314,
            "date": "2025-04-22T14:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 313,
            "date": "2025-04-20T09:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 700000
        },
        {
            "id": 312,
            "date": "2025-04-19T11:00:00",
            "type": "minus",
            "description": "Transfer ke Palapa",
            "value": 142600
        },
        {
            "id": 311,
            "date": "2025-04-19T10:40:00",
            "type": "minus",
            "description": "Transfer ke Palapa",
            "value": 70000
        },
        {
            "id": 310,
            "date": "2025-04-18T14:00:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 200000
        },
        {
            "id": 309,
            "date": "2025-04-13T17:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 250000
        },
        {
            "id": 308,
            "date": "2025-04-12T11:00:00",
            "type": "minus",
            "description": "Transfer ke Sakuku",
            "value": 78000
        },
        {
            "id": 307,
            "date": "2025-04-11T21:30:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 100000
        },
        {
            "id": 306,
            "date": "2025-04-11T07:00:00",
            "type": "minus",
            "description": "Transfer ke Mas Adhi",
            "value": 5000000
        },
        {
            "id": 305,
            "date": "2025-04-10T20:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 304,
            "date": "2025-04-06T17:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 350000
        },
        {
            "id": 303,
            "date": "2025-04-05T07:00:00",
            "type": "minus",
            "description": "Transfer ke ByU",
            "value": 25000
        },
        {
            "id": 302,
            "date": "2025-04-04T09:50:27",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 250000
        },
        {
            "id": 301,
            "date": "2025-04-01T00:00:38",
            "type": "balance",
            "description": "Saldo terakhir bulan maret",
            "value": 61601103
        },
        {
            "id": 300,
            "date": "2025-03-26T19:20:00",
            "type": "minus",
            "description": "Transfer ke Widasari Bakery",
            "value": 240000
        },
        {
            "id": 299,
            "date": "2025-03-26T13:20:00",
            "type": "add",
            "description": "Transfer dari Mas Agung",
            "value": 500000
        },
        {
            "id": 298,
            "date": "2025-03-26T08:20:21",
            "type": "minus",
            "description": "Transfer ke Mas Adhi",
            "value": 1500000
        },
        {
            "id": 297,
            "date": "2025-03-26T03:00:00",
            "type": "add",
            "description": "Gaji bulan Maret",
            "value": 4776224
        },
        {
            "id": 296,
            "date": "2025-03-25T19:20:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 500000
        },
        {
            "id": 295,
            "date": "2025-03-23T11:10:00",
            "type": "minus",
            "description": "Transfer ke Tabungan Rachmad",
            "value": 500000
        },
        {
            "id": 294,
            "date": "2025-03-22T16:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 300000
        },
        {
            "id": 293,
            "date": "2025-03-21T15:00:00",
            "type": "minus",
            "description": "Transfer ke GoPay",
            "value": 51000
        },
        {
            "id": 292,
            "date": "2025-03-21T05:00:00",
            "type": "add",
            "description": "THR",
            "value": 5300000
        },
        {
            "id": 291,
            "date": "2025-03-19T16:45:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 100000
        },
        {
            "id": 290,
            "date": "2025-03-18T09:30:00",
            "type": "minus",
            "description": "Transfer ke BliBli",
            "value": 132535
        },
        {
            "id": 289,
            "date": "2025-03-16T17:30:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 200000
        },
        {
            "id": 288,
            "date": "2025-03-16T10:45:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 287,
            "date": "2025-03-15T08:00:00",
            "type": "minus",
            "description": "Transfer ke Mas Adhi",
            "value": 80000
        },
        {
            "id": 286,
            "date": "2025-03-12T17:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 285,
            "date": "2025-03-10T16:35:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 50000
        },
        {
            "id": 284,
            "date": "2025-03-09T00:00:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 300000
        },
        {
            "id": 283,
            "date": "2025-03-08T17:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 150000
        },
        {
            "id": 282,
            "date": "2025-03-05T21:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 281,
            "date": "2025-03-02T15:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 150000
        },
        {
            "id": 280,
            "date": "2025-03-02T12:30:00",
            "type": "minus",
            "description": "Transfer ke ByU",
            "value": 25000
        },
        {
            "id": 279,
            "date": "2025-03-02T11:30:33",
            "type": "minus",
            "description": "Transfer ke Shoppe",
            "value": 100000
        },
        {
            "id": 278,
            "date": "2025-03-01T00:00:35",
            "type": "balance",
            "description": "Saldo terakhir bulan februari",
            "value": 55712256
        },
        {
            "id": 277,
            "date": "2025-02-26T14:20:00",
            "type": "minus",
            "description": "Transfer ke Iqbal",
            "value": 57000
        },
        {
            "id": 276,
            "date": "2025-02-26T12:05:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 50000
        },
        {
            "id": 275,
            "date": "2025-02-26T06:30:00",
            "type": "add",
            "description": "Transfer dari Mas Agung",
            "value": 500000
        },
        {
            "id": 274,
            "date": "2025-02-26T06:00:00",
            "type": "minus",
            "description": "Transfer ke Dhanes",
            "value": 2000000
        },
        {
            "id": 273,
            "date": "2025-02-26T04:00:53",
            "type": "add",
            "description": "Gaji bulan Februari",
            "value": 5087185
        },
        {
            "id": 272,
            "date": "2025-02-25T18:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 271,
            "date": "2025-02-25T09:00:00",
            "type": "minus",
            "description": "Transfer ke Tabungan Rachmad",
            "value": 500000
        },
        {
            "id": 270,
            "date": "2025-02-20T19:00:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 200000
        },
        {
            "id": 269,
            "date": "2025-02-19T18:20:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 268,
            "date": "2025-02-18T12:00:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 20000
        },
        {
            "id": 267,
            "date": "2025-02-18T09:40:00",
            "type": "minus",
            "description": "Transfer ke GoPay & ke Tokopedia",
            "value": 127535
        },
        {
            "id": 266,
            "date": "2025-02-16T11:20:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 100000
        },
        {
            "id": 265,
            "date": "2025-02-16T11:10:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 80900
        },
        {
            "id": 264,
            "date": "2025-02-16T10:50:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 66800
        },
        {
            "id": 263,
            "date": "2025-02-12T07:20:00",
            "type": "add",
            "description": "Transfer dari Mas Adhi",
            "value": 250000
        },
        {
            "id": 262,
            "date": "2025-02-11T18:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 150000
        },
        {
            "id": 261,
            "date": "2025-02-08T10:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 300000
        },
        {
            "id": 260,
            "date": "2025-02-06T18:10:00",
            "type": "minus",
            "description": "Transfer ke Benang Raja",
            "value": 70000
        },
        {
            "id": 259,
            "date": "2025-02-04T19:10:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 300000
        },
        {
            "id": 258,
            "date": "2025-02-02T12:10:00",
            "type": "minus",
            "description": "Transfer ke Sakuku",
            "value": 43000
        },
        {
            "id": 257,
            "date": "2025-02-01T15:20:00",
            "type": "add",
            "description": "Transfer dari Dhanes",
            "value": 1000000
        },
        {
            "id": 256,
            "date": "2025-02-01T13:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 255,
            "date": "2025-02-01T00:00:00",
            "type": "balance",
            "description": "Saldo terakhir bulan januari",
            "value": 53409318
        },
        {
            "id": 254,
            "date": "2025-01-30T18:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 50000
        },
        {
            "id": 253,
            "date": "2025-01-30T10:10:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 50000
        },
        {
            "id": 252,
            "date": "2025-01-28T22:50:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 100000
        },
        {
            "id": 251,
            "date": "2025-01-28T16:00:00",
            "type": "minus",
            "description": "Transfer ke Toko Askes",
            "value": 1150000
        },
        {
            "id": 250,
            "date": "2025-01-26T07:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 150000
        },
        {
            "id": 249,
            "date": "2025-01-25T18:30:00",
            "type": "minus",
            "description": "Transfer ke Sakuku",
            "value": 78000
        },
        {
            "id": 248,
            "date": "2025-01-25T06:30:00",
            "type": "minus",
            "description": "Transfer ke Tabungan Rachmad",
            "value": 500000
        },
        {
            "id": 247,
            "date": "2025-01-24T16:00:00",
            "type": "add",
            "description": "Transfer dari Mas Agung",
            "value": 200000
        },
        {
            "id": 246,
            "date": "2025-01-24T06:30:00",
            "type": "add",
            "description": "Gaji bulan Januari",
            "value": 5087186
        },
        {
            "id": 245,
            "date": "2025-01-24T06:00:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 50000
        },
        {
            "id": 244,
            "date": "2025-01-23T21:20:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 250000
        },
        {
            "id": 243,
            "date": "2025-01-19T14:00:00",
            "type": "minus",
            "description": "Transfer ke Tahta Motor",
            "value": 254000
        },
        {
            "id": 242,
            "date": "2025-01-18T10:00:00",
            "type": "minus",
            "description": "Transfer ke Tokopedia",
            "value": 118500
        },
        {
            "id": 241,
            "date": "2025-01-16T08:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 300000
        },
        {
            "id": 240,
            "date": "2025-01-11T17:30:00",
            "type": "minus",
            "description": "Transfer ke Sakuku",
            "value": 77000
        },
        {
            "id": 239,
            "date": "2025-01-11T13:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 238,
            "date": "2025-01-05T20:20:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 100000
        },
        {
            "id": 237,
            "date": "2025-01-04T14:00:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 49800
        },
        {
            "id": 236,
            "date": "2025-01-04T13:40:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 44000
        },
        {
            "id": 235,
            "date": "2025-01-03T18:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 234,
            "date": "2025-01-01T00:00:00",
            "type": "balance",
            "description": "Saldo terakhir bulan desember",
            "value": 51652377
        }
    ];

    const summarizeTransactionsPerYear = () => {
        const dataSummary = {};

        transactionsPerYear.forEach((transaction) => {
            const month = moment(transaction.date).format('M');

            if (!dataSummary[month]) {
                dataSummary[month] = {
                    id: parseInt(month),
                    month: moment(transaction.date).format('MMMM'),
                    month_start_format: moment(transaction.date).startOf('month').format('YYYY-MM-DDTHH:mm:ss') + '.000Z',
                    balance: 0,
                    income: 0,
                    expense: 0,
                    total: 0,
                };
            }

            const monthSummary = dataSummary[month];

            switch (transaction.type) {
                case 'balance':
                    monthSummary.balance = transaction.value;
                    break;
                case 'add':
                    monthSummary.income += transaction.value;
                    monthSummary.total += transaction.value;
                    break;
                case 'minus':
                    monthSummary.expense += transaction.value;
                    monthSummary.total -= transaction.value;
                    break;
                default:
                    throw new Error(`Unknown transaction type: ${transaction.type}`);
            }
        });

        return Object.values(dataSummary);
    };

    const dataChartBarLine = () => {
        const summary = summarizeTransactionsPerYear();

        const result = summary.reduce((acc, item) => {
            acc.month_start_format.push(item.month_start_format);
            acc.income.push(item.income);
            acc.expense.push(-Math.abs(item.expense));
            acc.total.push(item.total);
            return acc;
        }, { month_start_format: [], income: [], expense: [], total: [] });

        return {
            colors: ['#198754', '#DC3545', '#0D6EFD'],
            categories: result.month_start_format,
            series: [
                { name: 'Pemasukan', type: 'column', data: result.income },
                { name: 'Pengeluaran', type: 'column', data: result.expense },
                { name: 'Total', type: 'line', data: result.total },
            ],
        }
    };

    const dataChartAreaSpline = () => {
        const summary = summarizeTransactionsPerYear();

        const result = summary.reduce((acc, item) => {
            acc.month_start_format.push(item.month_start_format);
            acc.income.push(item.income);
            acc.expense.push(item.expense);
            acc.balance.push(item.balance);
            return acc;
        }, { month_start_format: [], income: [], expense: [], balance: [] });

        return {
            colors: ['#0D6EFD', '#198754', '#DC3545'],
            categories: result.month_start_format,
            series: [
                { name: 'Saldo', data: result.balance },
                { name: 'Pemasukan', data: result.income },
                { name: 'Pengeluaran', data: result.expense },
            ],
        }
    };

    const transactionsPerYear = [
        {
            "id": 375,
            "date": "2025-07-26T09:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 300000
        },
        {
            "id": 374,
            "date": "2025-07-25T15:20:00",
            "type": "add",
            "description": "Transfer dari Mas Agung",
            "value": 1500000
        },
        {
            "id": 373,
            "date": "2025-07-25T09:00:00",
            "type": "add",
            "description": "Gaji bulan Juli",
            "value": 5087185
        },
        {
            "id": 372,
            "date": "2025-07-24T18:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 371,
            "date": "2025-07-24T12:15:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 50000
        },
        {
            "id": 370,
            "date": "2025-07-19T16:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 369,
            "date": "2025-07-18T18:40:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 1200000
        },
        {
            "id": 368,
            "date": "2025-07-17T19:10:00",
            "type": "minus",
            "description": "Transfer ke BCA Mas Adhi",
            "value": 600000
        },
        {
            "id": 367,
            "date": "2025-07-12T19:56:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 366,
            "date": "2025-07-12T12:20:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 69900
        },
        {
            "id": 365,
            "date": "2025-07-12T12:15:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 30200
        },
        {
            "id": 364,
            "date": "2025-07-12T11:50:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 121000
        },
        {
            "id": 363,
            "date": "2025-07-11T10:50:00",
            "type": "minus",
            "description": "Transfer ke Luckycat PS",
            "value": 59888
        },
        {
            "id": 362,
            "date": "2025-07-06T19:45:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 77200
        },
        {
            "id": 361,
            "date": "2025-07-01T17:40:56",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 300000
        },
        {
            "id": 360,
            "date": "2025-07-01T00:00:48",
            "type": "balance",
            "description": "Saldo terakhir bulan juni",
            "value": 63226335
        },
        {
            "id": 359,
            "date": "2025-06-30T09:10:05",
            "type": "minus",
            "description": "Transfer ke Tabungan Rachmad",
            "value": 1000000
        },
        {
            "id": 358,
            "date": "2025-06-28T14:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 100000
        },
        {
            "id": 357,
            "date": "2025-06-27T16:30:54",
            "type": "minus",
            "description": "Transfer ke Ovo",
            "value": 108000
        },
        {
            "id": 356,
            "date": "2025-06-26T06:40:54",
            "type": "add",
            "description": "Transfer dari BNI Rachmad",
            "value": 697500
        },
        {
            "id": 355,
            "date": "2025-06-26T03:50:22",
            "type": "add",
            "description": "Gaji bulan Juni",
            "value": 5087185
        },
        {
            "id": 354,
            "date": "2025-06-24T19:30:55",
            "type": "add",
            "description": "Transfer dari Dhanes",
            "value": 100000
        },
        {
            "id": 353,
            "date": "2025-06-23T12:10:52",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 100000
        },
        {
            "id": 352,
            "date": "2025-06-22T10:10:33",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 250000
        },
        {
            "id": 351,
            "date": "2025-06-21T17:10:30",
            "type": "minus",
            "description": "Transfer ke BCA Dhanes",
            "value": 100000
        },
        {
            "id": 350,
            "date": "2025-06-18T18:10:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 349,
            "date": "2025-06-15T11:30:45",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 100000
        },
        {
            "id": 348,
            "date": "2025-06-15T11:25:05",
            "type": "minus",
            "description": "Transfer ke BNI",
            "value": 102500
        },
        {
            "id": 347,
            "date": "2025-06-14T14:15:37",
            "type": "minus",
            "description": "Transfer ke Mtix",
            "value": 98000
        },
        {
            "id": 346,
            "date": "2025-06-12T19:40:36",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 300000
        },
        {
            "id": 345,
            "date": "2025-06-10T17:45:09",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 344,
            "date": "2025-06-07T19:40:26",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 250000
        },
        {
            "id": 343,
            "date": "2025-06-07T08:00:00",
            "type": "minus",
            "description": "Transfer ke Tahta Motor",
            "value": 113000
        },
        {
            "id": 342,
            "date": "2025-06-01T17:55:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 150000
        },
        {
            "id": 341,
            "date": "2025-06-01T00:00:19",
            "type": "balance",
            "description": "Saldo terakhir bulan mei",
            "value": 60336964
        },
        {
            "id": 340,
            "date": "2025-05-28T18:10:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 339,
            "date": "2025-05-27T07:00:13",
            "type": "minus",
            "description": "Transfer ke Tabungan Rachmad",
            "value": 1000000
        },
        {
            "id": 338,
            "date": "2025-05-25T14:35:00",
            "type": "minus",
            "description": "Transfer ke Gopay",
            "value": 91404
        },
        {
            "id": 337,
            "date": "2025-05-24T13:00:00",
            "type": "add",
            "description": "Transfer dari Mas Agung",
            "value": 500000
        },
        {
            "id": 336,
            "date": "2025-05-24T10:25:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 100000
        },
        {
            "id": 335,
            "date": "2025-05-24T05:00:00",
            "type": "add",
            "description": "Gaji bulan Mei",
            "value": 5087185
        },
        {
            "id": 334,
            "date": "2025-05-22T21:40:00",
            "type": "minus",
            "description": "Transfer ke ShopeePay",
            "value": 600000
        },
        {
            "id": 333,
            "date": "2025-05-22T12:15:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 50000
        },
        {
            "id": 332,
            "date": "2025-05-18T16:50:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 200000
        },
        {
            "id": 331,
            "date": "2025-05-18T11:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 330,
            "date": "2025-05-17T17:40:00",
            "type": "minus",
            "description": "Transfer ke Sakuku",
            "value": 78000
        },
        {
            "id": 329,
            "date": "2025-05-12T18:05:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 250000
        },
        {
            "id": 328,
            "date": "2025-05-11T19:10:31",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 300000
        },
        {
            "id": 327,
            "date": "2025-05-09T18:20:22",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 326,
            "date": "2025-05-08T20:30:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 88300
        },
        {
            "id": 325,
            "date": "2025-05-03T12:00:00",
            "type": "minus",
            "description": "Transfer ke Planet Ban",
            "value": 297000
        },
        {
            "id": 324,
            "date": "2025-05-01T14:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 250000
        },
        {
            "id": 323,
            "date": "2025-05-01T11:00:00",
            "type": "minus",
            "description": "Transfer ke Sakuku",
            "value": 68000
        },
        {
            "id": 322,
            "date": "2025-05-01T00:00:33",
            "type": "balance",
            "description": "Saldo terakhir bulan april",
            "value": 58631295
        },
        {
            "id": 321,
            "date": "2025-04-29T09:50:00",
            "type": "minus",
            "description": "Transfer ke Tabungan Rachmad",
            "value": 500000
        },
        {
            "id": 320,
            "date": "2025-04-28T10:30:58",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 50000
        },
        {
            "id": 319,
            "date": "2025-04-27T15:50:00",
            "type": "minus",
            "description": "Transfer ke BliBli",
            "value": 107534
        },
        {
            "id": 318,
            "date": "2025-04-27T15:45:00",
            "type": "minus",
            "description": "Transfer ke ByU",
            "value": 25000
        },
        {
            "id": 317,
            "date": "2025-04-27T14:00:16",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 316,
            "date": "2025-04-25T18:00:24",
            "type": "add",
            "description": "Transfer dari Mas Agung",
            "value": 300000
        },
        {
            "id": 315,
            "date": "2025-04-25T04:30:00",
            "type": "add",
            "description": "Gaji bulan April",
            "value": 5087185
        },
        {
            "id": 314,
            "date": "2025-04-22T14:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 313,
            "date": "2025-04-20T09:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 700000
        },
        {
            "id": 312,
            "date": "2025-04-19T11:00:00",
            "type": "minus",
            "description": "Transfer ke Palapa",
            "value": 142600
        },
        {
            "id": 311,
            "date": "2025-04-19T10:40:00",
            "type": "minus",
            "description": "Transfer ke Palapa",
            "value": 70000
        },
        {
            "id": 310,
            "date": "2025-04-18T14:00:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 200000
        },
        {
            "id": 309,
            "date": "2025-04-13T17:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 250000
        },
        {
            "id": 308,
            "date": "2025-04-12T11:00:00",
            "type": "minus",
            "description": "Transfer ke Sakuku",
            "value": 78000
        },
        {
            "id": 307,
            "date": "2025-04-11T21:30:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 100000
        },
        {
            "id": 306,
            "date": "2025-04-11T07:00:00",
            "type": "minus",
            "description": "Transfer ke Mas Adhi",
            "value": 5000000
        },
        {
            "id": 305,
            "date": "2025-04-10T20:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 304,
            "date": "2025-04-06T17:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 350000
        },
        {
            "id": 303,
            "date": "2025-04-05T07:00:00",
            "type": "minus",
            "description": "Transfer ke ByU",
            "value": 25000
        },
        {
            "id": 302,
            "date": "2025-04-04T09:50:27",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 250000
        },
        {
            "id": 301,
            "date": "2025-04-01T00:00:38",
            "type": "balance",
            "description": "Saldo terakhir bulan maret",
            "value": 61601103
        },
        {
            "id": 300,
            "date": "2025-03-26T19:20:00",
            "type": "minus",
            "description": "Transfer ke Widasari Bakery",
            "value": 240000
        },
        {
            "id": 299,
            "date": "2025-03-26T13:20:00",
            "type": "add",
            "description": "Transfer dari Mas Agung",
            "value": 500000
        },
        {
            "id": 298,
            "date": "2025-03-26T08:20:21",
            "type": "minus",
            "description": "Transfer ke Mas Adhi",
            "value": 1500000
        },
        {
            "id": 297,
            "date": "2025-03-26T03:00:00",
            "type": "add",
            "description": "Gaji bulan Maret",
            "value": 4776224
        },
        {
            "id": 296,
            "date": "2025-03-25T19:20:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 500000
        },
        {
            "id": 295,
            "date": "2025-03-23T11:10:00",
            "type": "minus",
            "description": "Transfer ke Tabungan Rachmad",
            "value": 500000
        },
        {
            "id": 294,
            "date": "2025-03-22T16:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 300000
        },
        {
            "id": 293,
            "date": "2025-03-21T15:00:00",
            "type": "minus",
            "description": "Transfer ke GoPay",
            "value": 51000
        },
        {
            "id": 292,
            "date": "2025-03-21T05:00:00",
            "type": "add",
            "description": "THR",
            "value": 5300000
        },
        {
            "id": 291,
            "date": "2025-03-19T16:45:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 100000
        },
        {
            "id": 290,
            "date": "2025-03-18T09:30:00",
            "type": "minus",
            "description": "Transfer ke BliBli",
            "value": 132535
        },
        {
            "id": 289,
            "date": "2025-03-16T17:30:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 200000
        },
        {
            "id": 288,
            "date": "2025-03-16T10:45:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 287,
            "date": "2025-03-15T08:00:00",
            "type": "minus",
            "description": "Transfer ke Mas Adhi",
            "value": 80000
        },
        {
            "id": 286,
            "date": "2025-03-12T17:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 285,
            "date": "2025-03-10T16:35:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 50000
        },
        {
            "id": 284,
            "date": "2025-03-09T00:00:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 300000
        },
        {
            "id": 283,
            "date": "2025-03-08T17:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 150000
        },
        {
            "id": 282,
            "date": "2025-03-05T21:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 281,
            "date": "2025-03-02T15:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 150000
        },
        {
            "id": 280,
            "date": "2025-03-02T12:30:00",
            "type": "minus",
            "description": "Transfer ke ByU",
            "value": 25000
        },
        {
            "id": 279,
            "date": "2025-03-02T11:30:33",
            "type": "minus",
            "description": "Transfer ke Shoppe",
            "value": 100000
        },
        {
            "id": 278,
            "date": "2025-03-01T00:00:35",
            "type": "balance",
            "description": "Saldo terakhir bulan februari",
            "value": 55712256
        },
        {
            "id": 277,
            "date": "2025-02-26T14:20:00",
            "type": "minus",
            "description": "Transfer ke Iqbal",
            "value": 57000
        },
        {
            "id": 276,
            "date": "2025-02-26T12:05:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 50000
        },
        {
            "id": 275,
            "date": "2025-02-26T06:30:00",
            "type": "add",
            "description": "Transfer dari Mas Agung",
            "value": 500000
        },
        {
            "id": 274,
            "date": "2025-02-26T06:00:00",
            "type": "minus",
            "description": "Transfer ke Dhanes",
            "value": 2000000
        },
        {
            "id": 273,
            "date": "2025-02-26T04:00:53",
            "type": "add",
            "description": "Gaji bulan Februari",
            "value": 5087185
        },
        {
            "id": 272,
            "date": "2025-02-25T18:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 271,
            "date": "2025-02-25T09:00:00",
            "type": "minus",
            "description": "Transfer ke Tabungan Rachmad",
            "value": 500000
        },
        {
            "id": 270,
            "date": "2025-02-20T19:00:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 200000
        },
        {
            "id": 269,
            "date": "2025-02-19T18:20:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 268,
            "date": "2025-02-18T12:00:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 20000
        },
        {
            "id": 267,
            "date": "2025-02-18T09:40:00",
            "type": "minus",
            "description": "Transfer ke GoPay & ke Tokopedia",
            "value": 127535
        },
        {
            "id": 266,
            "date": "2025-02-16T11:20:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 100000
        },
        {
            "id": 265,
            "date": "2025-02-16T11:10:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 80900
        },
        {
            "id": 264,
            "date": "2025-02-16T10:50:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 66800
        },
        {
            "id": 263,
            "date": "2025-02-12T07:20:00",
            "type": "add",
            "description": "Transfer dari Mas Adhi",
            "value": 250000
        },
        {
            "id": 262,
            "date": "2025-02-11T18:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 150000
        },
        {
            "id": 261,
            "date": "2025-02-08T10:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 300000
        },
        {
            "id": 260,
            "date": "2025-02-06T18:10:00",
            "type": "minus",
            "description": "Transfer ke Benang Raja",
            "value": 70000
        },
        {
            "id": 259,
            "date": "2025-02-04T19:10:00",
            "type": "minus",
            "description": "Transfer ke Mas Agung",
            "value": 300000
        },
        {
            "id": 258,
            "date": "2025-02-02T12:10:00",
            "type": "minus",
            "description": "Transfer ke Sakuku",
            "value": 43000
        },
        {
            "id": 257,
            "date": "2025-02-01T15:20:00",
            "type": "add",
            "description": "Transfer dari Dhanes",
            "value": 1000000
        },
        {
            "id": 256,
            "date": "2025-02-01T13:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 255,
            "date": "2025-02-01T00:00:00",
            "type": "balance",
            "description": "Saldo terakhir bulan januari",
            "value": 53409318
        },
        {
            "id": 254,
            "date": "2025-01-30T18:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 50000
        },
        {
            "id": 253,
            "date": "2025-01-30T10:10:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 50000
        },
        {
            "id": 252,
            "date": "2025-01-28T22:50:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 100000
        },
        {
            "id": 251,
            "date": "2025-01-28T16:00:00",
            "type": "minus",
            "description": "Transfer ke Toko Askes",
            "value": 1150000
        },
        {
            "id": 250,
            "date": "2025-01-26T07:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 150000
        },
        {
            "id": 249,
            "date": "2025-01-25T18:30:00",
            "type": "minus",
            "description": "Transfer ke Sakuku",
            "value": 78000
        },
        {
            "id": 248,
            "date": "2025-01-25T06:30:00",
            "type": "minus",
            "description": "Transfer ke Tabungan Rachmad",
            "value": 500000
        },
        {
            "id": 247,
            "date": "2025-01-24T16:00:00",
            "type": "add",
            "description": "Transfer dari Mas Agung",
            "value": 200000
        },
        {
            "id": 246,
            "date": "2025-01-24T06:30:00",
            "type": "add",
            "description": "Gaji bulan Januari",
            "value": 5087186
        },
        {
            "id": 245,
            "date": "2025-01-24T06:00:00",
            "type": "add",
            "description": "Transfer dari Mas Agus",
            "value": 50000
        },
        {
            "id": 244,
            "date": "2025-01-23T21:20:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 250000
        },
        {
            "id": 243,
            "date": "2025-01-19T14:00:00",
            "type": "minus",
            "description": "Transfer ke Tahta Motor",
            "value": 254000
        },
        {
            "id": 242,
            "date": "2025-01-18T10:00:00",
            "type": "minus",
            "description": "Transfer ke Tokopedia",
            "value": 118500
        },
        {
            "id": 241,
            "date": "2025-01-16T08:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 300000
        },
        {
            "id": 240,
            "date": "2025-01-11T17:30:00",
            "type": "minus",
            "description": "Transfer ke Sakuku",
            "value": 77000
        },
        {
            "id": 239,
            "date": "2025-01-11T13:30:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 238,
            "date": "2025-01-05T20:20:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 100000
        },
        {
            "id": 237,
            "date": "2025-01-04T14:00:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 49800
        },
        {
            "id": 236,
            "date": "2025-01-04T13:40:00",
            "type": "minus",
            "description": "Transfer ke Palapa Toserba",
            "value": 44000
        },
        {
            "id": 235,
            "date": "2025-01-03T18:00:00",
            "type": "minus",
            "description": "Tarik tunai",
            "value": 200000
        },
        {
            "id": 234,
            "date": "2025-01-01T00:00:00",
            "type": "balance",
            "description": "Saldo terakhir bulan desember",
            "value": 51652377
        }
    ];
    const dataTransactionMonth = transactionsPerYear.filter((item) => {
        const month = moment(item.date).format('M');
        return parseInt(month) === 6;
    });
    console.log('dataTransactionMonth', dataTransactionMonth);

    const datax = {
        "labels": [
            "Kebutuhan Makan (Pokok)",
            "Kebutuhan Makan (Camilan)",
            "Kebutuhan Rumah",
            "Perawatan Diri",
            "Tagihan Rutin",
            "Transportasi",
            "Hiburan",
            "Sedekah",
            "Hutang",
            "Lain - Lain",
            "Gaji"
        ],
        "series": [
            315500,
            202400,
            127400,
            151000,
            884000,
            130000,
            175888,
            58700,
            2800000,
            20000,
            5087185
        ]
    };

    const tes = summarizeTransactionsPerYear();
    const tess = dataChartBarLine();
    const tesss = dataChartAreaSpline();

    return (
        <>
            <Card className="text-bg-white">
                <ChartDonut data={datax} />
            </Card>
        </>
    );
}