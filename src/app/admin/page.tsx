"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format, formatDuration } from "date-fns";
import { isEmpty, isUndefined } from "lodash";
import { useEffect, useState } from "react";
import { User } from "../../../types";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";

export default function Page() {
    const [users, setUsers] = useState<Array<User>>();
    const loadUsers = () => {
        setUsers(Object.entries(localStorage).map(([key, value]) => ({ id: key, ...JSON.parse(value) })));
    }

    const doDelete = (id: string) => {
        localStorage.removeItem(id);
        loadUsers();
    }

    useEffect(() => {
        loadUsers();
    }, []);

    if (isEmpty(users)) {
        return <Container>No Records Found. <Link href="/">Back</Link></Container>
    }

    return (
        <Container>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">ID</TableHead>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>End</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{!isUndefined(user.startDate) ? format(user.startDate, "EEEE, MMMM do, yyyy 'at' h:mm:ss a") : "N/A"}</TableCell>
                            <TableCell>{!isUndefined(user.endDate) ? format(user.endDate, "EEEE, MMMM do, yyyy 'at' h:mm:ss a") : "N/A"}</TableCell>
                            <TableCell>{!isUndefined(user.duration) ? formatDuration(user.duration) : "N/A"}</TableCell>
                            <TableCell><Button onClick={() => doDelete(user.id)}>Delete</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
}
