import JWT from 'jsonwebtoken'

function payloadGenerator(id: number, email: string) {
    return JWT.sign({
        id,
        email,
    },
        process.env.KEY!,
        {
            expiresIn: '3d'
        })
}

export { payloadGenerator }