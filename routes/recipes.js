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

router.post("/", async (req, res) => {
    const newRecipe = await prisma.recipe.create({
        data: {
            name: req.body.recipe,
            description: req.body.description,
            userId: 1
        }
    });

    res.status(201).json({
        sucess: true
    });
})

router.get("/:recipe", async (req, res) => {
    const recipe = req.params.recipe;

    const recipes = await prisma.recipe.findMany({
        where: {
            id: Number(recipe)
        }
    });

    res.status(200).json({
        sucess: true,
        recipes
    });
});

export default router;