import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/shared/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/shared/tabs"
import { Overview } from "@/app/admin/components/overview"
import { RecentSales } from "@/app/admin/components/recent-sales"

function Admin() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Service Management</h2>
            </div>
            <div className="flex-1 h-screen space-y-4 p-8 pt-6">
                <div className="w-full h-full flex justify-center items-center">
                    <small>Nothing here: navigate to other pages...</small>
                </div>
            </div>
        </div>
    )
}

export default Admin;