import React from 'react'
import { Typography } from '@material-ui/core'
import Dashboard from '../components/Dashboard'

export const DashboardPage = () => {
    return (
        <Dashboard>
            <Typography variant="h4">به پنل ادمین خوش آمدید</Typography>
            <Typography variant="h6">از منوی سمت راست، یک گزینه را انتخاب کنید</Typography>
        </Dashboard>
    )
}
