"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/supabase/auth-helpers";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { user: authUser, error } = await auth.getUser();
        if (error) {
          toast.error("Failed to get user");
          router.push("/login");
        } else {
          setUser(authUser);
        }
      } catch (_error) {
        toast.error("An unexpected error occurred");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [router]);

  const handleSignOut = async () => {
    try {
      const { error } = await auth.signOut();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Signed out successfully!");
        router.push("/");
      }
    } catch (_error) {
      toast.error("An unexpected error occurred");
    }
  };

  if (isLoading) {
    return (
      <PageShell>
        <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
          <div className="text-center">
            <h2 className="font-semibold text-lg">Loading...</h2>
            <p className="text-muted-foreground text-sm">Please wait</p>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="space-y-6">
        <div>
          <h1 className="font-bold text-3xl">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.email}!</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Protected Route</CardTitle>
              <CardDescription>
                This page is only accessible to authenticated users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                You can see this content because you're signed in.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="font-medium text-sm">Email:</span>
                <span className="ml-2 text-muted-foreground text-sm">
                  {user?.email}
                </span>
              </div>
              <div>
                <span className="font-medium text-sm">User ID:</span>
                <span className="ml-2 font-mono text-muted-foreground text-sm">
                  {user?.id}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
