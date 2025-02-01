import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Brain className="w-8 h-8 text-primary mr-2" />
          <h1 className="text-3xl font-bold text-primary">QuizMaster</h1>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-2 w-full mt-4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Skeleton className="h-8 w-full" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 border rounded-lg p-4"
                  >
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 flex-grow" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}