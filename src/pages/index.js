// import Head from 'next/head'
// import Link from "next/link";
// import Image from "next/image";
// import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import { CssBaseline } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    background: {
        minHeight: '100vh',
        backgroundColor: '#2A2A2A',
        backgroundSize: 'cover',
    }
}));

export default function Home() {
    const classes = useStyles();
    return (
        <div className={classes.background}>
            
            <CssBaseline />
        </div>
    )
}