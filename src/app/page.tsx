"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/container";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState<string>();
  const router = useRouter();

  const doSignIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Date.now().toString()

    localStorage.setItem(id, JSON.stringify({ name }));

    router.push(`/users/${id}`)
  };

  return (
    <Container>
      <form onSubmit={doSignIn}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Good day!</CardTitle>
            <CardDescription>Please enter your name to sign in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="Name">Name</Label>
              <Input onChange={(e) => setName(e.target.value)} required placeholder="Enter your name" />
            </div>
          </CardContent>
          <CardFooter className="gap-4">
            <Button type="submit">Sign In</Button>
            <Link href="/admin">Admin Page</Link>
          </CardFooter>
        </Card>
      </form>
    </Container>
  );
}
