import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/shared/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/shared/tabs"

function Admin() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Identity and Access Management</h2>
            </div>
            <Tabs defaultValue="roles" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="roles">Roles</TabsTrigger>
                    <TabsTrigger value="Users">Users</TabsTrigger>
                    <TabsTrigger value="policies">Access Policies</TabsTrigger>
                </TabsList>
                <TabsContent value="roles" className="space-y-4"></TabsContent>
                <TabsContent value="users" className="space-y-4"></TabsContent>
                <TabsContent value="policies" className="space-y-4"></TabsContent>
            </Tabs>
        </div>
    )
}

export default Admin;