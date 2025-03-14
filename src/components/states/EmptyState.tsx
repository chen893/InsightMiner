import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  onStart: () => void;
}

export function EmptyState({ onStart }: EmptyStateProps) {
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardContent className="flex flex-col items-center justify-center p-8">
        <div className="mb-4 h-16 w-16">
          <i className="fas fa-lightbulb text-4xl text-primary" />
        </div>
        <h2 className="mb-2 text-xl font-semibold">开始您的需求分析</h2>
        <p className="mb-6 text-center text-text-medium">
          输入您想要分析的文本内容，我们将帮助您发现潜在的需求和机会
        </p>
        <Button onClick={onStart}>开始分析</Button>
      </CardContent>
    </Card>
  );
}
