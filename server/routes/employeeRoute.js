const express = require('express');
const router = express.Router();
const client = require('../lib/config').pool;
const createError = require('http-errors');
client.connect();

// GET Employee.
router.get('/', async (req, res, next) => {
    try {
        const {rows} = await client.query(`SELECT *
                                             FROM public.employee`);
        res.status(200).send(rows);
    } catch (e) {
        console.error(e);
        next(createError(404, 'NOT FOUND'));
    }
})
// GET specific Employee.
router.get('/specific', async (req, res, next) => {
    try {
        const {id} = req.query
        const {rows} = await client.query(`SELECT *
                                             FROM public.employee WHERE id = $1`, [Number(id)]);
        res.status(200).send(rows);
    } catch (e) {
        console.error(e);
        next(createError(404, 'NOT FOUND'));
    }
})
//ADD New Employee
router.post('/', async (req, res, next) => {
    console.log("ok");
    const {firstname, lastname, startDate, depId} = req.body;
    try {
        const response = await client.query(`INSERT INTO public.employee (fName, lName, startDate, deptId)
                                             VALUES ($1, $2, $3, $4)`, [firstname, lastname, new Date(startDate), Number(depId)]);
        res.status(200).send("success");
    } catch (e) {
        next(createError(404, 'NOT FOUND'));
    }
})
//Delete Employee
router.delete('/', async (req, res, next) => {
    const {employeeId} = req.query;
    try {
        const {rows} = await client.query(`DELETE
                                           from public.employee
                                           where id = $1`, [employeeId]);
        if (rows === 0) {
            next(createError(404, 'INVALID USER'));
        } else {
            res.status(200).send('success');
        }
    } catch (e) {
        console.error(e);
        next(createError(404, 'NOT FOUND'));
    }
})
//Update Employee
router.put('/:id', async (req, res, next) => {
    const {firstname, lastname, startDate, depId} = req.body;
    const {id} = req.params;
    try {
        const {rows} = await client.query(`UPDATE public.employee
                                           SET fName     = $1,
                                               lName = $2,
                                               startDate        = $3,
                                               deptId       = $4
                                           where id = $5 Returning id`, [firstname, lastname, new Date(startDate), Number(depId), Number(id)]);
        if (rows.length === 0) {
            next(createError(404, 'INVALID Employee'));
        } else {
            res.status(200);
            res.send('success');
        }
    } catch (e) {
        console.error(e);
        next(createError(404, 'NOT FOUND'));
    }
})

module.exports = router;
