import express from "express";
import { PrismaClient } from '@prisma/client'
import prisma from "../db/index.js";

const router = express.Router();

//get all recipes for user

router.get("/", async (req, res) => {
    const allRecipes = await prisma.recipe.findMany({
        where: {
            userId: 1
        },
        include: {           //send user true
            user: true
        }
    });

    res.status(200).json({
        sucess: true,
        todo: allRecipes
    });
})