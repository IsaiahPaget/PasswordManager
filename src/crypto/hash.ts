import crypto from 'crypto'
import bcrypt from 'bcrypt'

export default async function hash(text: string): Promise<string | undefined> {
    try {
        const hash = await bcrypt.hash(text, 10)
        console.log(hash)
        return hash
    } catch (error) {
        console.error(error)
        return undefined
    }
}
