import React from 'react'

export default function Layout(props: { children: any }) {
    const { children } = props
    return (
        <div className='flex flex-col min-h-screen relative bg-inherit'> 
        <main className='flex-1 flex flex-col'>
            {children}
        </main>
        </div>
    )
}