import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from "axios";
import "./converter.css";

import { setUser } from '../../actions/user';

function Conversion() {
    const [amount, setAmount] = useState('0');
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [currencies, setCurrencies] = useState([]);
    const [curs, setCurs] = useState('');
    const [result, setResult] = useState(0);

    function showCurrenciesAr(amount,currencies,fromCurrency,curs){
        let i = 0;
        while (i < currencies.length){
            if (currencies[i] === fromCurrency){
                setResult(curs[i]*amount);
            }
            i+=1;
        }
    }

    function clear(amount){
        setAmount(0);
        setResult(0);
    }

    useEffect(()=>{
        let time = new Date().getFullYear().toString() + (new Date().getMonth()+1).toString() + (new Date().getDay()-1).toString();
        axios
            .get(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${time}&json`)
            .then(response => {
                let i = 0;
                const currencyAr =[];
                const cursAr = [];
                while (i < response.data.length){
                    currencyAr.push(response.data[i].cc);
                    cursAr.push(response.data[i].rate);
                    i+=1;
                }
                setCurrencies(currencyAr);
                setCurs(cursAr);
            });
    },[]);

    return (
        <div className="Converter">
            <div className="Form">
                <p>USD: {curs[27]}</p>
                <p>EUR: {curs[34]}</p>
            </div>
            <h2>
                <span>Currency</span> Converter
                <span role="img" aria-label="money">&#x1f4b5;</span>
            </h2>
            <div className="Form">
                <input
                    name="amount"
                    type="text"
                    value={amount}
                    onChange={event => setAmount(event.target.value)}
                />
                <select
                    name="from"
                    onChange={event => {setFromCurrency(event.target.value)}}
                    value={fromCurrency}
                >
                    {currencies.map(cur => (
                        <option key={cur}>{cur}</option>
                    ))}
                </select>
                <button onClick={event => showCurrenciesAr(amount,currencies,fromCurrency,curs)}>Convert</button>
                <button onClick={event => clear(amount)}><span role="img" aria-label="reload">🔄</span></button>
            </div>
            {<h3>{result} UAH</h3>}
        </div>
    );
}

Conversion.defaultProps = {
    user: null,
}

Conversion.propTypes = {
    setUserData: PropTypes.func.isRequired,
}

const mapStateToProps = store => ({
    user: store.user,
});

const mapDispatchToProps = dispatch => ({
    setUserData: data => dispatch(setUser(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Conversion);
