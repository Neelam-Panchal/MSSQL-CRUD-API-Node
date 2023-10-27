'use strict';
const utils=require('./utils')
const config=require('../../config')
const sql = require('mssql');

const getCountries = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const eventsList = await pool.request().query(sqlQueries.countrylist);
        return eventsList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getStates = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const eventsList = await pool.request().query(sqlQueries.statelist);
        return eventsList.recordsets[0];
    }catch(error){
        console.log(error.message)
    }
}

const getById = async(countryId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const event = await pool.request()
                            .input('countryId', sql.Int, countryId)
                            .query(sqlQueries.eventbyId);
        return event.recordset;
    } catch (error) {
        return error.message;
    }
}

const createCountry = async (eventdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const insertEvent = await pool.request()
                            .input('CountryName', sql.NVarChar(450), eventdata.CountryName)
                            .input('IsActive', sql.Bit, eventdata.IsActive)
                            .input('CreatedBy', sql.BigInt, eventdata.CreatedBy)
                            .input('CreatedOn', sql.DateTime2(7), eventdata.CreatedOn)
                            .input('ModifiedBy', sql.BigInt, eventdata.ModifiedBy)
                            .input('ModifiedOn', sql.DateTime(7), eventdata.ModifiedOn)
                            .query(sqlQueries.createCountry);                            
        return insertEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateCountry = async (countryId, eventdata) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const update = await pool.request()
                        .input('countryId', sql.Int, countryId)
                        .input('CountryName', sql.NVarChar(450), eventdata.CountryName)
                            .input('IsActive', sql.Bit, eventdata.IsActive)
                            .input('CreatedBy', sql.BigInt, eventdata.CreatedBy)
                            .input('CreatedOn', sql.DateTime2(7), eventdata.CreatedOn)
                            .input('ModifiedBy', sql.BigInt, eventdata.ModifiedBy)
                            .input('ModifiedOn', sql.DateTime(7), eventdata.ModifiedOn)
                        .query(sqlQueries.updateCountry);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteCountry = async (countryId) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('events');
        const deleteEvent = await pool.request()
                            .input('countryId', sql.Int, countryId)
                            .query(sqlQueries.deleteEvent);
        return deleteEvent.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getCountries,
    getById,
    createCountry,
    updateCountry,
    deleteCountry,
    getStates
}