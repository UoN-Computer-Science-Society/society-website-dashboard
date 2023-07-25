"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'



export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>
) {

    const pathname = usePathname();
    const params = useParams();


    const routes = [
        {
            href: `/committees`,
            label: 'Committee',
            active: pathname === `/committees`,
        },
        {
            href: `/positions`,
            label: 'Position Open',
            active: pathname === `/positions`,
        },
        {
            href: `/events`,
            label: 'Events',
            active: pathname === `/events`,
        },
        {
            href: `/blogs`,
            label: 'Blogs',
            active: pathname === `/blogs`,
        },
        {
            href: `/subscriptions`,
            label: 'Subscription',
            active: pathname === `/subscriptions`,
        },
    ]

    return (
        <>
            <nav className={cn("flex items-center space-x-4 lg:space-x-6 mr-auto", className)}>

                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn("text-sm font-medium transition-colors hover:text-primary",
                            route.active ? "text-black dark:text-white" : "text-muted-foreground")}
                    >
                        {route.label}
                    </Link>

                ))}
            </nav>


        </>
    )
}

export default MainNav