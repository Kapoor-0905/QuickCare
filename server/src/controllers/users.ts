import express from 'express';
import logger from '../utils/logger';
import prisma from '../utils/db';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                address: true
            }
        });

        if (users) {
            logger.info('Users found');
            res.status(200).json(users).end();
        } else {
            logger.info('users not found');
            res.send({
                message: "user not found"
            })
        }
    } catch (error) {
        logger.info(error);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const deletedUser = await prisma.user.delete({
            where: {
                id: id
            }
        });

        if (deletedUser) {
            logger.info('User deleted');
            res.status(200).json(deletedUser).end();
        } else {
            logger.info('User not found');
            res.send({
                message: "User not found"
            })
        }
    } catch (error) {
        logger.info(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { email, password, firstName, lastName, address } = req.body;
        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email: email,
                auth: {
                    update: {
                        password: password
                    }
                },
                firstName: firstName,
                lastName: lastName,
                address: address               
            
            }
        });

        if (updatedUser) {
            logger.info('User updated');
            res.status(200).json(updatedUser).end();
        } else {
            logger.info('User not found');
            res.send({
                message: "User not found"
            })
        }
    } catch (error) {
        logger.info(error);
        return res.sendStatus(400);
    }
}