import React from 'react'
import Link from 'next/link'

export default function Login() {
    return (
        <div>
    <h3>Login</h3>
    no account? <div><Link href="/signup"><a>SIGN UP</a></Link></div>
        </div>
    )
}
