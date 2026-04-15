import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewRequestPlaceholderPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Vehicle request flow coming soon</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          This placeholder prepares the route for future request submission in Phase 2.
        </CardContent>
      </Card>
    </div>
  );
}
