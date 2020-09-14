const express = require('express');
const router = express.Router();
const client = require('../lib/config').pool;
const createError = require('http-errors');
client.connect();

// GET Departments.
router.get('/', async (req, res, next) => {
    try {
        const {rows} = await client.query(`SELECT *
                                             FROM public.department`);
        res.status(200).json(rows);
    } catch (e) {
        console.error(e);
        next(createError(404, 'NOT FOUND'));
    }
})
router.get('/specific/:id', async (req, res, next) => {
    const {id} = req.params
    try {
        const {rows} = await client.query(`SELECT *
                                             FROM public.department where id=$1`, [id]);
        res.status(200).json(rows);
    } catch (e) {
        console.error(e);
        next(createError(404, 'NOT FOUND'));
    }
})
//ADD New Department
router.post('/', async (req, res, next) => {
    const {id, name} = req.body;
    console.log(id, name)
    try {
        const response = await client.query(`INSERT INTO public.department (id, name)
                                             VALUES ($1, $2)`, [id, name]);
        res.status(200).send("Success");
    } catch (err) {
        if (String(err).indexOf("duplicate key value") !== -1) {
            console.log("ok")
            res.status(200).send({
                error: "duplicate key value",
                message:"Mη αποδεκτά δεδομένα",
                status: 400,
                timestamp: new Date(),
                path: '/department',
            })
        }else{
            next(createError(404,"NOT FOUND"));
        }
        //next();
    }
})
//Delete Department
router.delete('/', async (req, res, next) => {
    const {departId} = req.query;
    try {
        const {rows} = await client.query(`DELETE
                                           from public.department
                                           where id = $1`, [departId]);
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
//Update department
router.put('/:depid', async (req, res, next) => {
    const {id, name} = req.body;
    const {depid} = req.params;
    try {
        const {rows} = await client.query(`UPDATE department
                                           SET id = $3,
                                           name = $1
                                           where id = $2 Returning id`, [name, Number(depid), id]);
        if (rows.length === 0) {
            next(createError(404, 'INVALID Department'));
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
