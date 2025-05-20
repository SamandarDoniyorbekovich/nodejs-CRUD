import express, { Request, Response } from "express"
import { users } from "../utils/data"
import { User } from "../types/user"





const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        ok: true,
        data: users
    })
})

router.post('/', (req: Request, res: Response): any => {

    const { email, name, } = req.body as Omit<User, "id">

    const targetUser = users.find((user) => user.email === email);

    if (targetUser) {
        return res.status(400).json({
            ok: false,
            message: "User already exists with email! ",
        })
    }

    const newUser = {
        id: users.length + 1,
        email,
        name
    }

    if (!email || !name) {
        return res.status(400).json({
            ok: false,
            message: "Enter email or name"
        })
    }

    users.push(newUser)

    res.status(201).json({
        ok: true,
        data: newUser
    })
})

router.delete('/:id', (req: Request, res: Response): any => {

    const userId = parseInt(req.params.id)

    const targetUserIndex = users.findIndex((user) => user.id === userId)

    if (targetUserIndex === -1) {
        return res.status(404).json({
            ok: false,
            message: "User not found!"
        })
    }

    const deleteUser = users.splice(targetUserIndex, 1)

    res.status(200).json({
        ok: true,
        data: deleteUser

    })
})


router.put('/:id', (req: Request, res: Response): any => {
    const userId = parseInt(req.params.id)

    const { name, email} = req.body


    const targetUser = users.findIndex((user) => user.id === userId)

    if (targetUser === -1) {
        return res.status(404).json({
            ok: false,
            message: "User not found !"
        })
    }

    users[targetUser] = {
        ...users[targetUser],
        email,
        name
    }   



    res.status(200).json({
        ok: true,
        message:"User updated successfully!",
        data:users[targetUser]
    })

})

export default router