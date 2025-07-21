import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser, UserButton } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import { LibraryBig, LineChart, MessageSquare, Shield, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function SideNav() {
    const menuList = [
        {
            id: 1,
            name: 'My Forms',
            icon: LibraryBig,
            path: '/dashboard',
        },
        {
            id: 2,
            name: 'Responses',
            icon: MessageSquare,
            path: '/dashboard/responses',
        },

    ];

    const { user } = useUser();
    const path = usePathname();
    const [formList, setFormList] = useState();
    const [PercFileCreated, setPercFileCreated] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        user && GetFormList();
    }, [user]);

    const GetFormList = async () => {
        const result = await db
            .select()
            .from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(JsonForms.id));

        setFormList(result);

        const perc = (result.length / 3) * 100;
        setPercFileCreated(perc);
    };

    return (
        <div className="h-screen shadow-md border bg-white flex flex-col">
            <div className="p-5 border-b">
                <Link href={"/"}>
                    <Image src={'/logo.svg'} width={160} height={100} alt='logo' />
                </Link>
            </div>
            <div className="flex-grow p-5">
                {menuList.map((menu, index) => (
                    <Link
                        href={menu.path}
                        key={index}
                        className={`flex items-center gap-3 p-4 mb-3
                        hover:bg-primary hover:text-white rounded-lg
                        cursor-pointer text-gray-500
                        ${path === menu.path && 'bg-primary text-white'}
                        `}
                    >
                        <menu.icon />
                        {menu.name}
                    </Link>
                ))}
            </div>
            <div className="mt-auto p-6 border-t">
                <div className="my-7">
                    <Progress value={PercFileCreated} />
                    <h2 className="text-sm mt-2 text-gray-600">
                        <strong>{formList?.length} </strong>Out of <strong>3</strong> File Created
                    </h2>
                    <h2 className="text-sm mt-3 text-gray-600">
                        Upgrade your plan for unlimited AI form build
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    <UserButton />
                    <span className="text-sm font-medium text-gray-700">{user?.fullName}</span>
                </div>
            </div>
        </div>
    );
}

export default SideNav;
