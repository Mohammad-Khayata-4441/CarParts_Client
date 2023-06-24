import {HiHome , HiFlag} from 'react-icons/hi2'
import {IoCarSport , IoSettings} from 'react-icons/io5'
import {GiAutoRepair} from 'react-icons/Gi'
import {FaReceipt, FaUsers } from 'react-icons/fa'
import {SiMercedes } from 'react-icons/si'
import { WarehouseOutlined } from '@mui/icons-material'
export default [
    {
        text: "الرئيسية",
        path: "/",
        icon: HiHome 
    },
    {
        text: "السيارات",
        path: "/cars",
        icon: IoCarSport 
    },
    {
        text: "القطع",
        path: "/products",
        icon: GiAutoRepair,
        params:"?PageSize=5&PageNumber=1",
    },
    {
        text: "الفواتير",
        path: "/invoces",
        icon: FaReceipt 
    },

    {
        text: "المستودعات",
        path: "/warehouses",
        icon: WarehouseOutlined 
    },
    {
        text: "العلامات التجارية",
        path: "/brands",
        icon: SiMercedes 
    },
    {
        text: "الدول المصنعة",
        path: "/countries",
        icon: HiFlag 
    },
    {
        text: "الاعدادات",
        path: "/settings",
        icon: IoSettings 
    },
    {
        text: "العملاء",
        path: "/clients",
        icon: FaUsers 
    },


]
