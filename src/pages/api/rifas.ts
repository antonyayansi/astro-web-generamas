import { PrismaClient } from '@prisma/client'
import type { APIRoute } from 'astro'

const prisma = new PrismaClient()

export const GET: APIRoute = async ({ params, request }) => {
  const rifas = await prisma.rifa.findMany({
    include: {
      numeros: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return new Response(JSON.stringify(rifas), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json()

  const nuevaRifa = await prisma.rifa.create({
    data: {
      nombre: body.nombre,
      descripcion: body.descripcion,
      precio: body.precio,
      imagen: body.imagen,
      publicada: body.publicada ?? false,
      numeros: {
        createMany: {
          data: Array.from({ length: body.cantidadNumeros }, (_, i) => ({
            numero: i + 1,
          })),
        },
      },
    },
  })

  return new Response(JSON.stringify(nuevaRifa), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const PUT: APIRoute = async ({ params, request }) => {
  const body = await request.json()

  const rifaActualizada = await prisma.rifa.update({
    where: { id: body.id },
    data: {
      nombre: body.nombre,
      descripcion: body.descripcion,
      precio: body.precio,
      imagen: body.imagen,
      publicada: body.publicada,
    },
  })

  return new Response(JSON.stringify(rifaActualizada), {
    headers: { 'Content-Type': 'application/json' },
  })
}

export const DELETE: APIRoute = async ({ params, request }) => {
  const body = await request.json()

  // Primero elimina los números relacionados
  await prisma.numeroRifa.deleteMany({
    where: { rifaId: body.id },
  })

  // Luego elimina la rifa
  await prisma.rifa.delete({
    where: { id: body.id },
  })

  return new Response(JSON.stringify({ mensaje: 'Rifa eliminada' }))
}
