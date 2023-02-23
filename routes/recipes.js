import express from "express";
import { PrismaClient } from '@prisma/client'
import prisma from "../db/index.js";

const router = express.Router();

//get all recipes for user

router.get("/", async (req, res) => {
    const allRecipes = await prisma.recipe.findMany({
        where: {
            userId: req.user.id
        },
    });

    res.status(200).json({
        success: true,
        todo: allRecipes
    });
})

//create recipe

router.post("/", async (req, res) => {
    const newRecipe = await prisma.recipe.create({
        data: {
            name: req.body.recipe,
            description: req.body.description,
            userId: req.user.id
        }
    });

    res.status(201).json({
        success: true
    });
})

//get recipe by id

router.get("/:recipe", async (req, res) => {
    const recipe = req.params.recipe;

    const recipes = await prisma.recipe.findMany({
        where: {
            id: Number(recipe),
            userId: req.user.id
            
        }
    });

    res.status(200).json({
        success: true,
        recipes
    });
});

//delete (not tested)
router.delete("/:recipe", async (req, res) => {
    const recipe = req.params.recipe;

    console.log(req.user)
    const recipes = await prisma.recipe.deleteMany({
        where: {
            id: Number(recipe),
            userId: req.user.id  //make it so user could only delete their own info (this breaks delete route)
        }
    })

    res.status(200).json({
        success: true,
    });
})
//edit (not tested)
router.put("/:recipe", async (req, res) => {
    const recipe = req.params.recipe;

    const recipes = await prisma.recipe.update({
        where: {
            id: Number(recipe)
        },
        data: {
            name: req.body.recipe,
            description: req.body.description,
            userId: req.user.id  //user could only edit its own information
        }
    })

    res.status(200).json({
        success: true,
        recipes
    });
})

export default router;