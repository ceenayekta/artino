import React from "react";
import { Typography } from "@material-ui/core";
import Dashboard from "../components/Dashboard";
import Title from "../components/Title";

export const DashboardPage = () => {
  return (
    <Dashboard>
      <Title>به پنل ادمین خوش آمدید</Title>
      <Typography variant="h6">
        از منوی سمت راست، یک گزینه را انتخاب کنید
      </Typography>
    </Dashboard>
  );
};
