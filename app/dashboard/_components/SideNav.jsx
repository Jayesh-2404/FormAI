import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import { LibraryBig, LineChart, MessageSquare, Shield, MoreVertical } from 'lucide-react';
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
        {
            id: 3,
            name: 'Analytics',
            icon: LineChart,
            path: '/dashboard/analytics',
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: Shield,
            path: '/dashboard/upgrade',
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
        <>
            {/* 3-Dots Button for Smaller Screens */}
            <button
                className="sm:hidden fixed top-4 right-40 z-50 p-2 bg-white shadow-md rounded-full"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <MoreVertical className="w-6 h-6 text-gray-700" />
            </button>

            {/* Sidebar */}
            <div
                className={`h-screen shadow-md border bg-white flex flex-col sm:w-64 w-64 fixed z-40 transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } sm:translate-x-0 transition-transform duration-300`}
            >
                <div className="p-5">
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
                            <menu.icon className="w-5 h-5" />
                            <span className={`${isSidebarOpen ? 'inline' : 'hidden'} sm:inline`}>
                                {menu.name}
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="mt-auto p-6 sm:w-64 w-full">
                    <Button className="w-full">+ Create Form</Button>
                    <div className="my-7">
                        <Progress value={PercFileCreated} />
                        <h2 className="text-sm mt-2 text-gray-600">
                            <strong>{formList?.length} </strong>Out of <strong>3</strong> File Created
                        </h2>
                        <h2 className="text-sm mt-3 text-gray-600">
                            Upgrade your plan for unlimited AI form build
                        </h2>
                    </div>
                </div>
            </div>

            {/* Overlay for Sidebar on Small Screens */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </>
    );
}

export default SideNav;