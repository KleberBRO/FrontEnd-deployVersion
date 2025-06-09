import React  from "react";

const Header = () => {
    return (
        <header style={styles.header}>
            <h1 style={styles.h1}>UFRPE - SIPAS</h1>
            <p style={styles.p}>Versão 0.1.0</p>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#2828FF',
        color: 'white',
        padding: '0px',
        paddingLeft: '20px',
        fontSize: '12px',
        fontFamily: 'Roboto, sans-serif',
        marginTop: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000
    },

    h1: {
        marginLeft: '10px',
        marginBottom: '0px',
        fontWeight: 300,
    },

    p: {
        marginBottom: '5px',
        marginTop: '5px',
        fontSize: '12px',
        fontFamily: 'Roboto, sans-serif',
    }
};

export default Header;
