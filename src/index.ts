import "dotenv/config";
import express from 'express'
import { PrismaClient } from "@prisma/client";

const app = express()
const prisma = new PrismaClient()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//GET: Get all products
app.get("/products", async(req, res, next) => {
  try {
    const products = await prisma.product.findMany()
    res.json({ products })
  } catch (error: any) {
    next(error.message)
  }
})

//POST: Create a product
app.post("/products", async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: req.body
    })
    res.json({ product })
  } catch (error: any) {
    next(error.message)
  }
})

//GET: Get a product by upc
app.get("/products/:upc", async(req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        upc: String(req.params.upc)
      }
    })
    res.json({ product })
  } catch (error: any) {
    next(error.message)
  }
})

//PATCH: Update a product
app.patch("/products/:upc", async(req, res, next) => {
  try {
    const product = await prisma.product.update({
      where: {
        upc: String(req.params.upc)
      },
      data: req.body
    });
    res.json({ product })
  } catch (error: any) {
    next(error.message)
  }
})

//DELETE: Delete a product
app.delete("/products/:upc", async(req, res, next) => {
  try {
    await prisma.product.delete({
      where: {
        upc: String(req.params.upc)
      }
    })
    res.json({ message: "Product deleted successfully!"})
  } catch (error: any) {
    next(error.message)
  }
})

app.listen(3000, () => {
  console.log("App listening on port 3000")
})