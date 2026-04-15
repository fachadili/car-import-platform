import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="space-y-5 rounded-2xl border bg-gradient-to-b from-slate-50 to-white p-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Vehicle Import Platform</p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight">Buy from Germany. Import with trusted professionals.</h1>
        <p className="max-w-2xl text-muted-foreground">
          AutoImport Hub connects buyers with specialized importers who manage inspections, paperwork, negotiation,
          pickup, and transport.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/sign-up?role=CLIENT">
            <Button>Start as a client</Button>
          </Link>
          <Link href="/sign-up?role=IMPORTER">
            <Button variant="outline">Join as an importer</Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Transparent process",
            text: "Clients clearly see who handles each step before committing."
          },
          {
            title: "Verified importer profiles",
            text: "Public profile pages help compare importers and build trust."
          },
          {
            title: "Built for scale",
            text: "Clean architecture allows adding requests, quotes, and operations tools in next phases."
          }
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Future workflow (planned, not active in Phase 1)</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            <p>1. Client submits a vehicle link and destination details.</p>
            <p>2. Importers review and accept suitable requests.</p>
            <p>3. Operations timeline tracks inspection, negotiation, and pickup.</p>
            <p>4. Delivery updates and milestones are shared with the client.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
