const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

route.post('/forgot_password', async(rec, res) => {
    const {email} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user)
            return res.status(400).send({error: 'User not found'});

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();

        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id,{
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendEmail({
            to: email,
            from: 'bryan11gomes@gmail.com',
            template: 'auth/forgot_password',
            context: { token },
        }, (err) => {
            if(err){
                return res.status(400).send({error: 'Cannot send forgot password email'});
            }
            return res.send();
        }
    )

    } catch(err){
        res.status(400).send({error: 'Forgot password, try again'})
    }
});
route.post('/reset_password', async(req, res) => {
    const {email, token, password} = req.body;

    try{
        const user = await User.findOne({email})
        .slect('+passwordResetToken passwordResetExpires');

        if(!user)
            return res.status(400).send({error: 'User not found'});

        if(token !== user.passwordResetToken){
            return res.status(400).send({ error: 'Token invalid'});
        }
        const now = new Date();
        if(now > user.passwordResetExpires){
            return res.status(400).send({ error: 'Token expired, try again'});
        }

        user.password = password;

        await user.save();

        res.send();

    }catch(err){
        res.status(400).send({error: 'Cannot reset password, try again'});
    }
});

module.exports = app => app.use('/auth', router);