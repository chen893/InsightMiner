'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { trpc } from '@/utils/trpc';

export default function HistoryPage() {
  const { data: searchResult } = trpc.analysis.search.useQuery({
    page: 1,
    pageSize: 10,
  });
  // searchResult.data.

  return (
    <main className="pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-5xl">
          {/* 页面标题和操作 */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold">历史记录</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="搜索历史记录..."
                  className="pl-10 pr-4"
                />
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 transform text-text-medium"></i>
              </div>
              <Button
                variant="ghost"
                className="hover:text-error text-text-medium"
              >
                <i className="fas fa-trash-alt mr-2"></i>
                清空历史
              </Button>
            </div>
          </div>

          {/* 筛选器 */}
          <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex flex-wrap gap-4">
              <div className="w-48">
                <Label className="mb-2 text-sm font-medium text-text-medium">
                  时间范围
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="全部时间" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部时间</SelectItem>
                    <SelectItem value="7days">最近7天</SelectItem>
                    <SelectItem value="30days">最近30天</SelectItem>
                    <SelectItem value="3months">最近3个月</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-48">
                <Label className="mb-2 text-sm font-medium text-text-medium">
                  分析类型
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="全部类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类型</SelectItem>
                    <SelectItem value="text">文本分析</SelectItem>
                    <SelectItem value="file">文件分析</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-48">
                <Label className="mb-2 text-sm font-medium text-text-medium">
                  排序方式
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="最新优先" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">最新优先</SelectItem>
                    <SelectItem value="oldest">最早优先</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* 历史记录列表 */}
          <div className="space-y-4">
            {searchResult?.items &&
              searchResult.items.length >= 1 &&
              searchResult?.items?.map(
                (item: (typeof searchResult.items)[0]) => (
                  <HistoryItem
                    key={item.id}
                    title={item.title}
                    description={item.inputText}
                    date={format(new Date(item.createdAt), 'yyyy-MM-dd HH:mm')}
                    type={
                      item.results.length > 0
                        ? item.results[0].type
                        : '文本分析'
                    }
                    analysisId={item.id}
                  />
                )
              )}
          </div>

          {/* 分页 */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <Button variant="outline" size="icon" className="h-10 w-10">
                <i className="fas fa-chevron-left"></i>
              </Button>
              <Button variant="default" className="h-10 w-10">
                1
              </Button>
              <Button variant="outline" className="h-10 w-10">
                2
              </Button>
              <Button variant="outline" className="h-10 w-10">
                3
              </Button>
              <span className="px-4 py-2 text-text-medium">...</span>
              <Button variant="outline" className="h-10 w-10">
                {Math.ceil(searchResult?.total || 0 / 10)}
              </Button>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <i className="fas fa-chevron-right"></i>
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}

function HistoryItem({
  title,
  description,
  date,
  type,
  analysisId,
}: {
  title: string;
  description: string;
  date: string;
  type: string;
  analysisId: string;
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="mb-2 text-lg font-semibold">{title}</h2>
          <p className="line-clamp-2 text-text-medium">{description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-text-medium hover:text-primary"
          >
            <i className="fas fa-edit"></i>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-error text-text-medium"
          >
            <i className="fas fa-trash"></i>
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-text-medium">
        <div className="flex items-center space-x-4">
          <span>
            <i className="far fa-clock mr-2"></i>
            {date}
          </span>
          <span>
            <i className="far fa-file-alt mr-2"></i>
            {type}
          </span>
        </div>
        <a
          href={`/analysis/${analysisId}`}
          className="text-primary hover:text-accent"
        >
          查看详情 <i className="fas fa-arrow-right ml-1"></i>
        </a>
      </div>
    </div>
  );
}
