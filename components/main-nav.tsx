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
            href: `/noticeboards`,
            label: 'NoticeBoard',
            active: pathname === `/noticeboards`,
        },
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
         //events represent upcoming event, just naming different
        {
            href: `/events`,
            label: 'Upcoming Events',
            active: pathname === `/events`,
        },
        //blogs represent previous event, just naming different
        {
            href: `/blogs`,
            label: 'Previous Event',
            active: pathname === `/blogs`,
        },
        {
            href: `/partners`,
            label: 'Partners',
            active: pathname === `/partners`,
        },
        {
            href: `/faqs`,
            label: 'Faq',
            active: pathname === `/faqs`,
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