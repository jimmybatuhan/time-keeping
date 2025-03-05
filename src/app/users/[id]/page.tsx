"use client";

import { Button } from "@/components/ui/button";
import { intervalToDuration } from "date-fns";
import { isNull, isUndefined } from "lodash";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "../../../../types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Container from "@/components/ui/container";

export default function Page() {
    const [user, setUser] = useState<User>();
    const params = useParams() as Pick<User, "id">;

    const doTimeIn = () => {
        if (!isUndefined(user)) {
            const startDate = new Date;

            setUser({
                id: params.id,
                name: user.name,
                startDate: startDate.toString(),
            })

            localStorage.setItem(params.id, JSON.stringify({
                name: user.name,
                startDate,
            }));
        }
    }

    const doTimeOut = () => {
        if (!isUndefined(user)) {
            const startDate = new Date(user.startDate!);
            const endDate = new Date();

            setUser({
                id: params.id,
                name: user.name,
                startDate: startDate.toString(),
                endDate: endDate.toString()
            })

            localStorage.setItem(params.id, JSON.stringify({
                name: user.name,
                startDate: startDate,
                endDate: endDate,
                duration: intervalToDuration({ start: startDate, end: endDate })
            }));

            redirect("/")
        }
    };

    useEffect(() => {
        const _user = localStorage.getItem(params.id);

        if (isNull(_user)) {
            redirect("/");
        }

        try {
            setUser(JSON.parse(_user) as User);
        } catch (_error) {
            // details of the user is unparsable, probably this was added manually, if this happens remove and redirect.
            localStorage.removeItem(params.id);
            redirect("/")
        }

    }, [params]);

    if (isUndefined(user)) {
        return <>Loading...</>
    }

    return <Container>
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Hello {user.name}!</CardTitle>
            </CardHeader>
            <CardContent>
                {isUndefined(user.startDate) ? <Button onClick={doTimeIn}>Time-in</Button> : <Button onClick={doTimeOut}>Time-out</Button>}
            </CardContent>
        </Card>
    </Container>




}