import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface FeedbackDialogProps {
  trigger: React.ReactNode;
  onSubmit: (data: { type: string; content: string }) => void;
}

export function FeedbackDialog({ trigger, onSubmit }: FeedbackDialogProps) {
  const [type, setType] = useState('suggestion');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    onSubmit({ type, content });
    setContent('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>反馈建议</DialogTitle>
          <DialogDescription>
            您的反馈对我们很重要，我们将根据您的建议不断改进产品。
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <div className="mb-6">
            <Label className="mb-2 block">反馈类型</Label>
            <RadioGroup
              value={type}
              onValueChange={setType}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="suggestion" id="suggestion" />
                <Label htmlFor="suggestion">功能建议</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bug" id="bug" />
                <Label htmlFor="bug">问题反馈</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">其他</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="mb-6">
            <Label htmlFor="feedback-content" className="mb-2 block">
              反馈内容
            </Label>
            <Textarea
              id="feedback-content"
              placeholder="请详细描述您的建议或遇到的问题..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <DialogTrigger asChild>
            <Button variant="outline">取消</Button>
          </DialogTrigger>
          <Button onClick={handleSubmit} disabled={!content.trim()}>
            提交反馈
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
