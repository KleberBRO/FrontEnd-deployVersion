import React from "react";
import packageJson from '../../package.json';

const Header = () => {
    return (
        <header style={styles.header}>
            <div style={styles.headerContent}>
                <img 
                    src="/favicon.ico" 
                    alt="SIGPS Logo" 
                    style={styles.favicon}
                />
                <div style={styles.textContent}>
                    <h1 style={styles.h1}>UFRPE - SIGPS</h1>
                    <p style={styles.p}>Versão {packageJson.version}</p>
                </div>
            </div>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#2828FF',
        color: 'white',
        padding: '10px 20px',
        fontSize: '12px',
        fontFamily: 'Roboto, sans-serif',
        marginTop: 0,
        top: 0,
        left: 0,
        width: '100%',
        boxSizing: 'border-box',
    },

    headerContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },

    favicon: {
        width: '32px',
        height: '32px',
    },

    textContent: {
        display: 'flex',
        flexDirection: 'column',
    },

    h1: {
        marginLeft: '0px',
        marginBottom: '0px',
        marginTop: '0px',
        fontWeight: 300,
    },

    p: {
        marginBottom: '0px',
        marginTop: '0px',
        fontSize: '12px',
        fontFamily: 'Roboto, sans-serif',
    }
};

export default Header;