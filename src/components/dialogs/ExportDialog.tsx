import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ExportDialogProps {
  trigger: React.ReactNode;
  onExport: (format: 'pdf' | 'excel' | 'word') => void;
}

export function ExportDialog({ trigger, onExport }: ExportDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>导出分析报告</DialogTitle>
          <DialogDescription>
            选择您想要导出的文件格式，我们将为您生成相应的分析报告。
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <RadioGroup defaultValue="pdf" className="space-y-4">
            <div className="flex items-center space-x-4 rounded-lg border p-4">
              <RadioGroupItem value="pdf" id="pdf" />
              <Label htmlFor="pdf" className="flex-1 cursor-pointer">
                <div className="flex items-center">
                  <i className="fas fa-file-pdf mr-2 text-lg text-destructive" />
                  <div>
                    <div className="font-medium">PDF格式</div>
                    <div className="text-sm text-text-medium">
                      适合打印和分享的标准格式
                    </div>
                  </div>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-4 rounded-lg border p-4">
              <RadioGroupItem value="excel" id="excel" />
              <Label htmlFor="excel" className="flex-1 cursor-pointer">
                <div className="flex items-center">
                  <i className="fas fa-file-excel mr-2 text-lg text-success" />
                  <div>
                    <div className="font-medium">Excel格式</div>
                    <div className="text-sm text-text-medium">
                      适合数据分析和二次处理
                    </div>
                  </div>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-4 rounded-lg border p-4">
              <RadioGroupItem value="word" id="word" />
              <Label htmlFor="word" className="flex-1 cursor-pointer">
                <div className="flex items-center">
                  <i className="fas fa-file-word mr-2 text-lg text-primary" />
                  <div>
                    <div className="font-medium">Word格式</div>
                    <div className="text-sm text-text-medium">
                      适合编辑和修改的文档格式
                    </div>
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex justify-end space-x-4">
          <DialogTrigger asChild>
            <Button variant="outline">取消</Button>
          </DialogTrigger>
          <Button onClick={() => onExport('pdf')}>开始导出</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
